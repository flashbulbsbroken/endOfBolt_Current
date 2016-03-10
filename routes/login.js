var express = require('express');
var passport = require('passport');
var path = require('path');

var router = express.Router();

router.get('/', function(request, response, next){
    response.sendFile(path.join(__dirname, '../views/index.html'));
});
//
//router.post('/', passport.authenticate('local', {
//    successRedirect: '/users/home',
//    failureRedirect: '/register/register'
//}));

module.exports = router;