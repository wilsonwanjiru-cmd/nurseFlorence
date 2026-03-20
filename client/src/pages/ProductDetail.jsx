import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import './ProductDetail.css';

const API = import.meta.env.VITE_API_BASE_URL;

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios.get(`${API}/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => {
        console.error(err);
        navigate('/products');
      });
  }, [id, navigate]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-detail">
      <div className="detail-image">
        <img src={product.image || 'https://via.placeholder.com/400'} alt={product.name} />
      </div>
      <div className="detail-info">
        <h2>{product.name}</h2>
        <p className="category">{product.category}</p>
        <p className="price">AED {product.price}</p>
        <p className="description">{product.description || 'No description available.'}</p>
        <p className="stock">{product.inStock ? '✅ In Stock' : '❌ Out of Stock'}</p>
        <button
          className="btn"
          onClick={() => { addToCart(product); navigate('/cart'); }}
          disabled={!product.inStock}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;