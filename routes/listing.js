const express       = require('express');
const router        = express.Router();
const Listing       = require('../models/listing');
const mongoose      = require('mongoose');
const crypto        = require("crypto");
const multer        = require('multer');

const DIR = './public/uploads/';

var upload = multer({ dest: DIR });

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DIR);
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + file.originalname);
    });
  }
});

var upload = multer({ storage: storage });

router.options('/api'); // enable pre-flight request for DELETE request


router.post('/:userId', upload.any(), function (req, res, next) {
  if (req.body.newListing) {
    let property = JSON.parse(req.body.property);

    property.uploadToken = req.body.token;
    property.photos = [process.env.BASE_URL + '/uploads/' + req.files[0].filename];
    property.manual = true;
    property.userId = req.params.userId;
    property.location = { type: 'Point', coordinates: [-43.172896, -22.906847] };

    const listing = new Listing(property);
    listing.save(err => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: err });
      } else {
        res.status(200).json({ message: "Listing saved" });
      }
    });
  } else {
    Listing.findOneAndUpdate(
        { "uploadToken": req.body.token }, 
        { $push: { photos: process.env.BASE_URL + '/uploads/' + req.files[0].filename } }, 
        err => {
          if (err) {
            res.status(500).json({ error: err });
          } else {
            res.status(200).json({ message: "Photo saved" });
          }
    });
  }
});

router.get('/', (req, res, next) => {
  let query = getQuery(JSON.parse(req.query.filter));

  Listing.find().count(query).exec((err, count) => {
    Listing.find(query).skip(+req.query.offset).limit(+req.query.limit).exec((err, listingList) => {
      if (err) {
        res.status(500).json(err);
        return;
      }
      listingList.forEach(listing => {
        listing.photos = listing.photos.map(photo => {
          return photo.split(":")[0] === "https" ? photo : "http://localhost:3000/uploads/" + photo;
        });
      });
      res.status(200).json({ listings: listingList, count: count });
    });
  });
});

router.get("/:userId", (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  Listing.find({ userId: req.params.userId }, (err, listings) => {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.status(200).json({ listings });
  });
});

router.put('/:id', (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
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
});

router.delete('/:id', (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
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
  });
});


function getQuery(filter) {

  let query = { $and: [] };

  if (filter.typesBRN) query.listingType = filter.typesBRN;
  if (filter.minPrice) query.$and.push({ price: { $gte: filter.minPrice } });
  if (filter.maxPrice) query.$and.push({ price: { $lte: filter.maxPrice } });
  if (filter.bedrooms) query.bedrooms = { $gte: filter.bedrooms };

  if (filter.propertyType.house || filter.propertyType.apartment || filter.propertyType.villa) {
    query.$or = [];
    if (filter.propertyType.house) query.$or.push({ propertyType: "house" });
    if (filter.propertyType.apartment) query.$or.push({ propertyType: "apartment" });
    if (filter.propertyType.villa) query.$or.push({ propertyType: "villa" });
  }

  if (filter.bounds) {
    query.$and.push({
      location: {
        $geoWithin: {
          $polygon: [ [filter.bounds.lngSW, filter.bounds.latSW],
                      [filter.bounds.lngSW, filter.bounds.latNE],
                      [filter.bounds.lngNE, filter.bounds.latNE],
                      [filter.bounds.lngNE, filter.bounds.latSW] ]
        }
      }
    });
  }

  if (filter.polygon) {
    query.$and.push({
      location: {
        $geoWithin: {
          $polygon: filter.polygon
        }
      }
    });
  }

  if (filter.city) {
    query.city = { $regex: filter.city, $options: "-i" };
  }
  if (filter.neighbourhood) {
    query.neighbourhood = { $regex: filter.neighbourhood, $options: "-i" };
  }
  if (filter.street) {
    query.street = { $regex: filter.street, $options: "-i" };
  }

  if (query.$and.length === 0) delete query.$and;
  
  return query;
}

module.exports = router;
