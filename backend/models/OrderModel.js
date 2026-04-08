const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  },
  image: {
    type: String,
    required: true
  }
});

const orderSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  items: {
    type: [orderItemSchema],
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['upi', 'cod', 'card']
  },
  codPaymentMethod: {
    type: String,
    enum: ['cash', 'upi'],
    default: null
  },
  status: {
    type: String,
    required: true,
    default: 'Pending',
    enum: ['Pending', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled', 'Returned']
  },
  date: {
    type: String,
    required: true
  },
  timestamp: {
    type: Number,
    required: true
  },
  // User reference - the user who placed this order (optional for guest checkout)
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  userEmail: {
    type: String,
    required: true
  },
  // Delivery tracking fields
  trackingNumber: {
    type: String,
    default: null
  },
  shippedDate: {
    type: String,
    default: null
  },
  outForDeliveryDate: {
    type: String,
    default: null
  },
  estimatedDelivery: {
    type: String,
    default: null
  },
  deliveredDate: {
    type: String,
    default: null
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending'
  },
  cancellationReason: {
    type: String,
    default: null
  },
  cancelledDate: {
    type: String,
    default: null
  },
  returnedDate: {
    type: String,
    default: null
  },
  refundStatus: {
    type: String,
    enum: ['pending', 'processed', 'completed'],
    default: 'pending'
  },
  updatedAt: {
    type: Number,
    default: Date.now
  }
}, { timestamps: true });

// Index for better query performance
orderSchema.index({ status: 1 });
orderSchema.index({ timestamp: -1 });
// Note: id field already has unique: true which creates an index, so no need for explicit index

module.exports = mongoose.model("Order", orderSchema);
