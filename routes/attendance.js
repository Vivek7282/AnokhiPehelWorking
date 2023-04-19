const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendance');

router.get('/attendance/:className', attendanceController.getAttendanceByClass);

module.exports = router;
