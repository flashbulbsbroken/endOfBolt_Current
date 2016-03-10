var express = require('express');
var passport = require('passport');
var path = require('path');

var Users = require('../models/user');

var router = express.Router();

router.get('/register', function(request, response, next){
    response.sendFile(path.join(__dirname, '../views/register.html'));
});

router.get('/home', function(request, response, next){
    response.sendFile(path.join(__dirname, '../views/home.html'));
});

router.post('/', function(request, response, next){
    Users.create(request.body, function(err, post){
        if(err){
            next(err);
        }else{
            response.redirect('/');
        }
    });
});


module.exports = router;
