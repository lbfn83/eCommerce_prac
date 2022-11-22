// https://levelup.gitconnected.com/how-to-implement-csrf-tokens-in-express-f867c9e95af0

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const logger = require('morgan');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

app.set('view engine', 'pug');
console.log(__dirname)
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());

// set up the cookie for the session
app.use(cookieSession({
    name : 'session',
    secret : 'MAKE_THIS_SECRET_SECURE',
    maxAge : 24*60*60*1000,
    sameSite : 'lax', //The value lax means that the session cookie will only be sent with safe HTTP requests (GET, HEAD, OPTIONS) to a site with the same origin or top-level domain requests.
    path : '/', // explicitly set this for security purposes
    secure : process.env === 'production',
    httpOnly : true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);

// https://simonplend.com/how-to-send-consistent-error-responses-from-your-express-api/
// catch 404 and forward to error handler
app.use(function(req, res, next){
  const error = createError(404,"Invalid filter");
  console.log(error)  
  console.log()  
  next(error);
});

//express defualt error handler
// https://expressjs.com/en/guide/error-handling.html#the-default-error-handler
app.use(function(err,req,res,next) {
    // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3040);
module.exports = app;