// userRecord.js

const mongoose = require('mongoose');

const userRecordSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  class: {
    type: String,
    required: true
  }
});

const userRecord = mongoose.model('userRecord', userRecordSchema);

module.exports = userRecord;
