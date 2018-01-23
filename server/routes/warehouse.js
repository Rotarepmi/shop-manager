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

module.exports = router;
