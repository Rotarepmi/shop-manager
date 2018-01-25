var express = require('express');
var router = express.Router();

// Bring in product model
const Sale = require('../models/sale');

/* GET products on sale listing. */
router.get('/', function(req, res, next) {
  Sale.find({}, (err, products) => {
    if(err) {
      console.log(err);
    }
    else{
      res.json(products);
    }
  });
});

// Post edit functions
router.post('/editSale', (req, res) => {
  Sale.update({code: req.body.code}, {code: req.body.code, reduction: req.body.sale}, {upsert: true}, err => err ? console.log(err) : res.json('success'));
});

module.exports = router;
