var button = document.getElementById("button");
var display = document.getElementById("info");
button.addEventListener('click', goGetTheInfo);
var coord;

//fake info from client to client
function goGetTheInfo() {

  var request = new XMLHttpRequest();

  request.addEventListener('load', showInfo);
  request.open("GET", '/weather');
  request.send();

  request.open('POST', '/weather');
  request.setRequestHeader('Content-type', 'application/x-ww-form-urlencoded');
  request.send(coord);

}

function showInfo() {
  // display.innerHTML = this.responseText;

  var content = JSON.parse(this.responseText);

  console.log(content);


  var newPara = document.createElement("p");
  var text = document.createTextNode("The weather in " + content.current_observation.display_location.full + " on " + content.current_observation.observation_time_rfc822 + " is " + content.current_observation.weather + " and it feels like " + content.current_observation.feelslike_string);
  newPara.appendChild(text);
  document.getElementById('weather').appendChild(newPara);
}

function myMap() {
  var mapProp = {
    center: new google.maps.LatLng(41.13999939, -73.34999847),
    zoom: 2,
  };
  var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

  google.maps.event.addListener(map, 'click', function(event) {
   var pos = event.latLng;
  coord = pos.replace(/[(,)]/g, "");
   alert(coord);  // in event.latLng  you have the coordinates of click
  // alert(pos);
});

infoWindow = new google.maps.InfoWindow;

// Try HTML5 geolocation.
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    infoWindow.setPosition(pos);
    infoWindow.setContent('Location found.');
    infoWindow.open(map);
    map.setCenter(pos);
  }, function() {
    handleLocationError(true, infoWindow, map.getCenter());
  });
} else {
  // Browser doesn't support Geolocation
  handleLocationError(false, infoWindow, map.getCenter());
 }
}
