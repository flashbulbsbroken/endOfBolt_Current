var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');

var index = require('./routes/index');
var home = require('./routes/home');
var users = require('./routes/users');
var login = require('./routes/login');
var register = require('./routes/register');
var add = require('./routes/add');
//var uploads = require('./routes/uploads');

var User = require('./models/user');
var Swatch = require('./models/swatch');

var app = express();

////////////////////////////////////////////////////////////////////////////
//////////////
//////////////       MongoDB Setup START
//////////////
////////////////////////////////////////////////////////////////////////////

var mongoURI = 'mongodb://localhost:27017/endofbolt';
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function (err) {
  console.log('oh snap, mongodb connection error', err);
});

MongoDB.once('open', function () {
  console.log('mongodb connection open');
});

////////////////////////////////////////////////////////////////////////////
//////////////
//////////////       MongoDB Setup END
//////////////
////////////////////////////////////////////////////////////////////////////

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use('/views', express.static('views'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(session({
  secret: 'secret',
  key: 'user',
  resave: true,
  saveUninitialized: false,
  //cookie, allows for 60,000 ms/one minute of inactivity before logging out
  cookie: { maxAge: 900000, secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use('local', new LocalStrategy({passReqToCallback : true, usernameField: 'username'},
    function(request, username, password, done) {
      User.findOne({username:username}, function(err, user){

        if(err) throw err;
        if(!user){
          return done(null, false, {message: 'Incorrect username or password'});
        }
        user.comparePassword(password, function(err, isMatch){
          if(err) throw err;
          if(isMatch){
            return done(null, user);
          }else{
            done(null, false, {message: 'Incorrect username or password'});
          }
        });
      });
    }));

passport.serializeUser(function(user, done){
  done(null, user.id);
});
passport.deserializeUser(function(id, callback){
  User.findById(id, function(err, user){
    if(err) callback(err);
    callback(null, user)
  });
});

app.use('/', index);
app.use('/home', home);
app.use('/users', users);
app.use('/login', login);
app.use('/register', register);
app.use('/add', add);

//Catch all
app.get('/*', function(request, response, next) {
  response.sendFile(path.join(__dirname, '../views/index.html'));
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

