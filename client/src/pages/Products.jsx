import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import './Products.css';

const API = import.meta.env.VITE_API_BASE_URL;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('All');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(`${API}/products`).then(res => {
      setProducts(res.data);
      const cats = [...new Set(res.data.map(p => p.category))];
      setCategories(['All', ...cats]);
    });
  }, []);

  const filtered = filter === 'All' ? products : products.filter(p => p.category === filter);

  return (
    <div className="products-page">
      <h2>Our Products & Services</h2>
      <div className="filter-bar">
        {categories.map(cat => (
          <button
            key={cat}
            className={filter === cat ? 'active' : ''}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="product-grid">
        {filtered.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;