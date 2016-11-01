var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('passport-jwt');

var config = require('./config/secret');
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

//Conectando ao MongoDb
moongoose.connect(config.database);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
/**
 * Onde Declaramos o que vamos usar de Body parses, Cookie parser, morgan
 */
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/**
 * Com o Morgan conseguimos visualizar o Log no Console
 * GET / 200 30.029 ms - 213
 */
app.use(logger('dev'));
/**
 * criamos as rotas para as devidas URL`s temos só duas
 */
app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

app.listen(3000, function(err) {
    if (err) throw err;
    console.log("Server is Running on port " + 3000);
});

module.exports = app;
