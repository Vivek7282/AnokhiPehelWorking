const mongoose = require('mongoose');

const mentorLoginSchema = new mongoose.Schema({
  name : String,
  email: String,
  password: String,
  class : String
});

module.exports = mongoose.model('MentorLogin1', mentorLoginSchema);
