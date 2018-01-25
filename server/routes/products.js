var express = require('express');
var router = express.Router();

// Bring in product model
const Products = require('../models/products');

/* GET products listing. */
router.get('/list', (req, res, next) => {
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
    else {
      res.json(products);
    }
  });
});

// Post edit functions
router.post('/editName', (req, res) => {
  Products.update({code: req.body.code}, {$set: {name: req.body.name}}, err => err ? console.log(err) : res.json('success'));
});

router.post('/editManufacturer', (req, res) => {
  Products.update({code: req.body.code}, {$set: {manufacturer: req.body.manufacturer}}, err => err ? console.log(err) : res.json('success'));
});

router.post('/editCategory', (req, res) => {
  Products.update({code: req.body.code}, {$set: {category: req.body.category}}, err => err ? console.log(err) : res.json('success'));
});

module.exports = router;
