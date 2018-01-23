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

module.exports = router;
