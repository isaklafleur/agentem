const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const listingSchema = new Schema({
  name: String,
  photos: Array,
  price: Number,
  condo: Number,
  propertyType: {
        type: String,
        enum : ['appartment','house', 'villa'],
        default: 'appartment'
  },
  listingType: {
        type: String,
        enum : ['rental','sale', 'new'],
        default: 'sale'
  },
  deliveryDate: Date,
  stageOfWork: String,
  size: Number,
  bedrooms: Number,
  suites: Number,
  parking: Number,
  neighbourhood: String,
  street: String,
  streetNumber: String,
  city: String,
  zip: String,
  brokerId: String, 
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  uploadToken: Number,
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;