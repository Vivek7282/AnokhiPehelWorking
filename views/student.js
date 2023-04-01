const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
   place: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('student', studentSchema);
