const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const mongoose = require('mongoose');
const dbConfig = require('./config/database');

const app = express();

mongoose.connect(dbConfig.database);
const db = mongoose.connection;

// Check connection
db.once('open', () => {
  console.log('Connected to mongodb');
});

// Check for db errors
db.on('error', (err) => {
  console.log(err);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: false }));

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const index = require('./routes/index'),
      products = require('./routes/products'),
      prices = require('./routes/prices'),
      warehouse = require('./routes/warehouse'),
      sold = require('./routes/sold'),
      sale = require('./routes/sale');

app.use('/', index);
app.use('/products', products);
app.use('/prices', prices);
app.use('/warehouse', warehouse);
app.use('/sold', sold);
app.use('/sale', sale);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
