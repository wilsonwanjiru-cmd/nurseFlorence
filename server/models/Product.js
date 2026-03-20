const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  image: { type: String }, // URL to image
  inStock: { type: Boolean, default: true },
  type: { type: String, enum: ['product', 'service'], default: 'product' }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);