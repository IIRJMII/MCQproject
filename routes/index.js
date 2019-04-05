var express = require('express');
var router = express.Router();
var Question = require('../models/questions');
var User = require('../models/users');
var jwt = require('jsonwebtoken');
var myModule = "";

var userData;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MCQ' });
});

//GET module pages
router.get('/LinearAlgebra', function(req, res, next)
{
  myModule = 'LinearAlgebra';
  res.render('LinearAlgebra', { title: 'Linear Algebra' });
});

router.get('/NetworksAndDataCommunications', function(req, res, next)
{
  myModule = 'NetworksAndDataCommunications';
  res.render('NetworksAndDataCommunications', { title: 'Networks & Data Communications' });
});

router.get('/IntroductionToModelling', function(req, res, next)
{
  myModule = 'IntroductionToModelling';
  res.render('IntroductionToModelling', { title: 'Networks & Data Communications' });
});

router.get('/NextGenerationTechnologies', function(req, res, next)
{
  myModule = 'NextGenTech';
  res.render('NextGenerationTechnologies', { title: 'Next Generation Technologies' });
});

router.get('/ObjectOrientedProgramming', function(req, res, next)
{
  myModule = 'OOP';
  res.render('ObjectOrientedProgramming', { title: 'Object Oriented Programming' });
});

router.get('/SoftwareEngineering', function(req, res, next)
{
  myModule = 'SoftwareEngineering';
  res.render('SoftwareEngineering', { title: 'Software Engineering' });
});

//GET questions for the module
router.get('/getQuestions', function (req, res, next) {
  Question.find({module: myModule}, function (err, questions) {
    if (err)
      res.send(err);
    var questionArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var alreadyPicked = new Array(10);
    console.log("test");
    for(i = 0; i <= 9 && (i+1) <= questions.length; i++)
      {
        var x = Math.floor(Math.random() * questions.length);
        if(alreadyPicked.includes(x) == false)
          {
            questionArray[i] = questions[x];
            alreadyPicked.push(x);
          }
        else
          {
            i--;
          }
      }
    res.json(questionArray);
  });
});

//UPDATE average
router.put('/updateAverage/:id/:avg', function(req, res, next){
  console.log("test");
  var id = req.params.id;
  var avg = req.params.avg;
  var module = myModule;
  User.updateOne({_id:id}, {$set : {[module]: avg}, $inc: {[module+'Total']: 10}}, function (err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
});

module.exports = router;
