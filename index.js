const express = require('express');
const app = express();
let mongoose = require('mongoose');
var Student = require('./student.js');
var Teacher = require('./teacher.js');
let bodyParser = require('body-parser');

var cors = require('cors')
app.use(cors()) 

mongoose.connect('mongodb+srv://blazerseasylearn:blazerseasylearn@easylearn.hv9w0.mongodb.net/test?retryWrites=true&w=majority', 
{ 
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/test', (req, res) => {
    res.send('test');
});


app.post('/createstudent', (req, res) => {
    

    Student.findOne({
        email: req.body.email
    }).exec((err, student) => {

        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (student) {
            res.send(401);
            return;
          }

        if (!student) {
            var student = new Student({
                email: req.body.email,
                name: req.body.name,
                surname: req.body.name
            });

            student.save(function(err, student){
                if(err) return err;
                res.send(200); 
            });

        }
    });
    
});

app.post('/createteacher', (req, res) => {
    
    Teacher.findOne({
        email: req.body.email
    }).exec((err, teacher) => {

        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (teacher) {
            res.send(401);
            return;
          }

        if (!teacher) {
            var teacher = new Teacher({
                email: req.body.email,
                name: req.body.name,
                surname: req.body.name
            });
            teacher.save(function(err){
                if(err) return err;
                res.send(200); 
            });
        }

    });
    
    
});

app.post('/loginstudent', (req, res) => {
    Student.findOne({
        email: req.body.email
    }).exec((err, student) => {

        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (student) {
            res.send(200);
            return;
          }

        if (!student) {
            res.send(401);
            return;
        }
    });
});

app.post('/loginteacher', (req, res) => {
    Teacher.findOne({
        email: req.body.email
    }).exec((err, teacher) => {

        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (teacher) {
            res.send(200);
            return;
          }

        if (!teacher) {
            res.send(401);
            return;
        }
    });
});
//port environment variable if it is set or 3000
const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Listening on port ${port}...`))