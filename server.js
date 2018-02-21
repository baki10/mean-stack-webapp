var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var mongoose = require('mongoose');
var User = require('./app/models/user');
var bodyParser = require('body-parser');

// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));
// console logging requests
app.use(morgan('dev'));

mongoose.connect('mongodb://localhost:27017/mean-tutorial', function(err) {
  if (err) {
    console.log("Not connected to the db: ", err);
  } else {
    console.log("Successfully connected to db");
  }
});

// http://localhost:8080/users
app.post("/users", function(req, res) {
  function validInput(req) {
    return req.body.username == null || req.body.username == "" ||
      req.body.password == null || req.body.password == "" ||
      req.body.email == null || req.body.email == "";
  };
  if (validInput(req)) {
    res.send("Ensure username, email and password were provided");
  } else {
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    user.save(function(err) {
      if (err) {
        res.send(err.errmsg);
      } else {
        res.send("user created!")
      }
    });
  }
});

app.listen(port, function() {
  console.log("Running the server on port:", port);
});
