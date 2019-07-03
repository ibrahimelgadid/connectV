require('dotenv').config();

var express = require('express');
var cors = require('cors');
var app = express();
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var validator = require('validator');



var Users = require('./routes/api/users');
var Posts = require('./routes/api/posts');
var Profile = require('./routes/api/profile');


// mongoose connection
mongoose.connect(process.env.DATABASE);
mongoose.connection.once('open', (err)=>{
  if(err)throw err;
  console.log('mongo with us');
});
mongoose.connection.on('err',  (err,res)=>{
  if(err)throw err;})



app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());



app.use('/api/users',Users);
app.use('/api/profile', Profile);
app.use('/api/posts', Posts);

const port = process.env.PORT ;

app.listen(port, ()=> console.log(`we run on ${port}`))