var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./util');

var questionsSchema = new Schema ({
  question: {type: String},
  answerA: {type: String},
  answerB: {type: String},
  answerC: {type: String},
  answerD: {type: String},
  correctAnswer: {type: String}
});

module.exports = mongoose.model('Question', questionsSchema);