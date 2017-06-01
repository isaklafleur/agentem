const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const router = express.Router();
const jwtOptions = require('../config/jwtOptions');

const User = require('../models/user');

const bcryptSalt = 10;

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

router.post('/:id', (req, res) => {
  const updatedUser = {};
  if(req.body.role) updatedUser.role = req.body.role;
  if(req.body.fullName) updatedUser.fullName = req.body.fullName;
  if(req.body.phoneNumber) updatedUser.phoneNumber = req.body.phoneNumber;

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }


  User.findByIdAndUpdate(req.params.id, updatedUser, (err, user) => {
    if (err) {
      console.log('err: ', err);
      res.json(err);
      return;
    }
    res.status(200).json({ message: 'ok', user });
  });
});

router.put("/:userId/favorite/:listingId", (req,res)=>{
  User.findOneAndUpdate({"_id":req.params.userId}, {$addToSet:{favorites:req.params.listingId}}, err=>{
    if (err) {
      res.status(400).json({error:err});
      return;
    }
    res.status(200).json({ message: 'ok' });
  });
});

router.delete("/:userId/favorite/:listingId", (req,res)=>{
  User.findOneAndUpdate({"_id":req.params.userId}, {$pull:{favorites:req.params.listingId}}, err=>{
    if (err) {
      res.status(400).json({error:err});
      return;
    }
    res.status(200).json({ message: 'ok' });
  });
});

router.put("/:userId/search", (req,res)=>{
  let search = req.body.search;

  User.findOneAndUpdate({"_id":req.params.userId}, {$addToSet:{savedSearches:search}}, err=>{
    if (err) {
      console.log('err: ', err);
      res.status(400).json({error:err});
      return;
    }
    res.status(200).json({ message: 'ok' });
  });
});
  
router.delete("/:userId/search/:time", (req,res)=>{
  User.findOneAndUpdate({"_id":req.params.userId}, 
    {$pull:{savedSearches:{time: +req.params.time}}}, 
    err=>{
      if (err) {
        res.status(400).json({error:err});
        return;
      }
      res.status(200).json({ message: 'ok' });
    });
});

module.exports = router;
