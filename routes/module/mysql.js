var mysql = require('mysql');
var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'coding',
    charset : 'utf8'
});

db.connect(function(err){
    if(!err){
        console.log("Database is connected ... nn");
    }else{
        console.log("Error connecting database ... nn");
    }
});

exports.db = db;