
const config = require('config');
var createError = require('http-errors');
var express = require('express');
const dbConfig = config.get('Customer.dbConfig');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var PeliculaRouter = require('./routes/Pelicula');
var cors = require('cors');
mongoose.Promise = global.Promise;

var app = express();
app.use(bodyParser.urlencoded({ extended: true }))
console.log(config.get('Customer'))
// parse requests of content-type - application/json
app.use(bodyParser.json())
// view engine setup
mongoose.connect('mongodb://'+dbConfig.host+':'+dbConfig.port+'/'+dbConfig.dbName, {
  useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");    
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
});

app.use(cors());
app.use('/api/v1/pelicula', PeliculaRouter);
app.set('port', process.env.PORT || 3001);
app.listen(app.get('port'));

app.use(function(req, res, next) {
  next(createError(404));
});


module.exports = app;
