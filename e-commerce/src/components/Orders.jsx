import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

const API_BASE_URL = 'http://localhost:5000';

const Orders = () => {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const ordersPerPage = 4;

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError('');
      
      const params = new URLSearchParams();
      if (statusFilter && statusFilter !== 'All') {
        params.append('status', statusFilter);
      }
      if (searchQuery) {
        params.append('search', searchQuery);
      }
      
      // Use my-orders endpoint for user-specific orders
      const response = await fetch(`${API_BASE_URL}/order/my-orders?${params.toString()}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const result = await response.json();
      
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to fetch orders');
      }
      
      setOrders(result.data);
    } catch (err) {
      console.error('Error loading orders:', err);
      setError(err.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  // Reload orders when filter changes
  useEffect(() => {
    if (user) {
      loadOrders();
    }
  }, [statusFilter, searchQuery, user]);

  const updateOrderStatus = async (orderId, newStatus, additionalData = {}) => {
    try {
      const response = await fetch(`${API_BASE_URL}/order/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          status: newStatus,
          additionalData
        })
      });
      
      const result = await response.json();
      
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to update order status');
      }
      
      // Reload orders to get updated data
      await loadOrders();
      
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(result.data);
      }
    } catch (err) {
      console.error('Error updating order:', err);
      alert(err.message || 'Failed to update order status');
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) {
      return;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/order/${orderId}/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ reason: 'Cancelled by user' })
      });
      
      const result = await response.json();
      
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to cancel order');
      }
      
      await loadOrders();
      
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(result.data);
      }
    } catch (err) {
      console.error('Error cancelling order:', err);
      alert(err.message || 'Failed to cancel order');
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;
    const matchesSearch = 
      order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const indexOfLast = currentPage * ordersPerPage;
  const indexOfFirst = indexOfLast - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const statusColor = (status) => {
    switch (status) {
      case "Delivered":
        return isDark ? "bg-green-900 text-green-300" : "bg-green-100 text-green-700";
      case "Pending":
        return isDark ? "bg-yellow-900 text-yellow-300" : "bg-yellow-100 text-yellow-700";
      case "Processing":
        return isDark ? "bg-blue-900 text-blue-300" : "bg-blue-100 text-blue-700";
      case "Shipped":
        return isDark ? "bg-purple-900 text-purple-300" : "bg-purple-100 text-purple-700";
      case "Out for Delivery":
        return isDark ? "bg-orange-900 text-orange-300" : "bg-orange-100 text-orange-700";
      case "Cancelled":
        return isDark ? "bg-red-900 text-red-300" : "bg-red-100 text-red-700";
      case "Returned":
        return isDark ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700";
      default:
        return isDark ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700";
    }
  };

  const getStatusProgress = (status) => {
    const statusFlow = ['Pending', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
    const currentIndex = statusFlow.indexOf(status);
    return currentIndex;
  };

  const canCancelOrder = (status) => {
    return !['Delivered', 'Cancelled', 'Returned'].includes(status);
  };

  if (loading) {
    return (
      <main className={`${isDark ? "bg-gray-900 text-white" : "bg-gray-100"} min-h-screen`}>
        <div className="flex items-center justify-center min-h-screen">
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Loading orders...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className={`${isDark ? "bg-gray-900 text-white" : "bg-gray-100"} min-h-screen`}>
        <div className="flex items-center justify-center min-h-screen">
          <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow'}`}>
            <p className={`text-lg mb-4 ${isDark ? 'text-red-400' : 'text-red-600'}`}>Error</p>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{error}</p>
            <button
              onClick={loadOrders}
              className={`px-4 py-2 rounded ${isDark ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
            >
              Retry
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={`${isDark ? "bg-gray-900 text-white" : "bg-gray-100"} min-h-screen`}>
      {/* Header */}
      <section className="py-16 text-center">
        <h1 className="text-4xl font-black mb-3">My Orders</h1>
        <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
          Track and manage your orders
        </p>
      </section>

      {/* Orders Card */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className={`rounded-2xl p-6 ${isDark ? "bg-gray-800" : "bg-white shadow"}`}>
          {/* Search + Filter */}
          <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
            <input
              type="text"
              placeholder="Search order or product..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`px-4 py-2 rounded-lg border ${
                isDark ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300"
              }`}
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`px-4 py-2 rounded-lg border ${
                isDark ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300"
              }`}
            >
              <option value="All">All Orders</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Returned">Returned</option>
            </select>
          </div>

          {/* Empty State */}
          {currentOrders.length === 0 ? (
            <div className="text-center py-12">
              <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                No orders found
              </p>
              <p className={`text-sm mt-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                {orders.length === 0 ? "You haven't placed any orders yet." : "No orders match your search."}
              </p>
            </div>
          ) : (
            <>
              {/* Orders Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={`${isDark ? "border-gray-700" : "border-gray-200"} border-b`}>
                      <th className="p-3 text-left">Product</th>
                      <th className="p-3 text-left">Order ID</th>
                      <th className="p-3 text-left">Qty</th>
                      <th className="p-3 text-left">Date</th>
                      <th className="p-3 text-left">Status</th>
                      <th className="p-3 text-left">Total</th>
                      <th className="p-3 text-left">Action</th>
                    </tr>
                  </thead>  
                  <tbody>
                    {currentOrders.map((order) => {
                      const total = parseFloat(order.total) || 0;
                      
                      return (
                      <tr key={order.id} className={`${isDark ? "border-gray-700" : "border-gray-200"} border-b`}>
                        <td className="p-3 flex items-center gap-3">
                          <img
                            src={order.items[0]?.image || 'https://via.placeholder.com/50'}
                            alt={order.items[0]?.name || 'Product'}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium">{order.items[0]?.name}</p>
                            {order.items.length > 1 && (
                              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                +{order.items.length - 1} more item(s)
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="p-3 font-semibold">{order.id}</td>
                        <td className="p-3">
                          {order.items.reduce((sum, item) => sum + (item.quantity || 0), 0)}
                        </td>
                        <td className="p-3">{order.date}</td>
                        <td className="p-3">
                          <span className={`px-3 py-1 rounded-full text-sm ${statusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="p-3 font-semibold">₹{total.toLocaleString()}</td>
                        <td className="p-3 flex gap-2">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className={`px-3 py-1 rounded text-xs ${
                              isDark 
                                ? 'bg-blue-600 hover:bg-blue-500 text-white' 
                                : 'bg-blue-500 hover:bg-blue-600 text-white'
                            }`}
                          >
                            View
                          </button>
                          {canCancelOrder(order.status) && (
                            <button
                              onClick={() => handleCancelOrder(order.id)}
                              className={`px-3 py-1 rounded text-xs ${
                                isDark 
                                  ? 'bg-red-600 hover:bg-red-500 text-white' 
                                  : 'bg-red-500 hover:bg-red-600 text-white'
                              }`}
                            >
                              Cancel
                            </button>
                          )}
                        </td>
                      </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-6 gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1 rounded ${
                        currentPage === i + 1
                          ? isDark ? "bg-blue-600 text-white" : "bg-blue-500 text-white"
                          : isDark ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setSelectedOrder(null)}>
          <div 
            className={`p-8 rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto ${
              isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
            
            <div className="space-y-4">
              {/* Order Items */}
              <div className="space-y-3">
                <h3 className="font-bold text-lg">Items ({selectedOrder.items.length})</h3>
                {selectedOrder.items.map((item, idx) => {
                  const price = parseFloat(item.price) || 0;
                  const quantity = item.quantity || 1;
                  const itemTotal = price * quantity;
                  
                  return (
                  <div key={idx} className={`flex items-center gap-3 p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Qty: {quantity} × ₹{price.toLocaleString()}
                      </p>
                    </div>
                    <p className="font-bold">₹{itemTotal.toLocaleString()}</p>
                  </div>
                  );
                })}
              </div>

              {/* Order Info */}
              <div className={`space-y-2 p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Order ID:</span>
                  <span className="font-semibold">{selectedOrder.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Date:</span>
                  <span>{selectedOrder.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Payment:</span>
                  <span className="capitalize">{selectedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Status:</span>
                  <span className={`px-3 py-1 rounded-full text-sm ${statusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
                {selectedOrder.codPaymentMethod && (
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Payment Method:</span>
                    <span className="capitalize">{selectedOrder.codPaymentMethod}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-lg text-green-600">₹{parseFloat(selectedOrder.total).toLocaleString()}</span>
                </div>
              </div>

              {/* Delivery Information */}
              {(selectedOrder.trackingNumber || selectedOrder.shippedDate || selectedOrder.outForDeliveryDate || selectedOrder.estimatedDelivery || selectedOrder.deliveredDate) && (
                <div className={`space-y-2 p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <h3 className="font-bold mb-3">Delivery Information</h3>
                  {selectedOrder.trackingNumber && (
                    <div className="flex justify-between">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Tracking Number</span>
                      <span className="font-semibold text-blue-500">{selectedOrder.trackingNumber}</span>
                    </div>
                  )}
                  {selectedOrder.shippedDate && (
                    <div className="flex justify-between">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Shipped Date</span>
                      <span>{selectedOrder.shippedDate}</span>
                    </div>
                  )}
                  {selectedOrder.outForDeliveryDate && (
                    <div className="flex justify-between">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Out for Delivery</span>
                      <span>{selectedOrder.outForDeliveryDate}</span>
                    </div>
                  )}
                  {selectedOrder.estimatedDelivery && (
                    <div className="flex justify-between">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Estimated Delivery</span>
                      <span className="font-semibold text-green-500">{selectedOrder.estimatedDelivery}</span>
                    </div>
                  )}
                  {selectedOrder.deliveredDate && (
                    <div className="flex justify-between">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Delivered On</span>
                      <span className="font-semibold text-green-600">{selectedOrder.deliveredDate}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Status Progress Bar */}
              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className="font-bold mb-3">Order Status</h3>
                <div className="flex items-center justify-between relative">
                  {['Pending', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'].map((status, idx) => {
                    const currentIdx = getStatusProgress(selectedOrder.status);
                    const isCompleted = idx <= currentIdx;
                    const isCurrent = idx === currentIdx;
                    
                    return (
                      <React.Fragment key={status}>
                        <div className="flex flex-col items-center flex-1">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                            isCompleted 
                              ? isCurrent 
                                ? 'bg-green-500 text-white' 
                                : 'bg-green-500 text-white'
                              : isDark ? 'bg-gray-600 text-gray-400' : 'bg-gray-300 text-gray-500'
                          }`}>
                            {isCompleted ? '✓' : idx + 1}
                          </div>
                          <p className={`text-xs mt-2 text-center ${isCurrent ? 'font-bold' : ''}`}>
                            {status}
                          </p>
                        </div>
                        {idx < 4 && (
                          <div className={`flex-1 h-1 mx-1 rounded ${
                            idx < currentIdx 
                              ? 'bg-green-500' 
                              : isDark ? 'bg-gray-600' : 'bg-gray-300'
                          }`} />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              {/* Cancel Order Button */}
              {canCancelOrder(selectedOrder.status) && (
                <div className={`p-4 rounded-lg ${isDark ? 'bg-red-900/20 border border-red-800' : 'bg-red-50 border border-red-200'}`}>
                  <button
                    onClick={() => handleCancelOrder(selectedOrder.id)}
                    className={`w-full py-3 rounded-lg ${
                      isDark 
                        ? 'bg-red-600 hover:bg-red-500 text-white' 
                        : 'bg-red-500 hover:bg-red-600 text-white'
                    }`}
                  >
                    Cancel Order
                  </button>
                  <p className={`text-xs mt-2 text-center ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                    This will mark the order as cancelled
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className={`mt-6 w-full py-3 rounded-lg ${
                isDark 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
              }`}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Orders;