const express = require('express');
const compression = require('compression');
require('dotenv').config();
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('./config/passport');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const listingRoutes = require('./routes/listing');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const statRoutes = require('./routes/stats');

const app = express();
app.use(compression(9));
mongoose.connect(process.env.MONGODB_URI);

if (process.env.BASE_URL !== 'http://localhost:3000') {
  app.get('*', (req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      res.redirect('https://agentem.herokuapp.com');
    } else {
      next();
    } /* Continue to other routes if we're not redirecting */
  });
}

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const corsOptions = { credentials: true, origin: 'http://localhost:4200' };
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

app.use(passport.initialize());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/api/listings', listingRoutes);
app.use('/api/users', passport.authenticate('jwt', { session: false }), userRoutes);
app.use('/api/stats', statRoutes);
app.use('/', authRoutes);

// This will be the default route is nothing else is caught
app.use((req, res) => {
  res.sendfile(`${__dirname}/public/index.html`);
});

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
