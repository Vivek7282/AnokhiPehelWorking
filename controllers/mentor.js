const MentorLogin1 = require('../models/mentorlogin');

exports.mentorLogin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email + password);
  MentorLogin1.findOne({ email: email, password: password }, (err, mentor) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    } else if (!mentor) {
      res.status(401).send('Invalid Email or Password');
    } else {
      if (mentor.class === "Pre1") {
        res.redirect('/mentorLogintoclass/pre1mentor');
      } else if (mentor.class === "Navodaya") {
        res.redirect('/mentorLogintoclass/navodayamentor');
      } 
    }
  });
};
