import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const API_BASE_URL = 'http://localhost:5000';

const AdminOrders = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
      
      const response = await fetch(`${API_BASE_URL}/order?${params.toString()}`);
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
    if (orders.length > 0) {
      loadOrders();
    }
  }, [statusFilter, searchQuery]);

  const updateOrderStatus = async (orderId, newStatus, additionalData = {}) => {
    try {
      const response = await fetch(`${API_BASE_URL}/order/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
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

  const handleMarkProcessing = (orderId) => {
    updateOrderStatus(orderId, 'Processing');
  };

  const handleMarkShipped = (orderId) => {
    const trackingNumber = `TRK-${Date.now()}`;
    updateOrderStatus(orderId, 'Shipped', { 
      trackingNumber,
      shippedDate: new Date().toISOString().split('T')[0]
    });
  };

  const handleMarkOutForDelivery = (orderId) => {
    updateOrderStatus(orderId, 'Out for Delivery', { 
      outForDeliveryDate: new Date().toISOString().split('T')[0],
      estimatedDelivery: new Date(Date.now() + 24*60*60*1000).toISOString().split('T')[0] // Next day
    });
  };

  const handleMarkDelivered = (orderId, codPaymentMethod = null) => {
    const updateData = { 
      deliveredDate: new Date().toISOString().split('T')[0],
      paymentStatus: 'paid'
    };
    if (codPaymentMethod) {
      updateData.codPaymentMethod = codPaymentMethod;
    }
    updateOrderStatus(orderId, 'Delivered', updateData);
  };

  const handleMarkCancelled = (orderId, reason = '') => {
    updateOrderStatus(orderId, 'Cancelled', { 
      cancellationReason: reason,
      cancelledDate: new Date().toISOString().split('T')[0]
    });
  };

  const handleMarkReturned = (orderId) => {
    updateOrderStatus(orderId, 'Returned', { 
      returnedDate: new Date().toISOString().split('T')[0],
      refundStatus: 'pending'
    });
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure? This will cancel the order.')) {
      return;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/order/${orderId}/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason: 'Cancelled by admin' })
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

  const handleMarkReturn = async (orderId) => {
    if (!window.confirm('Mark this order as returned?')) {
      return;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/order/${orderId}/return`, {
        method: 'POST'
      });
      
      const result = await response.json();
      
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to return order');
      }
      
      await loadOrders();
      
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(result.data);
      }
    } catch (err) {
      console.error('Error returning order:', err);
      alert(err.message || 'Failed to return order');
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return isDark ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-700';
      case 'Processing':
        return isDark ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700';
      case 'Shipped':
        return isDark ? 'bg-purple-900 text-purple-300' : 'bg-purple-100 text-purple-700';
      case 'Out for Delivery':
        return isDark ? 'bg-orange-900 text-orange-300' : 'bg-orange-100 text-orange-700';
      case 'Delivered':
        return isDark ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700';
      case 'Cancelled':
        return isDark ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-700';
      case 'Returned':
        return isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700';
      default:
        return isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700';
    }
  };

  const canUpdateStatus = (currentStatus, targetStatus) => {
    const statusFlow = ['Pending', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
    const currentIdx = statusFlow.indexOf(currentStatus);
    const targetIdx = statusFlow.indexOf(targetStatus);
    
    // Can only move forward in the flow (except for Cancelled/Returned which can be done anytime)
    if (targetStatus === 'Cancelled' || targetStatus === 'Returned') {
      return !['Delivered', 'Cancelled', 'Returned'].includes(currentStatus);
    }
    
    if (currentIdx === -1 || targetIdx === -1) return false;
    return targetIdx >= currentIdx;
  };

  const handleMarkStatus = (status) => {
    if (!selectedOrder) return;
    
    switch (status) {
      case 'Processing':
        handleMarkProcessing(selectedOrder.id);
        break;
      case 'Shipped':
        handleMarkShipped(selectedOrder.id);
        break;
      case 'Out for Delivery':
        handleMarkOutForDelivery(selectedOrder.id);
        break;
      case 'Delivered':
        // For COD orders, this will be handled by the two separate buttons
        break;
      case 'Cancelled':
        handleMarkCancelled(selectedOrder.id);
        break;
      case 'Returned':
        handleMarkReturn(selectedOrder.id);
        break;
    }
  };

  if (loading) {
    return (
      <main className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
        <div className="flex items-center justify-center min-h-screen">
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Loading orders...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
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
    <main className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Delivery Management</h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Update order statuses and manage deliveries
            </p>
          </div>
          <button
            onClick={() => navigate('/orders')}
            className={`px-4 py-2 rounded-lg ${
              isDark 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-white hover:bg-gray-50 text-gray-900 border'
            }`}
          >
            Back to Orders
          </button>
        </div>

        {/* Filters */}
        <div className={`rounded-xl p-6 mb-6 ${isDark ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by Order ID or product name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`flex-1 px-4 py-2 rounded-lg border ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
              }`}
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`px-4 py-2 rounded-lg border ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
              }`}
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Returned">Returned</option>
            </select>
          </div>
        </div>

        {/* Orders List */}
        <div className={`rounded-xl overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={isDark ? 'bg-gray-700' : 'bg-gray-50'}>
                <tr>
                  <th className="p-4 text-left">Order ID</th>
                  <th className="p-4 text-left">Items</th>
                  <th className="p-4 text-left">Total</th>
                  <th className="p-4 text-left">Payment</th>
                  <th className="p-4 text-left">Current Status</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-8 text-center">
                      <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                        No orders found
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map(order => {
                    const total = parseFloat(order.total) || 0;
                    
                    return (
                    <tr key={order.id} className={`${isDark ? 'border-gray-700' : 'border-gray-200'} border-b`}>
                      <td className="p-4">
                        <p className="font-semibold">{order.id}</p>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {order.date}
                        </p>
                        {order.trackingNumber && (
                          <p className={`text-xs mt-1 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                            Track: {order.trackingNumber}
                          </p>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <img 
                            src={order.items[0]?.image} 
                            alt={order.items[0]?.name}
                            className="w-10 h-10 rounded object-cover"
                          />
                          <div>
                            <p className="font-medium text-sm">{order.items[0]?.name}</p>
                            {order.items.length > 1 && (
                              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                +{order.items.length - 1} more
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-semibold">₹{total.toFixed(2)}</td>
                      <td className="p-4">
                        <span className="capitalize text-sm">{order.paymentMethod}</span>
                        {order.codPaymentMethod && (
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Paid via {order.codPaymentMethod}
                          </p>
                        )}
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className={`px-3 py-1 rounded text-xs ${
                            isDark 
                              ? 'bg-blue-600 hover:bg-blue-500 text-white' 
                              : 'bg-blue-500 hover:bg-blue-600 text-white'
                          }`}
                        >
                          Manage
                        </button>
                      </td>
                    </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Order Management Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setSelectedOrder(null)}>
          <div 
            className={`p-8 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto ${
              isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold">Order Management</h2>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {selectedOrder.id} • {selectedOrder.date}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className={`text-2xl ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
              >
                ×
              </button>
            </div>

            {/* Order Items */}
            <div className={`rounded-lg p-4 mb-6 ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <h3 className="font-bold mb-3">Order Items</h3>
              <div className="space-y-3">
                {selectedOrder.items.map((item, idx) => {
                  const price = parseFloat(item.price) || 0;
                  const quantity = item.quantity || 1;
                  const itemTotal = price * quantity;
                  
                  return (
                  <div key={idx} className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Qty: {quantity} × ₹{price.toFixed(2)}
                      </p>
                    </div>
                    <p className="font-bold text-sm">₹{itemTotal.toFixed(2)}</p>
                  </div>
                  );
                })}
              </div>
              <div className={`mt-4 pt-3 border-t ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-green-600">₹{parseFloat(selectedOrder.total).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Current Status */}
            <div className={`rounded-lg p-4 mb-6 ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <h3 className="font-bold mb-2">Current Status</h3>
              <div className="flex items-center gap-3">
                <span className={`px-4 py-2 rounded-full font-semibold ${getStatusColor(selectedOrder.status)}`}>
                  {selectedOrder.status}
                </span>
                {selectedOrder.paymentMethod === 'cod' && selectedOrder.status === 'Delivered' && (
                  <span className={`px-3 py-1 rounded text-xs ${selectedOrder.codPaymentMethod === 'cash' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}>
                    Paid via {selectedOrder.codPaymentMethod || 'Not recorded'}
                  </span>
                )}
              </div>
            </div>

            {/* Status Update Actions */}
            <div className={`rounded-lg p-4 mb-6 ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <h3 className="font-bold mb-4">Update Status</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['Processing', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled', 'Returned'].map(status => {
                  const canUpdate = canUpdateStatus(selectedOrder.status, status);
                  const isCOD = selectedOrder.paymentMethod === 'cod';
                  
                  return (
                    <div key={status} className="relative">
                      {status === 'Delivered' && isCOD && selectedOrder.status !== 'Delivered' ? (
                        <div className="space-y-2">
                          <button
                            onClick={() => handleMarkDelivered(selectedOrder.id, 'cash')}
                            disabled={!canUpdate}
                            className={`w-full py-2 px-3 rounded text-sm ${
                              canUpdate
                                ? isDark 
                                  ? 'bg-green-600 hover:bg-green-500 text-white' 
                                  : 'bg-green-500 hover:bg-green-600 text-white'
                                : isDark 
                                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            ✓ Delivered (Cash)
                          </button>
                          <button
                            onClick={() => handleMarkDelivered(selectedOrder.id, 'upi')}
                            disabled={!canUpdate}
                            className={`w-full py-2 px-3 rounded text-sm ${
                              canUpdate
                                ? isDark 
                                  ? 'bg-blue-600 hover:bg-blue-500 text-white' 
                                  : 'bg-blue-500 hover:bg-blue-600 text-white'
                                : isDark 
                                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            ✓ Delivered (UPI)
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleMarkStatus(status)}
                          disabled={!canUpdate}
                          className={`w-full py-2 px-3 rounded text-sm ${
                            canUpdate
                              ? isDark 
                                ? 'bg-blue-600 hover:bg-blue-500 text-white' 
                                : 'bg-blue-500 hover:bg-blue-600 text-white'
                              : isDark 
                                ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          {status === 'Cancelled' ? '✗ ' : status === 'Returned' ? '↩ ' : '→ '}
                          {status}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
              <p className={`text-xs mt-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Click a button to update the order status. For COD orders, choose payment method when marking delivered.
              </p>
            </div>

            {/* Delivery Info (if shipped) */}
            {selectedOrder.status !== 'Pending' && (
              <div className={`rounded-lg p-4 mb-6 ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className="font-bold mb-3">Delivery Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {selectedOrder.trackingNumber && (
                    <div>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Tracking Number</p>
                      <p className="font-semibold">{selectedOrder.trackingNumber}</p>
                    </div>
                  )}
                  {selectedOrder.shippedDate && (
                    <div>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Shipped Date</p>
                      <p>{selectedOrder.shippedDate}</p>
                    </div>
                  )}
                  {selectedOrder.outForDeliveryDate && (
                    <div>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Out for Delivery</p>
                      <p>{selectedOrder.outForDeliveryDate}</p>
                    </div>
                  )}
                  {selectedOrder.estimatedDelivery && (
                    <div>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Est. Delivery</p>
                      <p className="font-semibold text-green-600">{selectedOrder.estimatedDelivery}</p>
                    </div>
                  )}
                  {selectedOrder.deliveredDate && (
                    <div>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Delivered On</p>
                      <p className="font-semibold text-green-600">{selectedOrder.deliveredDate}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Cancel/Return Confirmation */}
            {(selectedOrder.status === 'Pending' || selectedOrder.status === 'Processing' || selectedOrder.status === 'Shipped') && (
              <div className={`rounded-lg p-4 border ${isDark ? 'border-red-800 bg-red-900/20' : 'border-red-200 bg-red-50'}`}>
                <h3 className="font-bold mb-3 text-red-600">Cancel Order</h3>
                <p className={`text-sm mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Cancel this order and update status to Cancelled
                </p>
                <button
                  onClick={() => handleCancelOrder(selectedOrder.id)}
                  className={`w-full py-2 rounded ${
                    isDark 
                      ? 'bg-red-600 hover:bg-red-500 text-white' 
                      : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
                >
                  Cancel Order
                </button>
              </div>
            )}

            {selectedOrder.status === 'Delivered' && (
              <div className={`rounded-lg p-4 border ${isDark ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}>
                <h3 className="font-bold mb-3">Return Order</h3>
                <p className={`text-sm mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Customer wants to return this order
                </p>
                <button
                  onClick={() => handleMarkReturn(selectedOrder.id)}
                  className={`w-full py-2 rounded ${
                    isDark 
                      ? 'bg-gray-600 hover:bg-gray-500 text-white' 
                      : 'bg-gray-500 hover:bg-gray-600 text-white'
                  }`}
                >
                  Mark as Returned
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default AdminOrders;