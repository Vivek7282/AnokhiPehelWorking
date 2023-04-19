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
      else if (mentor.class === "Pre2") {
        res.redirect('/mentorLogintoclass/pre2mentor');
      } 
      else if (mentor.class === "Pre3") {
        res.redirect('/mentorLogintoclass/pre3mentor');
      } 
      else if (mentor.class === "three") {
        res.redirect('/mentorLogintoclass/threementor');
      } 
      else if (mentor.class === "four") {
        res.redirect('/mentorLogintoclass/fourmentor');
      } 
      else if (mentor.class === "five") {
        res.redirect('/mentorLogintoclass/fivementor');
      } 
      else if (mentor.class === "six") {
        res.redirect('/mentorLogintoclass/sixmentor');
      }
      else if (mentor.class === "seven") {
        res.redirect('/mentorLogintoclass/sevenmentor');
      } 
      else if (mentor.class === "eight") {
        res.redirect('/mentorLogintoclass/mentor');
      } 
      else if (mentor.class === "") {
        res.redirect('/mentorLogintoclass/eightmentor');
      } 
      else if (mentor.class === "nine") {
        res.redirect('/mentorLogintoclass/ninementor');
      } 
      else if (mentor.class === "ten") {
        res.redirect('/mentorLogintoclass/tenmentor');
      }   
      else if (mentor.class === "eleven") {
        res.redirect('/mentorLogintoclass/elevenmentor');
      } 
      else if (mentor.class === "twelve") {
        res.redirect('/mentorLogintoclass/twelvementor');
      } 
    }
  });
};
