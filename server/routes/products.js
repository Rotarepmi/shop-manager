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

/* Sort ascending (descending for front end) by target value */
router.get('/sortUp/:target', (req, res, next) => {
  const target = req.params.target;
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
    },
    {
      $sort : {
        [target] : -1
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

/* Sort descending (ascending for front end) by target value */
router.get('/sortDown/:target', (req, res, next) => {
  const target = req.params.target;
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
    },
    {
      $sort : {
        [target] : 1
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

/* Aggregate by category */
router.get('/categoryAggr/:category', (req, res, next) => {
  const category = req.params.category;
  Products.aggregate(
    [{
      $match : {
        category: category
      }
    },
    {
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

/* Group and count category items*/
router.get('/categoryCount/:category', (req, res, next) => {
  let category = req.params.category;

  if(category != "all"){
    Products.aggregate(
      [{
        $match : {
          category: category
        }
      },
      {
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
      },
      { "$unwind": "$prod_price" },
      { "$unwind": "$prod_ware" },
      {
        $group : {
          _id: null,
          totalPrice: { $sum: { $multiply: ["$prod_price.price", "$prod_ware.am"]}},
          count: { $sum: 1 }
        }
      }], (err, products) => {
      if(err) {
        console.log(err);
      }
      else {
        res.json(products);
      }
    });
  }
  else{
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
      },
      { "$unwind": "$prod_price" },
      { "$unwind": "$prod_ware" },
      {
        $group : {
          _id: null,
          totalPrice: { $sum: { $multiply: ["$prod_price.price", "$prod_ware.am"]}},
          count: { $sum: 1 }
        }
      }], (err, products) => {
      if(err) {
        console.log(err);
      }
      else {
        res.json(products);
      }
    });
  }

});

module.exports = router;
