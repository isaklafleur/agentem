const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();
const jwtOptions = require('../config/jwtOptions');

// Our user model
const User = require('../models/user');

// Bcrypt let us encrypt passwords

const bcryptSalt = 10;

router.post('/login', (req, res) => {
  let username;
  let password;
  if (req.body.username && req.body.password) {
    username = req.body.username;
    password = req.body.password;
  }

  if (username === '' || password === '') {
    res.status(401).json({ message: 'fill up the fields' });
    return;
  }

  User.findOne({ username }, (err, user) => {
    if (!user) {
      res.status(401).json({ message: 'No such user found in the database' });
    } else {
      bcrypt.compare(password, user.password, (err, isMatch) => {
        console.log(isMatch);
        if (!isMatch) {
          res.status(401).json({ message: 'Password did not match' });
        } else {
          const payload = { id: user._id };
          const token = jwt.sign(payload, jwtOptions.secretOrKey);
          res.json({ message: 'ok', token });
        }
      });
    }
  });
});

router.post('/signup', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    res.status(400).json({ message: 'Please provide username and password' });
    return;
  }

  User.findOne({ username }, 'username', (err, user) => {
    if (user !== null) {
      res.status(400).json({ message: 'user exist' });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = User({
      username,
      password: hashPass,
    });

    newUser.save((err, user) => {
      if (err) {
        res.status(400).json({ message: err });
      } else {
        const payload = { id: user._id, user: user.username };

        const token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.status(200).json({ message: 'ok', token, user });
        // res.status(200).json(user);
      }
    });
  });
});


module.exports = router;
