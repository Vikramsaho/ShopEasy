const Order = require("../models/OrderModel");

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const orderData = req.body;

    // Check if order with same ID already exists
    const existingOrder = await Order.findOne({ id: orderData.id });
    if (existingOrder) {
      return res.status(400).json({
        success: false,
        message: "Order with this ID already exists"
      });
    }

    // Create new order
    const order = new Order(orderData);
    await order.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message
    });
  }
};

// Get all orders (with optional filters) - Admin only
exports.getAllOrders = async (req, res) => {
  try {
    const { status, search, limit = 100, page = 1 } = req.query;
    const query = {};

    // Filter by status if provided
    if (status && status !== 'All') {
      query.status = status;
    }

    // Search by order ID or product name
    if (search) {
      query.$or = [
        { id: { $regex: search, $options: 'i' } },
        { 'items.name': { $regex: search, $options: 'i' } }
      ];
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const orders = await Order.find(query)
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await Order.countDocuments(query);

    res.json({
      success: true,
      data: orders,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message
    });
  }
};

// Get my orders (user-specific)
exports.getMyOrders = async (req, res) => {
  try {
    const { status, search, limit = 100, page = 1 } = req.query;
    const userEmail = req.user.email; // From VerifyToken middleware
    
    const query = { userEmail };
    
    // Filter by status if provided
    if (status && status !== 'All') {
      query.status = status;
    }

    // Search by order ID or product name
    if (search) {
      query.$or = [
        { id: { $regex: search, $options: 'i' } },
        { 'items.name': { $regex: search, $options: 'i' } }
      ];
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const orders = await Order.find(query)
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await Order.countDocuments(query);

    res.json({
      success: true,
      data: orders,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    console.error("Error fetching my orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message
    });
  }
};

// Get single order by ID
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findOne({ id });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch order",
      error: error.message
    });
  }
};

// Update order status and related fields
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, additionalData = {} } = req.body;

    // Find order
    const order = await Order.findOne({ id });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    // Build update object based on status
    const updateData = {
      status,
      updatedAt: Date.now()
    };

    // Add specific fields based on status
    switch (status) {
      case 'Processing':
        updateData.paymentStatus = 'paid';
        break;
      case 'Shipped':
        updateData.trackingNumber = additionalData.trackingNumber || `TRK-${Date.now()}`;
        updateData.shippedDate = additionalData.shippedDate || new Date().toISOString().split('T')[0];
        break;
      case 'Out for Delivery':
        updateData.outForDeliveryDate = additionalData.outForDeliveryDate || new Date().toISOString().split('T')[0];
        updateData.estimatedDelivery = additionalData.estimatedDelivery || new Date(Date.now() + 24*60*60*1000).toISOString().split('T')[0];
        break;
      case 'Delivered':
        updateData.deliveredDate = additionalData.deliveredDate || new Date().toISOString().split('T')[0];
        updateData.paymentStatus = 'paid';
        if (additionalData.codPaymentMethod) {
          updateData.codPaymentMethod = additionalData.codPaymentMethod;
        }
        break;
      case 'Cancelled':
        updateData.cancellationReason = additionalData.cancellationReason || additionalData.reason || 'Cancelled by admin';
        updateData.cancelledDate = additionalData.cancelledDate || new Date().toISOString().split('T')[0];
        break;
      case 'Returned':
        updateData.returnedDate = additionalData.returnedDate || new Date().toISOString().split('T')[0];
        updateData.refundStatus = additionalData.refundStatus || 'pending';
        break;
    }

    // Merge with any additional data
    Object.assign(updateData, additionalData);

    // Update order
    const updatedOrder = await Order.findByIdAndUpdate(
      order._id,
      updateData,
      { new: true }
    );

    res.json({
      success: true,
      message: `Order status updated to ${status}`,
      data: updatedOrder
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update order status",
      error: error.message
    });
  }
};

// Cancel order
exports.cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const order = await Order.findOne({ id });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    // Check if order can be cancelled
    const nonCancellableStatuses = ['Delivered', 'Cancelled', 'Returned'];
    if (nonCancellableStatuses.includes(order.status)) {
      return res.status(400).json({
        success: false,
        message: `Cannot cancel order with status: ${order.status}`
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      order._id,
      {
        status: 'Cancelled',
        cancellationReason: reason || 'Cancelled by admin',
        cancelledDate: new Date().toISOString().split('T')[0],
        updatedAt: Date.now()
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "Order cancelled successfully",
      data: updatedOrder
    });
  } catch (error) {
    console.error("Error cancelling order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to cancel order",
      error: error.message
    });
  }
};

// Return order
exports.returnOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findOne({ id });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    // Check if order can be returned (only delivered orders)
    if (order.status !== 'Delivered') {
      return res.status(400).json({
        success: false,
        message: "Only delivered orders can be returned"
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      order._id,
      {
        status: 'Returned',
        returnedDate: new Date().toISOString().split('T')[0],
        refundStatus: 'pending',
        updatedAt: Date.now()
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "Order marked as returned",
      data: updatedOrder
    });
  } catch (error) {
    console.error("Error returning order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to return order",
      error: error.message
    });
  }
};

// Get order statistics
exports.getOrderStats = async (req, res) => {
  try {
    const stats = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
          totalRevenue: { $sum: "$total" }
        }
      }
    ]);

    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $match: { status: "Delivered" } },
      { $group: { _id: null, total: { $sum: "$total" } } }
    ]);

    res.json({
      success: true,
      data: {
        totalOrders,
        totalRevenue: totalRevenue[0]?.total || 0,
        statusBreakdown: stats
      }
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch statistics",
      error: error.message
    });
  }
};