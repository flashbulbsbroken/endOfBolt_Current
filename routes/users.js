var express = require('express');
var path = require('path');

var router = express.Router();

router.get('/', function(request, response, next) {
  response.json(request.isAuthenticated());
});

router.get('/home', function(request, response, next){
  response.sendFile(path.join(__dirname, '../views/home.html'));
});

module.exports = router;
