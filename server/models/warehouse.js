const mongoose = require('mongoose');

// Schema for Warehouse in db
const wareSchema = mongoose.Schema({
  code: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: Boolean,
    required: true
  }
});

const warehouse = module.exports = mongoose.model('warehouse', wareSchema);
