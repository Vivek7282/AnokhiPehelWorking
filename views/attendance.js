const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  present: {
    type: Boolean,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  class: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Attendance', attendanceSchema);
