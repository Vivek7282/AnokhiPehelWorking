const express = require('express');
const router = express.Router();
const mentor = require('../controllers/mentor');

router.post('/mentorLogin', mentor.mentorLogin);

module.exports = router;
