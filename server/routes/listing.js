var express = require('express');
var router  = express.Router();
const Listing = require('../models/listing');
const mongoose = require('mongoose');
var crypto = require("crypto");
//const upload = require('../config/multer');

var multer = require('multer');

var DIR = './public/uploads/';
 
var upload = multer({dest: DIR});


var storage = multer.diskStorage({
        destination: function(req, file, cb) {
                cb(null, DIR)
        },
        filename: function(req, file, cb) {
                crypto.pseudoRandomBytes(16, function(err, raw) {
                        cb(null, raw.toString('hex') + Date.now() + '.' + file.originalname);
                });
        }
});

var upload = multer({ storage: storage });

router.options('/api'); // enable pre-flight request for DELETE request
router.get('/api', function(req, res) {
      res.end('file catcher example');
});

router.post('/', upload.any(), function(req, res, next) {
        // req.body contains the text fields

        if(req.body.newListing) {

          let property = JSON.parse(req.body.property);
        
          property.uploadToken = req.body.token;
          
          property.photos = [req.files[0].filename];

          const listing = new Listing(property);
          listing.save(err=>{
            if(err) {
              console.log(err);
              res.status(500).json({error: err})
            } else {
              res.status(200).json({message: "Listing saved"})
            }
          })
        } else {
          Listing.findOneAndUpdate({"uploadToken":req.body.token}, {$push:{photos:req.files[0].filename}}, err=>{
            if(err) {
              res.status(500).json({error: err})
            } else {
              res.status(200).json({message: "Photo saved"})
            }
          })
        }
});


router.get('/', (req, res, next) => {

//latitude=-22.917499
//longitude=-43.174357799999996
//radians 0.00126294518


// "location" : {
//         $geoWithin : {
//             $centerSphere : [[-43.174357799999996, -22.917499], 0.00126294518 ]
//         }
//     }

  let query = "{";

  query+= req.query.minPrice ? `"price":{"$gte":${req.query.minPrice}},` : "";
  query+= req.query.maxPrice ? `"price":{"$lte":${req.query.maxPrice}},` : "";
  query+= req.query.bedrooms ? `"bedrooms":{"$gte":${req.query.bedrooms}},` : "";

  if(req.query.house || req.query.apartment || req.query.villa) {
    query+= `"$or":[`;
    query+= req.query.house ? `{"propertyType":"house"},` : "";
    query+= req.query.apartment ? `{"propertyType":"apartment"},` : "";
    query+= req.query.villa ? `{"propertyType":"villa"},` : "";
    query = query.substr(0, query.length-1);
    query+= "],";
  }
 
  query = query[query.length-1]==="," ? query.substr(0, query.length-1) : query;
  query+= "}";
  query = JSON.parse(query);
  if(req.query.longitude) {
    query.location = {
        $geoWithin : {
            $centerSphere : [[req.query.longitude, req.query.latitude], req.query.radius/6371 ]
        }
    }
  }
  var queryBounds;
  if(req.query.bounds) {
    let bounds = JSON.parse(req.query.bounds)

    queryBounds = { location : {
        $geoWithin: {
          $polygon: [ [bounds.lngSW, bounds.latSW],[bounds.lngSW, bounds.latNE], [bounds.lngNE, bounds.latNE], [bounds.lngNE, bounds.latSW]   ]
        }
      }
    };
  }
  var queryPolygon;
  if(req.query.polygon) {
    queryPolygon = { location : {
        $geoWithin: {
          $polygon: JSON.parse(req.query.polygon)
        }
      }
    };
  }

  if(queryBounds || queryPolygon) {
    query.$and = [];
    if(queryBounds) query.$and.push(queryBounds); 
    if(queryPolygon) query.$and.push(queryPolygon);
  }


  if(req.query.city) {
    query.city = { $regex : req.query.city, $options : "-i" }
  }
  if(req.query.neighbourhood) {
    query.neighbourhood = { $regex : req.query.neighbourhood, $options : "-i" }
  }
  if(req.query.street) {
    query.street = { $regex : req.query.street, $options : "-i" }
  }

   // query.location = query.location ? {$and:[ { location: query.location }, {location: queryPolygon} ]} : queryPolygon;
    
    console.log(query);

//  query = {bedrooms:{$gte:2}};
  Listing.find().count(query).exec((err,count)=>{
    Listing.find(query).skip(+req.query.offset).limit(+req.query.limit).exec((err, listingList) => {
      if (err) {
        res.status(500).json(err);
        return;
      }
      listingList.forEach(listing=>{
        listing.photos = listing.photos.map(photo=>{
            return photo.split(":")[0]==="https" ? photo : "http://localhost:3000/uploads/"+photo;
        });
      });
      res.status(200).json({listings:listingList, count:count});
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
