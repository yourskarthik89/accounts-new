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

exports.categoryInsert = function(req, res){
    message = '';
    if(req.method == "POST"){
       var post  = req.body;
       var cattitle = post.cat_title;
       var cattype = post.cat_type;
       var catstatus = 'Active';
       var catdeleted = 0;
       var createdat = moment().format('YYYY-MM-DD HH:mm:ss');
       if(cattitle !='' && cattype!='') {
           var sql = "INSERT INTO `acc_category`(`cat_title`,`cat_type`,`cat_status`,`cat_deleted`, `created_at`, `modified_at`) VALUES ('" + cattitle + "','" + cattype + "','" + catstatus + "','" + catdeleted + "','" + createdat + "','" + createdat + "')";
 
           var query = db.query(sql, function(err, result) {
              message = "Your Category has been created succesfully.";
              res.render('category.ejs',{message: message});
           });
       } else {
           message = "Title and Type is mandatory field.";
           res.render('category.ejs',{message: message});
       }
    } else {
       res.render('category');
    }
 };
  
 exports.categoryView = function(req, res){         
   var userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `acc_category` WHERE `cat_deleted`=0";

   db.query(sql, function(err, results){
      res.render('category.ejs', {data:results});    
   });       
};