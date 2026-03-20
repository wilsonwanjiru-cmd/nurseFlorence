const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, default: 'General' },
  description: { type: String },
  icon: { type: String } // optional, for emoji or icon class
});

module.exports = mongoose.model('Service', serviceSchema);