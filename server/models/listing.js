const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const listingSchema = new Schema({
  name: String,
  photos: Array,
  price: Number,
  propertyType: {
        type: String,
        enum : ['appartment','house'],
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
  neighborhood: String,
  street: String,
  streetNumbre: Number,
  city: String,
  zip: String,
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;