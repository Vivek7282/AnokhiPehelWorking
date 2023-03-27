const express = require("express");
const bodyParser= require("body-parser")
const mongoose = require('mongoose');
const config = require('./config');
const app= express();
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
app.get("/cordinator", function(req, res){
    res.render("cordinator");
})

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



app.listen(4050, function(){
    console.log("Server is started on port : 4050");
})