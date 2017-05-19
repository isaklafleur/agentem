var express = require('express');
var router  = express.Router();
const Listing = require('../models/listing');
const mongoose = require('mongoose');
const upload = require('../config/multer');


router.get('/', (req, res, next) => {
  Listing.find((err, listingList) => {
    if (err) {
      res.json(err);
      return;
    }
    listingList.forEach(listing=>{
      if(listing.image.split('/')[1]==="uploads") {
        listing.image = "http://localhost:3000"+listing.image;
      }
    })
    res.json(listingList);
  });
});

router.post('/', upload.single('file'), function(req, res) {

  const listing = new Listing(req.body);

  listing.save((err) => {
    if (err) {
      return res.send(err);
    }

    return res.json({
      message: 'New Listing created!',
    });
  });
});

router.get('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  
  Listing.findById(req.params.id, (err, listing) => {
      if (err) {
        res.json(err);
        return;
      }
      if(listing.image.split('/')[1]==="uploads") {
        listing.image = "http://localhost:3000"+listing.image;
      }
      res.json(listing);
    });
});


router.put('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  const updates = req.body;
  
  Listing.findByIdAndUpdate(req.params.id, updates, (err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: 'Listing updated successfully'
    });
  });
})

/* DELETE a Phone. */
router.delete('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  
  Listing.remove({ _id: req.params.id }, (err) => {
    if (err) {
      res.json(err);
      return;
    }

    return res.json({
      message: 'Listing has been removed!'
    });
  })
});

module.exports = router;
