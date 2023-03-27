// testPaper.js

const mongoose = require('mongoose');

const testPaperSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  data: {
    type: Buffer,
    required: true
  },
  scores: [{
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    },
    batch: {
        type: Number,
        required: true
      },
    marks: {
      type: Number,
      required: true
    }
  }]
});

const TestPaper = mongoose.model('TestPaper', testPaperSchema);

module.exports = TestPaper;
