var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require("cors");
const portDB         = require('./config/db').portDB;
const databaseName   = require('./config/db').databaseName;
const mongoose = require('mongoose');

var listingRoutes = require('./routes/listing');
var users = require('./routes/users');
var fs = require('fs');

var multer = require('multer');

var DIR = './public/uploads/';
 
var upload = multer({dest: DIR});
 
var app = express();

mongoose.connect(`mongodb://localhost:${portDB}/${databaseName}`);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var corsOptions = {credentials: true, origin: 'http://localhost:4200'};
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

//app.use(cors({ credentials: true, origin: 'http://localhost:4200' }));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', index);
app.use('/api/listings', listingRoutes);

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
