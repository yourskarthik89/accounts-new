var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , category = require('./routes/category')
  , http = require('http')
  , path = require('path');
var session = require('express-session');
var app = express();
var mysql      = require('mysql');
var bodyParser=require("body-parser");
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'carthee#123',
  database : 'my_accounts'
});
 
connection.connect();
 
global.db = connection;
 
app.set('port', process.env.PORT || 8081);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(express.static(path.join(__dirname, '/public')));
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/home/', express.static(path.join(__dirname, '/public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));
app.get('/', routes.index);
app.get('/signup', user.signup);
app.post('/signup', user.signup);
app.get('/login', routes.index);
app.post('/login', user.login);
app.get('/logout', user.logout);
app.get('/home/dashboard', user.dashboard);
app.get('/home/profile',user.profile);

app.get('/home/category',category.categoryView);
app.get('/home/addcategory',category.categoryInsert);
app.get('/home/profile',category.profile);
//app.get('/editcategory',category.categoryEdit);

app.listen(8081)