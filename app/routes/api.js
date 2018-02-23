var User = require('../models/user');

module.exports = function (router) {
  /**
   * USER REGISTRATION
   * http://localhost:8080/users
   */
  router.post("/users", function (req, res) {
    if (req.body.username == null || req.body.username === "" ||
      req.body.password == null || req.body.password === "" ||
      req.body.email == null || req.body.email === "") {
      res.json({success: false, message: "Ensure username, email and password were provided"});
    } else {
      var user = new User();
      user.username = req.body.username;
      user.password = req.body.password;
      user.email = req.body.email;
      user.save(function (err) {
        if (err) {
          res.json({success: false, message: "Username or Email already exists!"});
        } else {
          res.json({success: true, message: "User created!"});
        }
      });
    }
  });

  /**
   * USER LOGIN
   * http://localhost:8080/authenticate
   */
  router.post("/authenticate", function (req, res) {
    User.findOne({username: req.body.username})
      .select('email username password')
      .exec(function (err, user) {
        if (err) {
          throw err;
        }
        if (!user) {
          res.json({success: false, message: "Could not authenticate user"});
        } else if (user) {
          if (!req.body.password) {
            res.json({success: false, message: "No password provided"});
          } else {
            var validPassword = user.comparePasswords(req.body.password);
            if (!validPassword) {
              res.json({success: false, message: "Could not authenticate password"});
            } else {
              res.json({success: true, message: "User authenticated"});
            }
          }
        }
      });
  });

  return router;
};
