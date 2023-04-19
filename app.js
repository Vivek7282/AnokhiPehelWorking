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
  







// to get all students of any class

const collection1 = db.collection('student');
collection1.find({}).toArray((err, data) => {
    if (err) {
      console.error(err);
      return;
    }
});

app.get('/students', (req, res) => {
    const className = req.query.class;
    if (!className) {
      // handle the case where the class name is not provided
      res.status(400).send('Class name not provided');
      return;
    }
    collection1.find({ class: className }).toArray((err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.render('student', { data, className: className });
    });
  });


  //attedance list
  app.get('/attendance', async (req, res) => {
    
      const className = req.query.class; // extract the class name from the query string parameter
      collection1.find({ class: className }).toArray((err, data) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
        }
        res.render('attendance', { data, className: className });
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
app.get("/mentorLogintoclass/navodayamentor", function(req, res){
    res.render("mentorLogintoclass/navodayamentor");
})
app.get("/mentorLogintoclass/pre1mentor", function(req, res){
    res.render("mentorLogintoclass/pre1mentor");
})

const MentorLogin1 = require('./models/mentorlogin');
const mentor = require('./routes/mentor');
app.use('/', mentor);
  







// admin login

app.get("/admindashboard", function(req, res){
    res.render("admindashboard");
})
const AdminSchema = new mongoose.Schema({
    name : String,
    email: String,
    password: String,
  });
  
  const admin = mongoose.model('Admin', AdminSchema);

  app.post('/adminlogin', (req, res) => {
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
       
        res.redirect('/admindashboard');
      }
    });
  });

// admin login end




//attendance chilla



// attendance Navodaya
const Student = require('./models/student.js');
const AttendanceLocation = require('./views/attendancelocation.js');
const router = express.Router();
// const students =  Student.find({ place: 'Chilla' });
// console.log(students);

app.get('/attendancechilla', async (req, res) => {
   try {
     const students = await Student.find({ place: 'Chilla' });
     res.render('attendancechilla', { students });
   } catch (err) {
     console.error(err);
     res.status(500).send('Internal server error');
   }
 });
 

 app.post('/attendancechilla1', async (req, res) => {
   const present = req.body.present;
   const names = req.body.name;
   const classes = req.body.class;
   if (!Array.isArray(present)) {
     return res.status(400).send('Invalid data format');
   }
   const date = new Date();
   date.setHours(0, 0, 0, 0); 
   for (let i = 0; i < present.length; i++) {
     const existingAttendanceLocation = await AttendanceLocation.findOne({ studentId: present[i], date: date });
     if (existingAttendanceLocation) {
       console.log(`Attendance record already exists for student with ID1 ${present[i]} on ${date.toDateString()}`);
     } else {
       const attendancelocation = new AttendanceLocation({
         studentId: present[i],
         present: true,
         place: 'Chilla',
         name : names[i],
         class : classes[i],
         date: date
       });
       await attendancelocation.save();
       console.log(`Attendance recorded for student with ID ${present[i]} on ${date.toDateString()}`);
     }
   }
   res.redirect('chilladashboard');
 });
 // attendance chilla end



 // Attendance for all the class
 const Attendance = require('./models/attendance.js');
const attendanceRoutes = require('./routes/attendance');
app.use('/', attendanceRoutes);

  
  app.post('/attendance1/:class', async (req, res) => {
    const className = req.params.class;
    const present = req.body.present;
    const names = req.body.name;
    console.log(names);
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
          class: className,
          name : names[i],
          date: date
        });
        await attendance.save();
        console.log(`Attendance recorded for student with ID ${present[i]} on ${date.toDateString()}`);
      }
    }
    res.redirect(`/mentorLogintoclass/${className}mentor`);
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
        
        // console.log(name);
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








  // chilla location cordinator login




app.get("/chilladashboard", function(req, res){
    res.render("chilladashboard");
})


const LocationcordiSchema = new mongoose.Schema({
    name : String,
    email: String,
    password: String,
    location:String
  });
  
  const Locationcordi = mongoose.model('Locationcordi', LocationcordiSchema);

  app.post('/locationcordi', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
   console.log(email + password);
    Locationcordi.findOne({ email: email, password: password }, (err, mentor) => {
      if (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      } else if (!mentor) {
        res.status(401).send('Invalid Email or Password');
      } else {
        if(Locationcordi.findOne({location : "Chilla"}))
        res.redirect('/chilladashboard');
      }
    });
  });
  
// login varification chilla end 





// add location coordinate addlocationcordi addlocationcordi1

app.get("/addlocationcordi", function(req, res){
    res.render("addlocationcordi");
})

app.post('/addlocationcordi1', async (req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    const location = req.body.location;
    
  
    const locationcordi = new Locationcordi({
      name: name,
      email: email,
      password: password,
      location: location
    });
  
    await locationcordi.save();
    console.log(`Coordinator Added Successfully`);
  
    res.redirect('admindashboard');
  });
 
  


  // add class coordinator 

app.get("/addclasscordi", function(req, res){
    res.render("addclasscordi");
})
const ClasscordiSchema = new mongoose.Schema({
    name : String,
    email: String,
    password: String,
    class:String
  });
  
  const Classcordi = mongoose.model('Classcordi', ClasscordiSchema);

app.post('/addclasscordi1', async (req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    const class1 = req.body.class;
    
  
    const classcordi = new Classcordi({
      name: name,
      email: email,
      password: password,
      class: class1
    });
  
    await classcordi.save();
    console.log(`Coordinator Added Successfully`);
  
    res.redirect('admindashboard');
  });
//   addmentor1


//add mentor for login
app.get("/addmentorlogin1", function(req, res){
    res.render("addmentorlogin1");
})

app.post('/addmentorlogin1', async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const class1 = req.body.class;
    const password = req.body.password;
    
  
    const mentorloginsch = new MentorLogin1({
      name: name,
      email:email,
      password: password,
      class: class1
    });
  
    await mentorloginsch.save();
    console.log(`Mentor login Added Successfully`);
  
    res.redirect('admindashboard');
  });














//mentor schedule


app.get("/addmentor", function(req, res){
    res.render("addmentor");
})
const MentorschSchema = new mongoose.Schema({
    name : String,
    day : String,
    class:String,
    subject : String
  });
  
  const Mentorsch = mongoose.model('Mentorsch', MentorschSchema);

app.post('/addmentor1', async (req, res) => {
    const name = req.body.name;
    const day = req.body.day;
    const class1 = req.body.class;
    const subject = req.body.subject;
    
  
    const mentorsch = new Mentorsch({
      name: name,
      day: day,
      subject: subject,
      class: class1
    });
  
    await mentorsch.save();
    console.log(`Mentor Added Successfully`);
  
    res.redirect('admindashboard');
  });



//to fetch schedule schedule
app.get("/schedule", function(req, res){
    res.render("schedule");
})

// for  fetching class wise schedule

app.get('/dayschedule', async (req, res) => {
    
    const Schedule = mongoose.model('Schedule', MentorschSchema, 'mentorsches');
  
   const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const now = new Date();
  const dayOfWeek = daysOfWeek[now.getDay()]; 
  const schedules = await Schedule.find({day: dayOfWeek });
  console.log(schedules);
  res.render('dayschedule1', { schedules });
  });

  
  //class wise schedule fetching end




//to fetch schedule schedule classwise



// app.post('/showResult', async (req, res) => {
//     const student = [];
//   const mark = [];
//     const clas = req.body.class;
//     const dat = req.body.date;
  
//     try {
//       const result = await Result.find({ class: clas, date: dat });
  
//       result.forEach(function (value) {
//         student.push(value.name);
//         mark.push(value.marks);
//       });

// for  fetching class wise schedule 

app.get('/classschedule', async (req, res) => {
    
    const Schedule = mongoose.model('Schedule', MentorschSchema, 'mentorsches');
  
    const class1 = 'Navodaya';
  const schedules = await Schedule.find({class : class1 });
  console.log(schedules);
  res.render('dayschedule2', { schedules });
  });

  
  //class wise schedule fetching end

  // whole schedule 

  app.get('/classschedulewhole', async (req, res) => {
    
    const Schedule = mongoose.model('Schedule', MentorschSchema, 'mentorsches');
  
    // const class1 = 'Navodaya';
  const schedules = await Schedule.find();
  console.log(schedules);
  res.render('dayschedule2', { schedules });
  });















app.listen(4050, function(){
    console.log("Server is started on port : 4050");
})