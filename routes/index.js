var express = require('express');
var mysql = require('mysql');
var session = require('express-session');
var bodyParser = require('body-parser');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'LKSCoding' });
});

/*router.post('/run', function(req, res) {
	if(req.method == "POST"){
        var code = req.body.code;
        console.log(code);
        var config={};
        config.time_limit=1;  //your time limit in integer
        config.memory_limit=323244;  //your memory limit in integer
        config.source=code;  //your source code for which you want to use hackerEarth api
        config.input="3";  //input against which you have to test your source code
        config.language="Py"; //optional choose any one of them or none
        hackerEarth.run(config,function(err,response){
            if(err) {
                console.log(err);
            }else{
                console.log(response);
            }
        });
    }else{
        console.log("Failed");
    }
});

router.post('/auth', function(req, res) {
	if(req.method == "POST"){
        var post  = req.body;
        var username = req.body.username;
		var password = req.body.password;
        db.query('SELECT * FROM mas_std_63 WHERE id = ? AND pin = ?', [username, password], function(err, results){      
            if(results.length){
                req.session.userId = results[0].id;
                req.session.user = results[0];
				//console.log(results[0].id);
            }else{
                message = 'Wrong Credentials.';
                res.render('index.ejs',{message: message});
            }         
        });
    }else{
        res.render('index.ejs',{message: message});
    }
});*/

module.exports = router;