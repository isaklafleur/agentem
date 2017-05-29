const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  role: {
    type: String,
    enum: ['home_seller', 'both_buyer_and_seller', 'renter', 'home_owner', 'renter_rentee', 'real_estate_pro', 'other'],
  },
  fullName: String,
  phoneNumber: Number,
  location: String,
  favorites: [{type: mongoose.Schema.Types.ObjectId, ref:'Listing'}],
  savedSearches: [Object],
  recentSearches: [Object]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
