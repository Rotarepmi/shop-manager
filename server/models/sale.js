const mongoose = require('mongoose');

// Schema for Sale in db
const saleSchema = mongoose.Schema({
  code: {
    type: Number,
    required: true
  },
  reduction: {
    type: Number,
    required: true
  }
});

const sale = module.exports = mongoose.model('sale', saleSchema);
