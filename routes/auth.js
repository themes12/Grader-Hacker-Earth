//-----------------------------------------------login page call------------------------------------------------------
exports.login = function(req, res){
    var message = '';
    var sess = req.session; 
 
    if(req.method == "POST"){
        var post  = req.body;
        var username = req.body.username;
	    var password = req.body.password;

        db.query('SELECT * FROM mas_std_63 WHERE id = ? AND pin = ?', [username, password], function(err, results){      
            if(results.length){
                req.session.userId = results[0].id;
                req.session.user = results[0];
                console.log(results[0].id);
                res.redirect('/home/dashboard');
            }else{
                message = 'Wrong Credentials.';
                res.render('index.ejs',{message: message});
            }         
        });
    }else{
        res.render('index.ejs',{message: message});
    }     
 };
 //-----------------------------------------------dashboard page functionality----------------------------------------------
            
 exports.dashboard = function(req, res, next){
            
    var user =  req.session.user,
    userId = req.session.userId;
    console.log('ddd='+userId);
    if(userId == null){
       res.redirect("/login");
       return;
    }
 
    var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";
 
    db.query(sql, function(err, results){
       res.render('dashboard.ejs', {user:user});    
    });       
 };
 //------------------------------------logout functionality----------------------------------------------
 exports.logout=function(req,res){
    req.session.destroy(function(err) {
       res.redirect("/login");
    })
 };
 //--------------------------------render user details after login--------------------------------
 exports.profile = function(req, res){
 
    var userId = req.session.userId;
    if(userId == null){
       res.redirect("/login");
       return;
    }
 
    var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";          
    db.query(sql, function(err, result){  
       res.render('profile.ejs',{data:result});
    });
 };
 //---------------------------------edit users details after login----------------------------------
 exports.editprofile=function(req,res){
    var userId = req.session.userId;
    if(userId == null){
       res.redirect("/login");
       return;
    }
 
    var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";
    db.query(sql, function(err, results){
       res.render('edit_profile.ejs',{data:results});
    });
 };