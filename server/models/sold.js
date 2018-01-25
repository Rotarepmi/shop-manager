const mongoose = require('mongoose');

// Schema for Sold in db
const soldSchema = mongoose.Schema({
  code: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
});

const sold = module.exports = mongoose.model('sold', soldSchema, 'sold');
