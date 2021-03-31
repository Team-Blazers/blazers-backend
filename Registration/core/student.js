const pool = require('./pool');
const bcrypt = require('bcryptjs');

function Student(){};

Student.prototype = {
    //find student data by id or username
    find : function(student = null, callback)
    {
        if(student) {
            var field = Number.isInteger(student) ? 'id' : 'username';
        }

        let sql = `SELECT * FROM students WHERE ${field} = ?`;

        pool.query(sql, student, function(err, result) {
            if(err) throw err

            if(result.length){
                callback(result[0]);
            }else{
                callback(null);
            }
        });
    },

    create : function(body, callback){
        let pwd = body.password;

        body.password = bcrypt.hashSync(pwd,10);
        
        var bind = [];

        for(prop in body) {
            bind.push(body[prop]);
        }

        let sql  = `INSERT INTO students (username, firstname, lastname, email, address, phonenumber, password) VALUES (?, ?, ?, ?, ?, ?, ?)`;

        pool.query(sql, bind, function(err, result) {
            if(err) throw err;
            callback(result.insertId);
        });
    }/*,

    login : function(username, password, callback) {
        this.find(username, function(result) {
            if(student) {
                if(bcrypt.compareSync(password, result.password))
                {
                    callback(result);
                    return
                }
                callback(null);
            }
        }); 
    }*/
}

module.exports = Student;
