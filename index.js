const express = require('express');
const app = express();
let mongoose = require('mongoose');
var Student = require('./student.js');
var Teacher = require('./teacher.js');
let bodyParser = require('body-parser');

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


app.post('/createstudent', (req, res) => {
    var student = new Student({
        email: req.body.email,
        name: req.body.name,
        surname: req.body.name
    });
    student.save(function(err, student){
        if(err) return err;
        res.send(student); 
    });
    
});

app.post('/createteacher', (req, res) => {
    var teacher = new Teacher({
        email: req.body.email,
        name: req.body.name,
        surname: req.body.name
    });
    teacher.save(function(err, student){
        if(err) return err;
        res.send(teacher); 
    });
    
});
//port environment variable if it is set or 3000
const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Listening on port ${port}...`))