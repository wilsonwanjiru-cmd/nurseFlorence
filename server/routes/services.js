const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

// GET all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new service (optional, for admin)
router.post('/', async (req, res) => {
  const service = new Service({
    name: req.body.name,
    category: req.body.category,
    description: req.body.description
  });
  try {
    const newService = await service.save();
    res.status(201).json(newService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;