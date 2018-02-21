var express = require('express'); // Node.js web application framework
var app = express();
var port = process.env.PORT || 8080;
var morgan = require('morgan'); // HTTP request logger middleware for node.js
var mongoose = require('mongoose'); // elegant mongodb object modeling for node.js
var bodyParser = require('body-parser'); // Node.js body parsing middleware
var router = express.Router();
var appRoutes = require('./app/routes/api')(router);
var path = require('path');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + '/public'));
app.use('/api', appRoutes);

mongoose.connect('mongodb://localhost:27017/mean-tutorial', function(err) {
  if (err) {
    console.log("Not connected to the db: ", err);
  } else {
    console.log("Successfully connected to db");
  }
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(port, function() {
  console.log("Running the server on port:", port);
});
