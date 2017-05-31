const express = require('express');

const router = express.Router();
const Listing = require('../models/listing');

// Get user information by user id.
router.get('/', (req, res) => {
  const query = {
    neighbourhood: req.query.neighbourhood,
    city: req.query.city,
  };
  console.log(query);
// http://localhost:3000/api/stats?neighbourhood=Copacabana&city=Rio%20de%20Janeiro
  Listing.find(query, { neighbourhood: 1, street: 1, city: 1, priceSqm: 1 }, (err, result) => {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.json(result);
  });
});

module.exports = router;
