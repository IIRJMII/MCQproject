var express = require('express');
var router = express.Router();
var User = require('../models/users');
var jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET login/registration page */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login/Register' });
});

// GET user data
router.get('/getUser', function (req, res, next) {
  try {
    var jwtString = req.cookies.Authorization.split(" ");
    var profile = verifyJwt(jwtString[1]);
    console.log(profile);
    if (profile) {
      User.find({'accessToken': jwtString[1]}, function (err, user) {
        if (err)
          res.send(err);
        if(user)
          res.json(user);
      });
    }
  }catch (err) {
    res.json({
      "status": "error",
      "body": [
        "You are not logged in."
      ]
    });
  }
});

/*
* Registers user
*/
router.post('/register', function(req, res, next){
  var name = req.body.name;
  var userName = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  
  // Check if account already exists
  User.findOne({'email': email}, function(err, user){
    if(err)
      res.send(err);
    if(user) {
      res.status(401).json({
        "status": "info",
        "body": "Email address already registered"
      });
    }
    //if email not registered
    else {
      User.findOne({'username': userName}, function(err, user){
        if (err)
          res.send(err);
        //check if username is taken
        if (user) {
          res.status(401).json({
            "status": "info",
            "body": "Username already taken"
          });
        } 
        else {
          // If there is no user with that username create the user
          var newUser = new User();
          // set the user's local credentials
          newUser.name = name;
          newUser.username = userName;
          newUser.email = email;
          newUser.password = newUser.generateHash(password);
          newUser.accessToken = createJwt({username:userName});
          newUser.save(function(err, user) {
            if (err)
              throw err;
            res.cookie('Authorization', 'Bearer ' + user.accessToken); 
            res.json({'success' : 'account created'});
          });
        }
      });
    }
  })
});

/*
* Logs user in
*/
router.post('/login', function(req, res, next){
  var email = req.body.email;
  var password = req.body.password;
  User.findOne({'email': email}, function (err, user) {
    // if there are any errors, return the error
    if (err)
      res.send(err);
    // If user account found then check the password
    if (user) {
      // Compare passwords
      if (user.validPassword(password)) {
        // Success : Assign new access token for the session
        user.accessToken = createJwt({email: email});
        user.save();
        res.cookie('Authorization', 'Bearer ' + user.accessToken); 
        res.json({'success' : 'loggedIn'});
      }
      else {
        res.status(401).send({
        "status": "error",
        "body": "Username or password does not match"
        });
      }
    }
    else {
      res.status(401).send({
      "status": "error",
      "body": "Username not found"
      });
    }
  });
});

function createJwt(profile) {
    return jwt.sign(profile, 'MCQ', {
        expiresIn: '10d'
    });
}

function verifyJwt(jwtString) {
    var value = jwt.verify(jwtString, 'MCQ');
    return value;
}


module.exports = router;
