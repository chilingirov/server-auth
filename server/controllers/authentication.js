const jwt = require("jwt-simple");
const User = require("../models/user");
const config = require("../config");

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}
exports.signin = function(req, res, next) {
  //User has already had their email and pass auth
  //We just have to give them the token
  res.send({ token: tokenForUser(req.user) });
};
exports.signup = function(req, res, next) {
  //See if a user with a given email exist
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }
    //If the user exist give an error
    if (existingUser) {
      return res.status(422).send({ error: "Email is in use!" });
    }

    //If the user doesn't exist - create and save a user record
    const user = new User({
      email: email,
      password: password
    });
    if (!email || !password) {
      return res.status(422).send("You must provide email and password");
    }
    user.save(err => {
      if (err) {
        return next(err);
      }
      res.json({ token: tokenForUser(user) });
    });
  });

  //Respond to request indicating that the user was created
};
