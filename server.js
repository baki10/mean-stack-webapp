var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var mongoose = require('mongoose');

// console logging requests
app.use(morgan('dev'));

mongoose.connect('mongodb://localhost:27017/mean-tutorial', function (err) {
  if(err){
    console.log("Not connected to the db: ",err);
  }else{
    console.log("Successfully connected to db");
  }
});

app.listen(port, function () {
  console.log("Running the server on port:", port);
});
