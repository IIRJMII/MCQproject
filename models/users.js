var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
require('./util');
               
var usersSchema = new Schema({
  name: {type: String},
  username: {type: String},
  email: {type: String},
  password: String,
  NetworksAndDataCommunications: {type: Number, default: 0},
  NetworksAndDataCommunicationsTotal: {type: Number, default: 0},
  OOP: {type: Number, default: 0},
  OOPTotal: {type: Number, default: 0},
  SoftwareEngineering: {type: Number, default: 0},
  SoftwareEngineeringTotal: {type: Number, default: 0},
  IntroductionToModelling: {type: Number, default: 0},
  IntroductionToModellingTotal: {type: Number, default: 0},
  NextGenTech: {type: Number, default: 0},
  NextGenTechTotal: {type: Number, default: 0},
  LinearAlgebra: {type: Number, default: 0},
  LinearAlgebraTotal: {type: Number, default: 0},
  accessToken: String
});

usersSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

usersSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', usersSchema); 