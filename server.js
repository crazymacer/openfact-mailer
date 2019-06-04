
  var express = require('express');
  var path = require('path');
  var bodyParser = require('body-parser');
  var mailRoutes = require('./api/routes/mailRoutes');

  var app = express();
      
  app.set('view engine', 'ejs');
  app.use(express.static('public'));

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  mailRoutes(app);

  var port = 3000;

  app.get('/', function (req, res) {
    res.json({info:"OpenFact Mailer"});
    //res.render('index');
  });

  app.listen(port, function(err){
    
    if (err) {
        console.log(err);
    }

    console.info('>>> Open http://localhost:%s/ in your browser.', port);

  });