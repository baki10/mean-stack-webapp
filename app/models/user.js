var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');  // Lib to help you hash passwords

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    lowercase: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
});

UserSchema.pre('save', function(next) {
  var user = this;
  bcrypt.hash(user.password, null, null, function(err, hash) {
    if(err){
      return next(err);
    }
    user.password = hash;
    next();
  });
});

UserSchema.methods.comparePasswords = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
