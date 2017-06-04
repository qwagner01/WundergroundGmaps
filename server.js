var XMLHttpRequest = require("XMLHttpRequest").XMLHttpRequest;
var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendfile('index.html');
  res.sendfile('index.css');
  res.sendfile('myScript.js');
  res.sendfile('favicon.ico');

});

//Now I am playing third party server role
app.post('/weather', function(req, res) {
  // console.log("http://api.wunderground.com/api/1a536450bc144857/conditions/q/" + req.body.lat + ',' + req.body.lng + ".json");
  var sRequest = new XMLHttpRequest();
  sRequest.addEventListener('load', sendDataBackToClient);
  sRequest.open("GET", "http://api.wunderground.com/api/1a536450bc144857/conditions/q/" + req.body.lat + ',' + req.body.lng + ".json");
  sRequest.send();


  function sendDataBackToClient() {
    var dataFromOutsideWorld = this.responseText;
    console.log(dataFromOutsideWorld);
    res.send(dataFromOutsideWorld);
  }


});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index')
});

app.get('/cool', function(request, response) {
  response.send(cool());
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
