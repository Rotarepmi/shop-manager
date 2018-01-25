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

// Post edit functions
router.post('/editSold', (req, res) => {
  Sold.update({code: req.body.code}, {code: req.body.code, amount: req.body.sold}, {upsert: true}, err => err ? console.log(err) : res.json('success'));
});

module.exports = router;
