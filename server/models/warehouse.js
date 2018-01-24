const mongoose = require('mongoose');

// Schema for Warehouse in db
const wareSchema = mongoose.Schema({
  code: {
    type: Number,
    required: true
  },
  am: {
    type: Number,
    required: true
  }
});

const warehouse = module.exports = mongoose.model('warehouse', wareSchema, 'warehouse');
