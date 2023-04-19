const Student = require('../models/student');

exports.getAttendanceByClass = async (req, res) => {
  try {
    const students = await Student.find({ class: req.params.className });
    res.render('attendance', { students });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
};
