//var express = require('express');
//var path = require('path');
//var fs = require('fs');
//var router = express.Router();
//var Swatch = require('../models/swatch');
//
//router.get('/')
//
//
//
//router.get('/:name', function (request, response, next) {
//    console.log(request.params);
//    Swatch.findOne({name: request.params.name}, function(err, swatch){
//        var imagePath = path.join(__dirname, '../' + request.params.swatch.path);
//        response.sendFile(imagePath);
//    });
//});
//
//module.exports = router;
//
//
////Need to GET home page to refresh the images in the stash