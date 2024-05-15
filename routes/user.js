exports.signup = function(req, res){
   message = '';
   if(req.method == "POST"){
      var post  = req.body;
      var username = post.username;
      var password = post.password;
      var fname= post.user_fname;
      var lname= post.user_lname;
      var user_mobile= post.user_mobile;
	  if(username !='' && password!='') {
		  var sql = "INSERT INTO `acc_user`(`user_fname`,`user_lname`,`user_mobile`,`username`, `password`) VALUES ('" + fname + "','" + lname + "','" + user_mobile + "','" + username + "','" + password + "')";

		  var query = db.query(sql, function(err, result) {
			 message = "Your account has been created succesfully.";
			 res.render('signup.ejs',{message: message});
		  });
	  } else {
		  message = "Username and password is mandatory field.";
		  res.render('signup.ejs',{message: message});
	  }

   } else {
      res.render('signup');
   }
};
 
exports.login = function(req, res){
   var message = '';
   var sess = req.session; 

   if(req.method == "POST"){
      var post  = req.body;
      var username = post.username;
      var password= post.password;
     
      var sql="SELECT user_id, user_fname, user_lname, username FROM `acc_user` WHERE `username`='"+username+"' and password = '"+password+"'";                           
      db.query(sql, function(err, results){       
         if(results.length){
            req.session.userId = results[0].user_id;
            req.session.user = results[0];
            console.log('Login Success '+results[0].user_id);
            res.redirect('/home/dashboard');
         }
         else{
            console.log('Login Failed: '+username+'--'+password);
            message = 'You have entered invalid username or password.';
            res.render('index.ejs',{message: message});
         }
      });
   } else {
      res.render('index.ejs',{message: message});
   }
           
};

           
exports.dashboard = function(req, res){
   var userId = req.session.userId;
   console.log('Dashboard: '+userId);
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `acc_user` WHERE `user_id`='"+userId+"'";

   db.query(sql, function(err, results){
      res.render('dashboard.ejs', {data:results});    
   });       
};

exports.profile = function(req, res){

   var userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `acc_user` WHERE `user_id`='"+userId+"'";          
   db.query(sql, function(err, result){  
      res.render('profile.ejs',{data:result});
   });
};

exports.logout=function(req,res){
   req.session.destroy(function(err) {
      res.redirect("/login");
   })
};