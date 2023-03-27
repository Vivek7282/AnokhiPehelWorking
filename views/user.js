// userRecord.js

const mongoose = require('mongoose');

const userRecordSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  class: {
    type: string,
    required: true
  }
});

const userRecord = mongoose.model('userRecord', userRecordSchema);

module.exports = userRecord;
