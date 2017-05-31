const portDB         = require('../config/db').portDB;
const databaseName   = require('../config/db').databaseName;
const mongoose = require('mongoose');
const Listing = require('../models/listing');

mongoose.connect(`mongodb://localhost:${portDB}/${databaseName}`);

Listing.find({}, (err, res)=>{
  let allPhotos = [];
  res.forEach(listing=>{
    allPhotos.push(listing.photos[0])
  })

   res.forEach(listing=>{
    let photos = [];
    for(let i = 0; i<10; i++) {
      photos.push(allPhotos[Math.floor(Math.random()*allPhotos.length)])
    }
     Listing.findOneAndUpdate({"_id":listing._id}, {$push:{photos:{$each:photos}}}, (err)=>{
       // console.log("pushed: ", listing.id)
     })
  })
})