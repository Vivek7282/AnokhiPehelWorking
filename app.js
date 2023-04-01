const express = require("express");
const bodyParser= require("body-parser")
const mongoose = require('mongoose');
const config = require('./config');
const app= express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const { MentorLogin } = require('./views/user');
app.use(flash());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
// app.use(express.static(__dirname + 'views/assets'));
app.use(express.static('assets'))

//database connection
mongoose.set("strictQuery", false);
mongoose.connect(config.url, config.options)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

app.get("/", function(req, res){
    res.render("index");
})

app.get("/student", function(req, res){
    res.render("student");
})
app.get("/mentors", function(req, res){
    res.render("mentors");
})
app.get("/classes", function(req, res){
    res.render("classes");
})
app.get("/events", function(req, res){
    res.render("events");
})
app.get("/navodaya", function(req, res){
    res.render("navodaya");
})
app.get("/location", function(req, res){
    res.render("location");
})







// app.get("/cordinator", function(req, res){
//     res.render("cordinator");
// })



// to fetch class cordinator
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017/Anokhi_Pehel_Working';

const client = new MongoClient(uri, { useUnifiedTopology: true });
client.connect((err) => {
    if (err) {
      console.error(err);
      return;
    }

  });
  
const db = client.db('Anokhi_Pehel_Working');
const collection = db.collection('classCordinator');
collection.find({}).toArray((err, data) => {
    if (err) {
      console.error(err);
      return;
    }
  });
app.get('/cordinator', (req, res) => {
    collection.find({}).toArray((err, data) => {
      if (err) {
        console.error(err);
        return;
      }
  
      res.render('cordinator', { data });
    });
  });
  







// to get all students of navodaya

const collection1 = db.collection('student');
collection1.find({}).toArray((err, data) => {
    if (err) {
      console.error(err);
      return;
    }
});
  app.get('/studentsnavodaya', (req, res) => {
    collection1.find({}).toArray((err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        res.render('student', { data, class: 'navodaya' });

      });
    });





    // To get all students of chilla

    const collection4 = db.collection('student');
    collection4.find({}).toArray((err, data) => {
        if (err) {
          console.error(err);
          return;
        }
    });
    app.get('/chilla', (req, res) => {
        collection4.find({}).toArray((err, data) => {
            if (err) {
              console.error(err);
              return;
            }
            res.render('studentLocation', { data, place: 'Chilla' });
          });
        });









//to get all student
const collection3 = db.collection('student');
collection3.find({}).toArray((err, data) => {
    if (err) {
      console.error(err);
      return;
    }
});
app.get('/students', (req, res) => {
    collection3.find({}).toArray((err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        res.render('studentAll',{data} );
      });
    });
// To get all student end









app.get("/mentorLogin", function(req, res){
    res.render("mentorLogin");
})

app.get("/adminlogin", function(req, res){
    res.render("adminlogin");
})
app.get("/locationcordi", function(req, res){
    res.render("locationcordi");
})
app.get("/classcordi", function(req, res){
    res.render("classcordi");
})





//login varification navodaya 
app.get("/navodayamentor", function(req, res){
    res.render("navodayamentor");
})


const mentorLoginSchema = new mongoose.Schema({
    name : String,
    email: String,
    password: String,
    class : String
  });
  
  const MentorLogin1 = mongoose.model('MentorLogin1', mentorLoginSchema);
  
  app.post('/mentorLogin', (req, res) => {
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
        if(MentorLogin1.findOne({class : "navodaya"}))
        res.redirect('/navodayamentor');
      }
    });
  });
  
// login varification end navodaya



  // attendance Navodaya
  const Student = require('./views/student.js');
 const Attendance = require('./views/attendance.js');
 const router = express.Router();

app.get('/attendancenavodaya', async (req, res) => {
    try {
      const students = await Student.find({ class: 'navodaya' });
      res.render('attendancenavodaya', { students });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  });
  

  app.post('/attendance', async (req, res) => {
    const present = req.body.present;
    const names = req.body.name;
    if (!Array.isArray(present)) {
      return res.status(400).send('Invalid data format');
    }
    const date = new Date();
    date.setHours(0, 0, 0, 0); 
    for (let i = 0; i < present.length; i++) {
      const existingAttendance = await Attendance.findOne({ studentId: present[i], date: date });
      if (existingAttendance) {
        console.log(`Attendance record already exists for student with ID ${present[i]} on ${date.toDateString()}`);
      } else {
        const attendance = new Attendance({
          studentId: present[i],
          present: true,
          class: 'navodaya',
          name : names[i],
          date: date
        });
        await attendance.save();
        console.log(`Attendance recorded for student with ID ${present[i]} on ${date.toDateString()}`);
      }
    }
    res.redirect('navodayamentor');
  });
  
  
// attendance navodaya end





// for  fetching attendance of navodaya

app.get('/attendance-sheetnavodaya', async (req, res) => {
    const month = '2023-04';
    if (!month) {
      return res.status(400).send('Month parameter is missing');
    }
  
    const startDate = new Date(month);
    startDate.setDate(1);
    const endDate = new Date(month);
    endDate.setMonth(endDate.getMonth() + 1, 0);
  
    try {
      const attendanceData = await Attendance.find({
        date: {
          $gte: startDate,
          $lte: endDate,
        },
      }).populate('studentId','name');
  
      const attendanceSheet = [];
  
      for (const attendance of attendanceData) {
        const { studentId, present,name } = attendance;
        
        console.log(name);
        const date = attendance.date.toLocaleDateString('en-US');
  
        attendanceSheet.push({ name, date, present });
      }
      console.log(attendanceSheet); 
      res.render('attendance-sheetnavo', { attendanceSheet });
    } catch (error) {
      console.error(error);
      res.status(500).send('Something went wrong');
    }
  });

  
  //attendance navodaya end

























app.listen(4050, function(){
    console.log("Server is started on port : 4050");
})