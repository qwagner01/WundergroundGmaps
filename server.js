var XMLHttpRequest = require("XMLHttpRequest").XMLHttpRequest;
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendfile('index.html');
  res.sendfile('myScript.js');

});

//Now I am playing third party server role
app.get('/weather', function(req, res) {
  // console.log(event.latLng);
  var sRequest = new XMLHttpRequest();
  sRequest.addEventListener('load', sendDataBackToClient);

  sRequest.open("GET", "http://api.wunderground.com/api/1a536450bc144857/forecast/q/" + coord + ".json");
  sRequest.send();


  function sendDataBackToClient() {

    var dataFromOutsideWorld = this.responseText;
    res.send(dataFromOutsideWorld);
  }


});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
