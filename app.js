var createError   = require('http-errors');
var express       = require('express');
var path          = require('path');
var cookieParser  = require('cookie-parser');
var logger        = require('morgan');
var jwt           = require('express-jwt');


var indexRouter  = require('./routes/index');
var usersRouter  = require('./routes/users');
var socketRouter = require('./routes/socket');
var apiRouter    = require('./routes/api');
var key          = require('./config/key.json');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(jwt({secret: key.secret}).unless({path:['/','/api/','/api/login/']}));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/socket', socketRouter);
app.use('/api', apiRouter)
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
