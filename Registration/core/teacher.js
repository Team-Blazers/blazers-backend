const pool = require('./pool');
const bcrypt = require('bcryptjs');

function Teacher(){};

Teacher.prototype = {
    //find student data by id or username
    find : function(teacher = null, callback)
    {
        if(teacher) {
            var field = Number.isInteger(student) ? 'id' : 'username';
        }

        let sql = `SELECT * FROM teachers WHERE ${field} = ?`;

        pool.query(sql, teacher, function(err, result) {
            if(err) throw err;

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

        let sql  = `INSERT INTO teachers (username, firstname, lastname, email, address, phonenumber, institution, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

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

module.exports = Teacher;
