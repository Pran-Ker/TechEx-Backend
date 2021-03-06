const mongoose = require('mongoose');

const users = mongoose.model('users', mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 7,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 10,
  },
  verified: {
    type: Boolean,
    default: false,
  },
}));

module.exports = users;
