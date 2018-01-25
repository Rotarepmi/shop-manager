var express = require('express');
var router = express.Router();

// Bring in prices model
const Prices = require('../models/prices');

/* GET products listing. */
router.get('/list', function(req, res, next) {
  Prices.find({}, (err, prices) => {
    if(err) {
      console.log(err);
    }
    else{
      res.json(prices);
    }
  });
});

// Post edit functions
router.post('/editPrice', (req, res) => {
  Prices.update({code: req.body.code}, {$set: {price: req.body.price}}, err => err ? console.log(err) : res.json('success'));
});

module.exports = router;
