var express = require('express');
var router = express.Router();

// Bring in product model
const Products = require('../models/products');

/* GET products listing. */
router.get('/list', function(req, res, next) {
  Products.aggregate(
    [{
      $lookup: {
        from: "prices",
        localField: "code",
        foreignField: "code",
        as: "prod_price"
      }
    },
    {
      $lookup: {
        from: "warehouse",
        localField: "code",
        foreignField: "code",
        as: "prod_ware"
      }
    },
    {
      $lookup: {
        from: "sale",
        localField: "code",
        foreignField: "code",
        as: "prod_sale"
      }
    },
    {
      $lookup: {
        from: "sold",
        localField: "code",
        foreignField: "code",
        as: "prod_sold"
      }
    }], (err, products) => {
    if(err) {
      console.log(err);
    }
    else{
      res.json(products);
    }
  });
});

module.exports = router;
