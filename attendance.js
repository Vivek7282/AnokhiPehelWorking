const express = require('express');
const router = express.Router();
const Attendance = require('/attendance');

// Save the attendance data
router.post('/', async (req, res) => {
  try {
    const { present } = req.body;
    const studentIds = Array.isArray(present) ? present : [present];
    const attendance = studentIds.map((studentId) => ({ studentId }));
    await Attendance.insertMany(attendance);
    res.redirect('/students');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
