var longLat = document.getElementById("display");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    longLat.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {

    var longitude = position.coords.longitude.toFixed(2);
    var latitude = position.coords.latitude.toFixed(2);

    longLat.innerHTML = "Latitude: " + latitude + 
    "<br>Longitude: " + longitude;

    var APIKey = "2beabda251abb98dae56b0873a993af5";

    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat="+ latitude + "&lon=" + longitude + "&appid=" + APIKey;

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {
 
   
     // Transfer content to HTML
     var city = $("<div>").html("<h1>" + response.name + " Weather Details</h1>");
        var wind = $("<div>").text("Wind Speed: " + response.wind.speed);
        var humidity = $("<div>").text("Humidity: " + response.main.humidity);
        var temperature = $("<div>").text("Temperature (F) " + response.main.temp);

        $(".weatherMain").append(city, wind, humidity, temperature);
    });
   
};

function displayLocation() {

var location = $(".location").val().trim();;


var APIKey = "2beabda251abb98dae56b0873a993af5";

    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=imperial&appid=" + APIKey;

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {

        // Log the resulting object
        console.log(response);

        // Transfer content to HTML
        var city = $("<div>").html("<h1>" + response.name + " Weather Details</h1>");
        var wind = $("<div>").text("Wind Speed: " + response.wind.speed);
        var humidity = $("<div>").text("Humidity: " + response.main.humidity);
        var temperature = $("<div>").text("Temperature (F) " + response.main.temp);

        $(".weatherMain").append(city, wind, humidity, temperature);

      });
};
// Adding a click event listener to all elements with a class of "animal-btn"
$(document).on("click", ".submit", displayLocation);