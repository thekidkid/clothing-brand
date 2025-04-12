const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  phone: String,
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }]
});

module.exports = mongoose.model('User', UserSchema); 