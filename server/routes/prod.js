var express = require('express');
var router = express.Router();

// Bring in models
const Products = require('../models/products'),
      Prices = require('../models/prices'),
      Warehouse = require('../models/warehouse');

router.post('/', (req, res) => {
  const products = new Products(),
        prices = new Prices(),
        warehouse = new Warehouse();

  products.code = req.body.code;
  products.name = req.body.name;
  products.category = req.body.category;
  products.manufacturer = req.body.manufacturer;
  prices.code = req.body.code;
  prices.price = req.body.price;
  warehouse.code = req.body.code;
  warehouse.am = req.body.am;

  products.save(err => {if(err) console.log(err)});
  prices.save(err => {if(err) console.log(err)});
  warehouse.save(err =>  err ? console.log(err) : res.json('success'));
});

router.delete('/:code', (req, res) => {
  const query = {code: req.params.code};
  Products.remove(query, err => {if(err) console.log(err)});
  Prices.remove(query, err => {if(err) console.log(err)});
  Warehouse.remove(query, err => err ? console.log(err) : res.json('success'));
});

module.exports = router;
