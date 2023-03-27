// classSchedule.js

const mongoose = require('mongoose');

const classScheduleSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true
  }, 
  subject: {
    type: String,
    required: true
  },
  teacher: {
    type: String,
    required: true
  }
});

const ClassSchedule = mongoose.model('ClassSchedule', classScheduleSchema);

module.exports = ClassSchedule;
