const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const portDB = require('./config/db').portDB;
const databaseName = require('./config/db').databaseName;
const passport = require('./config/passport');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const listingRoutes = require('./routes/listing');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const fs = require('fs');

const multer = require('multer');

const DIR = './public/uploads/';

const upload = multer({ dest: DIR });

const app = express();

mongoose.connect(`mongodb://localhost:${portDB}/${databaseName}`);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const corsOptions = { credentials: true, origin: 'http://localhost:4200' };
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/listings', listingRoutes);
app.use('/api/users', /*passport.authenticate('jwt', { session: false }),*/ userRoutes);
app.use('/', authRoutes);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
