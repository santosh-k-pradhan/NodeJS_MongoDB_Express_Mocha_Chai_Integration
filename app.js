// *** main dependencies *** //
var express = require('express'),
  port = process.env.PORT || 9200,
  mongoose = require('mongoose'),
  Task = require('./api/models/todoListModel'), //created model loading here
  bodyParser = require('body-parser');

// *** express instance *** //
const app = express();

// *** config file *** //
var config = require('./config/_config');
  
// *** mongoose *** ///
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoURI.development, (err) => {
  if(err){
    console.log('Error connecting to the database. ' + err);
    throw err;
  }
  console.log(`Succssfully Connected to Database ${config.mongoURI.development}`);
}); 


// *** config middleware *** //
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Define request response in root URL (/)
app.get('/', function (req, res) {
  res.send('API routing SUCCESS')
})

// *** routes *** //
var routes = require('./api/routes/routes'); //importing route
routes(app); //register the route

// *** server config *** //
app.listen(port, () => console.log(`RESTful API server started on ${port} `));

module.exports = app;