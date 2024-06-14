/*
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
*/

const express = require('express');
const app = express();
const port = 3000
const { Client } = require('pg');

// Create a new PostgreSQL client instance
const client = new Client({
  user: 'backend_test_4ihd_user',
  host: 'dpg-cpm0plqj1k6c739u24i0-a.frankfurt-postgres.render.com',
  database: 'test1',
  password: 'ocJ5dKDmjHGVplC6Ltm2hRv5twv7DCda',
  port: 5432,
  ssl: true
});

// Connect to PostgreSQL
client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Connection error', err.stack));


let result
client.query("SELECT * FROM testTable", (err, res) => {
  if (!err){
    console.log('PostgreSQL connected:', res.rows);
    result = res.rows;
  }else{
    console.log("error")
  }
  client.end();
});

app.listen(port,()=>{
  console.log(`App running on port ${port}`);
})
app.get('/users',(req,res) => {
  res.json({results:result}).status(200)
})
