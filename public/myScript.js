var button = document.getElementById("button");
var display = document.getElementById("info");
var button2 = document.getElementById('button2');
var coord;
// var content;
// var pos
button.addEventListener('click', goSendTheInfo);
button2.addEventListener('click', displayAbout);

function displayAbout(){
  var about = document.getElementById('about');
  if (about.style.display === 'none') {
        about.style.display = 'inline';
    } else {
        about.style.display = 'none';
    }
}

//fake info from client to client
function goGetTheInfo() {
  var request = new XMLHttpRequest();
  request.addEventListener('load', showInfo);
  request.open("GET", '/weather');
  request.send();
}

function goSendTheInfo(){
  var request = new XMLHttpRequest();
  // request.addEventListener('load', goGetTheInfo)
  request.open('POST', '/weather');
  request.setRequestHeader('Content-type', 'application/json');
  request.addEventListener('load', showInfo);
  request.send(coord);

}


function showInfo() {
  // display.innerHTML = this.responseText;
  var content = JSON.parse(this.responseText);
  console.log(content);

  // var newPara = document.createElement("p");
  // var text = document.createTextNode("The Weather in " + content.current_observation.display_location.full + " " + content.current_observation.observation_time + " is " + content.current_observation.weather + " and it feels like " + content.current_observation.feelslike_string);
  var text = "The Weather in " + content.current_observation.display_location.full + " " + content.current_observation.observation_time + " is " + content.current_observation.weather + " and it feels like " + content.current_observation.feelslike_string
  // newPara.appendChild(text);
  document.getElementById('weather').innerHTML = text;
}

function myMap() {
  var mapProp = {
    center: new google.maps.LatLng(41.13999939, -73.34999847),
    zoom: 10,
  };
  var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

  google.maps.event.addListener(map, 'click', function(event) {
    var pos = event.latLng; // in event.latLng  you have the coordinates of click
    // var params = JSON.stringify()
    coord = JSON.stringify(pos);
    // coord = stringify.replace(/{"lat":/g, "").replace(/"lng":/g, "").replace(/}/g, "")
    console.log(coord); //variable that gets rid of the unwanted characters
  });

  infoWindow = new google.maps.InfoWindow;

  // Going to give current location
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
