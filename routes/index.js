var express = require('express');
var path = require('path');
var passport = require('passport');

var router = express.Router();

/* GET home page. */
router.get('/', function(request, response, next) {
  response.sendFile(path.join(__dirname, '../views/index.html'));
});

router.post('/', passport.authenticate('local', {
  successRedirect: '#/home',
  failureRedirect: '#/'
}));

module.exports = router;
