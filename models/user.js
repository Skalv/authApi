var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    "username": {type: String, required: true},
    "password": {type: String, required: true},
    "email": {type: String, required: true}
})

userSchema.pre('save', function(next) {
    _this = this;
    if (this.isModified('password')) {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(_this.password, salt, function(err, hash) {
                _this.password = hash;
                next();
            })
        })
    } else {
        next();
    }
})

module.exports = mongoose.model("User", userSchema);