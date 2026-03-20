import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const API = import.meta.env.VITE_API_BASE_URL;

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    inStock: true,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin');
      return;
    }

    // --- Define async function inside the effect ---
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API}/products`);
        setProducts(res.data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };

    fetchProducts(); // Call it inside the effect
  }, [navigate]); // no need to add fetchProducts to deps

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin');
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const config = { headers: { 'x-auth-token': token } };
    try {
      if (editing) {
        await axios.put(`${API}/products/${editing}`, form, config);
      } else {
        await axios.post(`${API}/products`, form, config);
      }
      setForm({ name: '', description: '', price: '', category: '', image: '', inStock: true });
      setEditing(null);

      // fetch updated products
      const res = await axios.get(`${API}/products`);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      alert('Operation failed');
    }
  };

  const editProduct = (product) => {
    setEditing(product._id);
    setForm(product);
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${API}/products/${id}`, { headers: { 'x-auth-token': token } });
      const res = await axios.get(`${API}/products`);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <button onClick={handleLogout} className="btn logout">Logout</button>
      </div>

      <h3>{editing ? 'Edit Product' : 'Add New Product'}</h3>
      <form onSubmit={handleSubmit} className="product-form">
        <input name="name" placeholder="Name" value={form.name} onChange={handleInputChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleInputChange} />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleInputChange} required />
        <input name="category" placeholder="Category" value={form.category} onChange={handleInputChange} required />
        <input name="image" placeholder="Image URL" value={form.image} onChange={handleInputChange} />
        <label>
          <input name="inStock" type="checkbox" checked={form.inStock} onChange={handleInputChange} />
          In Stock
        </label>
        <button type="submit" className="btn primary">{editing ? 'Update' : 'Add'}</button>
        {editing && (
          <button
            type="button"
            onClick={() => {
              setEditing(null);
              setForm({ name: '', description: '', price: '', category: '', image: '', inStock: true });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <h3>Products List</h3>
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th><th>Price</th><th>Category</th><th>Stock</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>AED {p.price}</td>
              <td>{p.category}</td>
              <td>{p.inStock ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => editProduct(p)}>Edit</button>
                <button onClick={() => deleteProduct(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;