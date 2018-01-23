const mongoose = require('mongoose');

// Schema for Proces in db
const priceSchema = mongoose.Schema({
  code: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

const prices = module.exports = mongoose.model('prices', priceSchema);
