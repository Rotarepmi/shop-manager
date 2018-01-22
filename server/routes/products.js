var express = require('express');
var router = express.Router();

// Bring in products model
const Products = require('../models/products');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Products.find({}, (err, product) => {
    if(err) {
      console.log(err);
    }
    else{
      res.json(product);
    }
  });
});

module.exports = router;
