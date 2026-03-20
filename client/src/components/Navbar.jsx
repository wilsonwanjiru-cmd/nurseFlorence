import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">Nurse Florence</Link>
        <ul className="nav-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/cart" className="cart-link">
            <FaShoppingCart /> Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link></li>
          <li><Link to="/admin">Admin</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;