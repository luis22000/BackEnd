var createError = require('http-errors');
var express = require('express');

var PeliculaRouter = require('./routes/Pelicula');


var app = express();

// view engine setup

app.use('/api/v1/pelicula', PeliculaRouter);
app.set('port', process.env.PORT || 3001);
app.listen(app.get('port'));

app.use(function(req, res, next) {
  next(createError(404));
});


module.exports = app;
