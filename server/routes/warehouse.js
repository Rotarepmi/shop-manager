var express = require('express');
var router = express.Router();

// Bring in product model
const Warehouse = require('../models/warehouse');

/* GET products in warehouse listing. */
router.get('/', function(req, res, next) {
  Warehouse.find({}, (err, products) => {
    if(err) {
      console.log(err);
    }
    else{
      res.json(products);
    }
  });
});

// Post edit functions
router.post('/editWare', (req, res) => {
  Warehouse.update({code: req.body.code}, {$set: {am: req.body.warehouse}}, err => err ? console.log(err) : res.json('success'));
});

module.exports = router;
