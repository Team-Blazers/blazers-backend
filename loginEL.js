var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
const { response } = require('express');

//Connection to SQL Database
var connection = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    password : '',
    database : 'easylearnaccounts'     //Assuming that is the database name
});

var app = express();

//Create session
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}))

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//Handling GET request
app.get('/', function(request,response){
    response.sendfile(path.join(__dirname + '/login.html'));
});

//Handling POST request
//Route and file names used are arbitrary
app.post('/auth', function(request, response){
    var username = request.body.username;
    var password = request.body.password;
    if (username && password){
        connection.query('SELECT * FROM easylearnlogin WHERE username = ? AND password = ?', [username, passowrd], function(error,results,fields){
            if (results.length > 0){
                request.session.loggedin =true;
                request.session.username = username;
                request.redirect('/home');
            }else{
                response.send('Incorrect username or password');
            }
            response.end();
        });
    }else{
        response.send('Please enter username and password!');
        response.end();
    }
});





