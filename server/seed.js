const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

const products = [
  // Medicines / Products
  { name: 'HIV PrEP (30-day supply)', price: 250, category: 'HIV', image: 'https://via.placeholder.com/150', inStock: true, type: 'product' },
  { name: 'HIV PEP (28-day kit)', price: 300, category: 'HIV', image: 'https://via.placeholder.com/150', inStock: true, type: 'product' },
  { name: 'Emergency Pill (P2)', price: 50, category: 'Contraception', image: 'https://via.placeholder.com/150', inStock: true, type: 'product' },
  { name: 'Daily Pills (Femiplan)', price: 80, category: 'Contraception', image: 'https://via.placeholder.com/150', inStock: true, type: 'product' },
  { name: 'Implant (3 years)', price: 600, category: 'Contraception', image: 'https://via.placeholder.com/150', inStock: true, type: 'product' },
  { name: 'IUD Coil', price: 800, category: 'Contraception', image: 'https://via.placeholder.com/150', inStock: true, type: 'product' },
  { name: 'Depo Provera Injection', price: 150, category: 'Contraception', image: 'https://via.placeholder.com/150', inStock: true, type: 'product' },
  { name: 'HIV Self Test Kit', price: 120, category: 'Testing', image: 'https://via.placeholder.com/150', inStock: true, type: 'product' },
  { name: 'STI/UTI Test Kit', price: 100, category: 'Testing', image: 'https://via.placeholder.com/150', inStock: true, type: 'product' },
  { name: 'Pregnancy Test Kit', price: 30, category: 'Testing', image: 'https://via.placeholder.com/150', inStock: true, type: 'product' },
  { name: 'Antibiotics (course)', price: 120, category: 'Medication', image: 'https://via.placeholder.com/150', inStock: true, type: 'product' },
  // Services (free or consultation)
  { name: 'General Consultation', price: 0, category: 'Consultation', image: 'https://via.placeholder.com/150', inStock: true, type: 'service' },
  { name: 'Free Consultation', price: 0, category: 'Consultation', image: 'https://via.placeholder.com/150', inStock: true, type: 'service' },
  { name: 'STI/UTI Diagnosis & Treatment', price: 0, category: 'STI/UTI', image: 'https://via.placeholder.com/150', inStock: true, type: 'service' },
  { name: 'Pregnancy Care & Complications', price: 0, category: 'Pregnancy', image: 'https://via.placeholder.com/150', inStock: true, type: 'service' },
  { name: 'Family Planning Options', price: 0, category: 'Family Planning', image: 'https://via.placeholder.com/150', inStock: true, type: 'service' },
  { name: 'Medical & Pre-Visa Tests', price: 0, category: 'Testing', image: 'https://via.placeholder.com/150', inStock: true, type: 'service' }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('Products seeded');
    mongoose.connection.close();
  })
  .catch(err => console.log(err));