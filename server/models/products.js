const mongoose = require('mongoose');

// Schema for Porducts in db
const prodSchema = mongoose.Schema({
  code: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  manufacturer: {
    type: String,
    requred: true
  }
});

const products = module.exports = mongoose.model('products', prodSchema);
