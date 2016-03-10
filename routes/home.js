var express = require('express');
var path = require('path');
var User = require('../models/user');
var Swatch = require('../models/swatch');

var router = express.Router();

router.get('/get', function(request, response, next) {

    var userId = request.user._id;

    console.log('User ID is', userId);

    User.findOne({_id : userId}, function(err, user){
        if(err) throw err;
        console.log('User\'s Fabric Stash', user.fabricStash);
        response.send(user.fabricStash);
        //response.sendStatus(200);
    });
});


//testing out modal details



//router.get('/details', function(request, response, next){
//    //var swatchId = request.fabricStash.img.path;
//    //
//    //console.log(swatchId);
//    //
//    //Swatch.findOne({path : swatchId}, function(err, user){
//    //    if(err) throw err;
//
//        response.send(fabricStash);
//
//        response.sendStatus(200);
//    //})
//
//});




router.get('/', function(request, response, next) {
    console.log('hit home whack endpoint');
    response.sendFile(path.join(__dirname, '../views/home.html'));
});

module.exports = router;
