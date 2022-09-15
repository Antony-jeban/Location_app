var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var YAML =  require('yamljs');
var swaggerUi = require('swagger-ui-express');

var path = require('node:path');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var weatherRoutes = require('./routes/weather');
var restaurantsRoutes = require('./routes/restaurants');

const swaggerDocument = YAML.load(path.resolve(__dirname, './swagger.yaml'));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/weather', weatherRoutes);
app.use('/restaurants', restaurantsRoutes);

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
