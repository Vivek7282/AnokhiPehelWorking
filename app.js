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
  
    // Code to fetch data and render EJS template goes here
  });
  
const db = client.db('Anokhi_Pehel_Working');
const collection = db.collection('classCordinator');
collection.find({}).toArray((err, data) => {
    if (err) {
      console.error(err);
      return;
    }
  
    // Code to render EJS template with data goes here
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
 
        // res.render('student', { data });
      });
    });

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
     
            // res.render('student', { data });
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
 
        // res.render('student', { data });
      });
    });


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
app.get("/attendencenavodaya", function(req, res){
    res.render("attendencenavodaya");
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
        // Login Successful, redirect to Dashboard
        if(MentorLogin1.findOne({class : "navodaya"}))
        res.redirect('/navodayamentor');
      }
    });
  });
  









  


app.listen(4050, function(){
    console.log("Server is started on port : 4050");
})