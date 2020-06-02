var express = require('express');
var hackerEarth = require('hackerearth-node'); //require the Library
var body = require('body-parser');
var mysql = require('./module/mysql.js');
const htmlToText = require('html-to-text');
var request = require('request');
var app = express();
var router = express.Router();
var db = mysql.db;
var questionID = "";

app.post(function(req, res, next){
    next();
});
app.use(body.json());

/* GET home page. */
router.get('/', function(req, res, next) {
    var sql = "SELECT * from problem";
    db.query(sql, function(err, result){
        if(err) throw err;
        res.render('user/index', {
            title: 'LKSCoding',
            questions: result
        });
    });
});

router.get('/coding/:id', function(req, res, next) {
    questionID = req.params.id;
    var sql = "SELECT * from problem WHERE id = " + questionID;
    db.query(sql, function(err, result){
        if(err) throw err;
        res.render('user/coding', { 
            title: 'LKSCoding',
            questionDetails: result
        });
    });
});
//use your custom API KEY
var hackerEarth=new hackerEarth(
    '',  //Your Client Secret Key here this is mandatory 
    ''  //mode sync=1 or async(optional)=0 or null async is by default and preferred for nodeJS
);

router.post('/run', function(req, res) {
	if(req.method == "POST"){
        var questionLanguage = "";
        var answerQuestion = "";
        var questionInput = "";
        var sql = "SELECT * from problem WHERE id = " + questionID;
        db.query(sql, function(err, result){
            if(err) throw err;
            result.forEach(function(quesDetails) {
                questionLanguage = quesDetails.language;
                answerQuestion = quesDetails.output;
                questionInput = quesDetails.input;
            });           
            var code = req.body.code;
            var config={};
            config.time_limit=1;  //your time limit in integer
            config.memory_limit=323244;  //your memory limit in integer
            config.source=code;  //your source code for which you want to use hackerEarth api
            config.input=questionInput;  //input against which you have to test your source code
            config.language=questionLanguage; //optional choose any one of them or none
            hackerEarth.run(config,function(err,response){
                if(err) {
                    var objError = JSON.parse(err);
                    var statusCode = objError.statusCode;
                    res.end(statusCode);
                    //console.log("Error => ");
                    //console.log(objError);
                }else{
                    var objResponse = JSON.parse(response);
                    var statusResponse = objResponse.run_status.status;
                    console.log(objResponse);
                    if(statusResponse == 'AC'){
                        const text = htmlToText.fromString(objResponse.run_status.output_html, {
                            wordwrap: 130
                        });
                        if(answerQuestion == text){
                            var responseHtml = {notifyType: 'success', headerText: 'Success!', outputText: "Successful"};
                            res.end(JSON.stringify(responseHtml));
                            //console.log(responseHtml);
                        }else{
                            var responseHtmlError = {notifyType: 'warning', headerText: 'Incorrect!', outputText: "Please try again."};
                            res.end(JSON.stringify(responseHtmlError));
                        }
                    }else{
                        var responseError = {statusCode: statusResponse, outputText: objResponse.compile_status, outputTextDetails: objResponse.run_status.status_detail};
                        //console.log(responseError);
                        res.end(JSON.stringify(responseError));
                    }      
                }
            });
        });
    }else{
        console.log("Failed");
    }
});

module.exports = router;
