const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @route   POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Login attempt for username:', username); // DEBUG

    const user = await User.findOne({ username });
    if (!user) {
      console.log('User not found'); // DEBUG
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    console.log('Stored hashed password:', user.password); // DEBUG
    console.log('Plain password from request:', password); // DEBUG

    const isMatch = await user.comparePassword(password);
    console.log('Password match result:', isMatch); // DEBUG

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({ token });
  } catch (err) {
    console.error('Login error:', err); // DEBUG
    res.status(500).send('Server error');
  }
});

module.exports = router;