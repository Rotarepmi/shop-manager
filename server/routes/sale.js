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

module.exports = router;
