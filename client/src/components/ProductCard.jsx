import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="product-card">
      <img src={product.image || 'https://via.placeholder.com/200'} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">AED {product.price}</p>
      <p className="stock">{product.inStock ? 'In Stock' : 'Out of Stock'}</p>
      <div className="actions">
        <Link to={`/product/${product._id}`} className="btn-small">Details</Link>
        <button onClick={() => addToCart(product)} className="btn-small primary">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;