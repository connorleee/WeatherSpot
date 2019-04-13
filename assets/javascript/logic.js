
var makeItRain = function() {
  //clear out everything
  $('.rain').empty();

  var increment = 0;
  var drops = "";
  var backDrops = "";

  while (increment < 100) {
    //couple random numbers to use for various randomizations
    //random number between 98 and 1
    var randoHundo = (Math.floor(Math.random() * (98 - 1 + 1) + 1));
    //random number between 5 and 2
    var randoFiver = (Math.floor(Math.random() * (5 - 2 + 1) + 2));
    //increment
    increment += randoFiver;
    //add in a new raindrop with various randomizations to certain CSS properties
    drops += '<div class="drop" style="left: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
    backDrops += '<div class="drop" style="right: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
  }

  $('.rain.front-row').append(drops);
  $('.rain.back-row').append(backDrops);
}

$('.splat-toggle.toggle').on('click', function() {
  $('body').toggleClass('splat-toggle');
  $('.splat-toggle.toggle').toggleClass('active');
  makeItRain();
});

makeItRain();
<<<<<<< HEAD
function showPosition(position) {
    $('.weatherMain').empty();
    $('.mainWeatherCard').show();
    var longitude = position.coords.longitude.toFixed(2);
    var latitude = position.coords.latitude.toFixed(2);

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
      var city = $("<div>").text(response.name).addClass('cityName');
      var wind = $("<div>").text("Wind Speed: " + response.wind.speed);
      var humidity = $("<div>").text("Humidity: " + response.main.humidity);
      var temperature = $("<div>").text("Temperature (F) " + response.main.temp);
      
    $(".weatherMain").append(humidity);
    $('#currentLocation').append(city);
    $('#windSpeedDiv').append(wind);
    $('#temperatureDiv').append(temperature);

    });
};

function displayLocation() {
  $('.weatherMain').empty();
  $('#currentLocation').empty();
  
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
        var city = $("<div>").text(response.name).addClass('cityName');
        var wind = $("<div>").text("Wind Speed: " + response.wind.speed);
        var humidity = $("<div>").text("Humidity: " + response.main.humidity);
        var temperature = $("<div>").text("Temperature (F) " + response.main.temp);

        $(".mainWeatherCard").append(humidity);
        $('#temperatureDiv').append(temperature);
        $('#windSpeedDiv').append(wind);
        
        $('#currentLocation').append(city);
      });
};
// Adding a click event listener to all elements with a class of "animal-btn"
$(document).on("click", ".submit", displayLocation);
=======
>>>>>>> 24c3ed85faa7da20c9a9f191f8da078e53d657dd
