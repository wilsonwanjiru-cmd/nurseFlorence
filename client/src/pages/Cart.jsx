import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { FaTrash } from 'react-icons/fa';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useContext(CartContext);

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <Link to="/products" className="btn">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {cartItems.map(item => (
          <div key={item._id} className="cart-item">
            <img src={item.image || 'https://via.placeholder.com/80'} alt={item.name} />
            <div className="item-info">
              <h3>{item.name}</h3>
              <p>AED {item.price}</p>
            </div>
            <div className="item-quantity">
              <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
            </div>
            <div className="item-total">AED {item.price * item.quantity}</div>
            <button className="remove-btn" onClick={() => removeFromCart(item._id)}>
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Total: AED {getCartTotal()}</h3>
        <Link to="/checkout" className="btn primary">Proceed to Checkout</Link>
      </div>
    </div>
  );
};

export default Cart;