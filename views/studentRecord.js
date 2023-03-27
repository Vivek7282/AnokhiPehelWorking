// studentRecord.js

const mongoose = require('mongoose');

const studentRecordSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  batch: {
    type: Number,
    required: true
  }
});

const StudentRecord = mongoose.model('StudentRecord', studentRecordSchema);

module.exports = StudentRecord;
