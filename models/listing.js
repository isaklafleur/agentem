const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ListingSchema = new Schema({
  name: String,
  photos: Array,
  price: Number,
  priceSqm: Number,
  condo: Number,
  description: String,
  propertyType: {
    type: String,
    enum: ['apartment', 'house', 'villa'],
    default: 'apartment',
  },
  listingType: {
    type: String,
    enum: ['rental', 'sale', 'new'],
    default: 'sale',
  },
  deliveryDate: Date,
  stageOfWork: String,
  size: Number,
  bedrooms: Number,
  bathrooms: Number,
  suites: Number,
  parking: Number,
  neighbourhood: String,
  street: String,
  streetNumber: String,
  city: String,
  state: String,
  zip: String,
  brokerId: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  location: { type: { type: String }, coordinates: [Number] },
  accuracy: String,
  uploadToken: Number,
  manual: Boolean
});
ListingSchema.index({ location: '2dsphere' });
//ListingSchema.index({ 'city': 'text' });
//ListingSchema.index({ 'neighbourhood': 'text' });
//ListingSchema.index({ 'street': 'text' });
const Listing = mongoose.model('Listing', ListingSchema);

module.exports = Listing;
