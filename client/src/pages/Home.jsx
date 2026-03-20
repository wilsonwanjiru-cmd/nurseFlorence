import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import './Home.css';

const API = import.meta.env.VITE_API_BASE_URL;

const Home = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    axios.get(`${API}/products`).then(res => {
      // Show first 6 as featured
      setFeatured(res.data.slice(0, 6));
    });
  }, []);

  return (
    <div className="home">
      <header className="hero">
        <h1>THE ONECLINIC & Drug House</h1>
        <p className="subtitle">A CERTIFIED NURSE READY TO SAVE LIVES 🤝</p>
        <p className="motto">PRECAUTION is BETTER than CURE</p>
        <div className="contact-info">
          <span>📞 +971 52 805 4038</span>
          <span>✉️ plus971nurseflorence@gmail.com</span>
        </div>
        <Link to="/products" className="btn">Browse Products</Link>
      </header>

      <section className="featured">
        <h2>Featured Items</h2>
        <div className="product-grid">
          {featured.map(product => (
            <div key={product._id} className="product-card">
              <img src={product.image || 'https://via.placeholder.com/200'} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="price">AED {product.price}</p>
              <Link to={`/product/${product._id}`} className="btn-small">View</Link>
            </div>
          ))}
        </div>
      </section>

      {/* WhatsApp Float Button */}
      <a
        href="https://wa.me/971528054038?text=Hello%20Nurse%20Florence%2C%20I%20need%20assistance%20with%20medication%20and%20consultation."
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp size={30} color="#fff" />
        <span>Chat on WhatsApp</span>
      </a>
    </div>
  );
};

export default Home;