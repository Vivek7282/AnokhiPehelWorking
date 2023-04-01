const express = require('express');
const router = express.Router();
const Student = require('/student');

// Fetch the list of students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find({ class: 'navodaya' });
    res.render('attendance', { students });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
