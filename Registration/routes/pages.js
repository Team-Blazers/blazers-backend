const express = require('express');
const Student = require('../core/student');
const Teacher = require('../core/teacher');
const router = express.Router();

const student = new Student();
const teacher = new Teacher();

//get index page
router.get('/', (req, res, nex) => {
    res.render('index', {title:'Student Registration'});

});

//Get homepage
router.get('/home', (req, res, next) => {
    res.send('This is the home page');
});

//Post student data
router.post('/student', (req, res, next) => {
    let studentInput = {
        username : req.body.username,
        firstname : req.body.firstname, 
        lastname : req.body.lastname,
        email: req.body.email,
        address : req.body.address,
        phonenumber: req.body.phonenumber,
        password : req.body.password
    };

    student.create(studentInput, function(lastId){
        if(lastId){
            res.send('Registration Successful.');
        }else {
            console.log('Error registering user.')
        }
    });
});

//Post teacher data
router.post('/teacher', (req, res, next) => {
    let teacherInput = {
        username : req.body.username,
        firstname : req.body.firstname, 
        lastname : req.body.lastname,
        email: req.body.email,
        address : req.body.address,
        phonenumber: req.body.phonenumber,
        institution : req.body.institution,
        password : req.body.password
    };
    
    teacher.create(teacherInput, function(lastId){
        if(lastId){
            res.send('Registration Successful.');
        }else {
            console.log('Error registering user.')
        }
    });
});

module.exports = router;