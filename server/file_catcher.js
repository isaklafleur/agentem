var express = require('express');
var multer = require('multer');
var fs = require('fs');
var cors = require("cors");
var crypto = require("crypto");
var mime = require("mime");
var path = require('path');

var app = express();

var DIR = './uploads/';

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

app.use(cors({ credentials: true, origin: 'http://localhost:4200' }));

app.options('/api'); // enable pre-flight request for DELETE request
app.get('/api', function(req, res) {
        res.end('file catcher example');
});

app.post('/api', upload.any(), function(req, res, next) {
        // req.body contains the text fields
        console.log('uploaded');
        res.end('file uploaded');
});

var PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
        console.log('Working on port ' + PORT);
});