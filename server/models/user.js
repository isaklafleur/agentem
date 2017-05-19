const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["user","broker"]
  },
  name: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
