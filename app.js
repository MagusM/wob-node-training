const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const uuid = require('uuid/v4');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const index = require('./routes/index');
const users = require('./routes/users');
const login = require('./routes/login');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  genid: (req) => {
    return uuid();
  },
  store: new FileStore(),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

const user = {id: 111, username:"hh77",email:"sss@gmail.comm",password:"afadfadfadfadf"};
passport.serializeUser((user, done) => {
  console.log('serializeUser');
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  console.log('deserializeUser');
  done(null, user);
});
passport.use(
  new LocalStrategy(
    {usernameField: 'email'},
    (email, password, done) => {
      console.log(`LocalStrategy ${email} ${password}`);
       //... find the user by email in DB for example
      // if(!user || user.password !== password) {
      //   return done(null, false);
      // }
      
      return done(null, user);
    }
  )
);

// routing
app.use('/', index);
app.use('/users', users);
app.use('/login', login);

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

module.exports = app;
