import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OrderHistory.css';

const OrderHistory = () => {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`${backendUrl}/orderHistory`, {
           withCredentials: true,
      })
      .then((res) => setOrders(res.data))
      .catch((err) => console.error('Failed to fetch order history', err));
  }, []);

  return (
    <div className="order-history-container">
      <h2 className="page-title">Order History</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-header">Order ID: {order._id}</div>

            <div className="order-section">
              <h4>📦 Items</h4>
              {order.items.map((item, index) => (
                <div className="item-container" key={index}>
                  <p className="item-detail"><strong>Name:</strong> {item.name}</p>
                  <p className="item-detail"><strong>Size:</strong> {item.size}</p>
                  <p className="item-detail"><strong>Qty:</strong> {item.quantity}</p>
                  <p className="item-detail"><strong>Price:</strong> ₹{item.price}</p>
                </div>
              ))}
            </div>

            <div className="order-section">
              <h4>🏠 Address</h4>
              <p className="address-detail">{order.address.fullName}</p>
              <p className="address-detail">Phone: {order.address.mobile}</p>
              <p className="address-detail">{order.address.block}, {order.address.locality}</p>
              <p className="address-detail">{order.address.state} - {order.address.city}-{order.address.pincode}</p>
              <p className="address-detail"> Landmark: {order.address.landmark}</p>
            </div>

            <div className="order-section">
              <h4>💰 Summary</h4>
              <p className="order-detail">Subtotal: ₹{order.subtotal}</p>
              <p className="order-detail">Discount: ₹{order.discount}</p>
              <p className="order-detail">Delivery: ₹{order.delivery}</p>
              <p className="order-detail"><strong>Total: ₹{order.total}</strong></p>
              <p className="order-detail">Status: {order.paymentStatus}</p>
              <p className="order-detail">Stripe ID: {order.stripeSessionId}</p>
              <p className="order-detail">Placed On: {new Date(order.createdAt).toLocaleString()}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;
