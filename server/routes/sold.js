var express = require('express');
var router = express.Router();

// Bring in product model
const Sold = require('../models/sold');

/* GET sold products listing. */
router.get('/', function(req, res, next) {
  Sold.find({}, (err, products) => {
    if(err) {
      console.log(err);
    }
    else{
      res.json(products);
    }
  });
});

module.exports = router;
