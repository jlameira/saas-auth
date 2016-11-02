const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const mongoose = require('mongoose');
const router = express.Router();

//Models
const User = require('./models/user');
//Rotas
const config = require('./config/secret');
const index = require('./routes/index');
const users = require('./routes/users');

let app = express();

//Conectando ao MongoDb
mongoose.connect(config.database);

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

//Inicializa passport para o Usuario
app.use(passport.initialize());

require('./config/passport')(passport);

/**
 * Com o Morgan conseguimos visualizar o Log no Console
 * GET / 200 30.029 ms - 213
 */
app.use(logger('dev'));
/**
 * criamos as rotas para as devidas URL`s temos só duas
 */
app.use('/', index);
app.use('/user',users);

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
