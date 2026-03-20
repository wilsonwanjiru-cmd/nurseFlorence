const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    // Change username and password to your preferred admin credentials
    const admin = new User({ 
      username: 'nurseflorence', 
      password: 'WilsonWanjiru@2021'
    });
    await admin.save();
    console.log('Admin user created successfully');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error creating admin:', err);
    mongoose.connection.close();
  });