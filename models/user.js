var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var swatchSchema = require('./swatch').schema;

var Schema = mongoose.Schema;

var SALT_WORK_FACTOR =10;

var UserSchema = new Schema({
    username: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true},
    firstName: String,
    lastName: String,
    profileImg: String,
    fabricStash: [swatchSchema]
});

UserSchema.pre('save', function(next){
    var user = this;

    if(!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err) return next(err);

        bcrypt.hash (user.password, salt, function(err, hash){
            if(err) return next(err);

            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, callback){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err) return callback(err);
        callback(null, isMatch);
    })
};

module.exports = mongoose.model('User', UserSchema);