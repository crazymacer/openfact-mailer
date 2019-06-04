// Required modules
const cool        = require('cool-ascii-faces');
const express     = require('express');
const path        = require('path');
const bodyParser  = require('body-parser');
const mailRoutes  = require('./api/routes/mailRoutes');

// Variables
const port  = process.env.PORT || 5000;

var app = express();
      
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Routes
mailRoutes(app);

app.get('/', function (req, res) {
  res.json({info:"OpenFact Mailer"});
  //res.render('index');
});

app.get('/cool', (req, res) => res.send(cool()))

// Listening
app.listen(port, function(err){
  if (err) {
      console.log(err);
  }
  console.info('>>> Open http://localhost:%s/ in your browser.', port);
});