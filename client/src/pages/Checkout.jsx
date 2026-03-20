import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({ name: '', phone: '' });

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customer.name || !customer.phone) {
      alert('Please fill in all fields');
      return;
    }

    // Build order message
    let message = `Hello Nurse Florence, I would like to order:\n\n`;
    cartItems.forEach(item => {
      message += `- ${item.name} x${item.quantity} = AED ${item.price * item.quantity}\n`;
    });
    message += `\nTotal: AED ${getCartTotal()}\n`;
    message += `\nName: ${customer.name}`;
    message += `\nPhone: ${customer.phone}`;

    // Encode for WhatsApp URL
    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/971528054038?text=${encoded}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Clear cart and redirect to home
    clearCart();
    navigate('/');
  };

  if (cartItems.length === 0) {
    navigate('/products');
    return null;
  }

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <div className="checkout-container">
        <div className="order-summary">
          <h3>Your Order</h3>
          {cartItems.map(item => (
            <div key={item._id} className="summary-item">
              <span>{item.name} x{item.quantity}</span>
              <span>AED {item.price * item.quantity}</span>
            </div>
          ))}
          <div className="summary-total">
            <strong>Total:</strong> <strong>AED {getCartTotal()}</strong>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="checkout-form">
          <h3>Your Details</h3>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={customer.name}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone Number"
            value={customer.phone}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn primary">Place Order via WhatsApp</button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;