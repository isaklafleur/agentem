const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const router = express.Router();
const jwtOptions = require('../config/jwtOptions');

// Our user model
const User = require('../models/user');

// Bcrypt let us encrypt passwords

const bcryptSalt = 10;


// Get user information by user id.
router.get('/:id', (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  User.findById(req.params.id).populate('favorites').exec((err, user) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(user);
  });
});

// Update user information by user id
router.post('/:id', (req, res) => {
  const updatedUser = {
    role: req.body.role,
    fullName: req.body.fullName,
    phoneNumber: req.body.phoneNumber,
    location: req.body.location,
  };

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  User.findByIdAndUpdate(req.params.id, updatedUser, (err, user) => {
    if (err) {
      res.json(err);
      return;
    }
    res.status(200).json({ message: 'ok', user });
        // res.status(200).json(user);
  });
});

router.put("/:userId/favorite/:listingId", (req,res)=>{
  User.findOneAndUpdate({"_id":req.params.userId}, {$addToSet:{favorites:req.params.listingId}}, err=>{
    if (err) {
      res.status(400).json({error:err});
      return;
    }
    res.status(200).json({ message: 'ok' });
  })
})

router.delete("/:userId/favorite/:listingId", (req,res)=>{
  User.findOneAndUpdate({"_id":req.params.userId}, {$pull:{favorites:req.params.listingId}}, err=>{
    if (err) {
      res.status(400).json({error:err});
      return;
    }
    res.status(200).json({ message: 'ok' });
  })
})


module.exports = router;
