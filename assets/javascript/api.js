// Global weather declaration in order to use it cross script/method
var api = [{
    // Weather API Call
    weatherApi: function () {
        //If user check the "Allow this page to use your location checkbox", the page will detect the user's city automatically
        $("#buttonID").on("click", function getLocation() {
            //Use HTML5 Geolocation API to get the geographical position of a user
            var elem = document.querySelector('#background');
            elem.innerHTML = '<img class="background" src="assets/images/seattle.jpg">'
            if (navigator.geolocation) {

                //Use getCurrentPosition() method to return the user's position
                navigator.geolocation.getCurrentPosition(

                    //Use position property to get the latitude and longitude of the user's position

                    function success(position) {

                        var APIKey = "78c022ae7b87430bbaabb56f3fd651a0"
                        var latitude = position.coords.latitude;
                        var longitude = position.coords.longitude

                        //Call openweathermap API and use the two parameters latitude and longitude to retrive city, current time and current weather data
                        function displayWeatherByGeolocation() {

                            var queryURLGeolocation = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey + "&units=imperial";

                            $.ajax({
                                url: queryURLGeolocation,
                                method: "GET",
                            }).then(function (weather) {
                                displayWeatherData(weather);
                                timeZone(weather);
                                $('#youtubePlayer').show();

                                api[1].youtubeApi(weatherMain);
                            })
                        }
                        displayWeatherByGeolocation();

                        //Call openweathermap API and use the two parameters latitude and longitude to retrive 5 day/3 hour weather forecast data
                        function displayWeatherForecastByGeolocation() {
                            var queryURLGeolocationForWeatherForecase = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey + "&units=imperial";

                            $.ajax({
                                url: queryURLGeolocationForWeatherForecase,
                                method: "GET",
                            }).then(function (weatherForecast) {

                                displayWeatherForecastData(weatherForecast);

                            })
                        }
                        displayWeatherForecastByGeolocation();

                    },

                    function error(error_message) {
                        //for when getting location result is in an error
                        console.error("An error has occured while retrieving loction", error_message)
                    }

                )
            }
            else {
                //geolocation is not supported 
                alert("Geolocation is not supported by this browser, please input your city name in the search box!")
            }

        })

        //Define function displayWeatherData to retrieve current weather data from weather api and display weather data in html

        function displayWeatherData(weather) {

            $('#youtubePlayer').show();

            //retrieve country name and city name
            var countryNameByGeolocation = weather.sys.country;
            var cityNameByGeolocation = weather.name;

            //combine city name and country
            var cityAndCountry = cityNameByGeolocation + ", " + countryNameByGeolocation;

            //put city name and country into html
            $("#currentLocation").html(cityAndCountry);


            //retrieve weather icon
            var weatherIconID = weather.weather[0].icon;

            var weatherIconURL = "http://openweathermap.org/img/w/" + weatherIconID + ".png";

            var weatherIconImage = $("<img>").attr("src", weatherIconURL)


            //retrieve temperature
            var currentTemp = weather.main.temp;

            var currentTempRound = Math.round(currentTemp);

            var pCurrentTemp = currentTempRound + "° F";


            //retrieve main weather condition
            weatherMain = weather.weather[0].main;

            var pWeatherMain = weatherMain;

            //retrieve wind speed data
            var windSpeed = weather.wind.speed;

            var windSpeedRound = Math.round(windSpeed);

            var pWindSpeed = "Wind speed: " + windSpeedRound + " meter/sec"

            //retrieve humudity
            var humidity = weather.main.humidity;

            var humidityRound = Math.round(humidity);

            var pHumidity = "Humidity: " + humidityRound + "%";

            //retrieve sunrise data
            var sunrise = weather.sys.sunrise;
            var sunrisePrettify = moment(sunrise, "X").format("hh:mm A");

            var pSunrise = "Sunrise: " + sunrisePrettify;

            //retrieve sunset data
            var sunset = weather.sys.sunset;
            var sunsetPrettify = moment(sunset, "X").format("hh:mm A");

            var pSunset = "Sunset: " + sunsetPrettify;

            //Put the above weather data into html
            $("#temperatureDiv").text(pCurrentTemp);
            $("#descriptionDiv").text(pWeatherMain);
            $("#windSpeedDiv").text(pWindSpeed);
            $("#humidityDiv").text(pHumidity);
            $("#sunriseDiv").text(pSunrise);
            $("#sunsetDiv").text(pSunset);
            $("#weatherIcon").html(weatherIconImage);


            function determineWeatherAnimation() {
                if (weatherMain === "Rain" || weatherMain === "Drizzle") {
                    $('.rain').show();
                    $('.sun').hide();
                    $('.fog').hide();
                    $('.snowflakes').hide();
                } else if (weatherMain === "Snow") {
                    $('.snowflakes').show();
                    $('.fog').hide();
                    $('.rain').hide();
                    $('.sun').hide();
                } else if (weatherMain === "Clear" || weatherMain === "Sun") {
                    $('.sun').show();
                    $('.rain').hide();
                    $('.fog').hide();
                    $('.snowflakes').hide();

                } else if (weatherMain === "Thunderstorm") {
                    $('.storm').show();
                    $('.rain').show();
                    $('.sun').hide();
                    $('.snowflakes').hide();

                } else if (weatherMain === "Mist" || weatherMain === "Clouds") {
                    $('.fog').show();
                    $('.sun').hide();
                    $('.storm').hide();
                    $('.snowflakes').hide();
                }

            }
            determineWeatherAnimation();

        }

        function timeZone(weather) {

            var lat = weather.coord.lat;
            var lon = weather.coord.lon;

            $.ajax({
                url: "https://maps.googleapis.com/maps/api/timezone/json?location=" + lat + "," + lon + "&key=AIzaSyAz5PoWXceWmVdDEsy4odPgaJvCZMO9jLY&timestamp=" + (Math.round((new Date().getTime()) / 1000)).toString(),
            })
                .done(function (response) {
                    var timeZoneId = response.timeZoneId;
                    var currentTime = moment().tz(timeZoneId).format("MMM Do YYYY, hh:mm A")
                    $("#currentDateTime").text(currentTime);

                    setInterval(function () {
                        currentTime = moment().tz(timeZoneId).format("MMM Do YYYY, hh:mm A")
                        var pCurrentTime = currentTime;

                        $("#currentDateTime").text(pCurrentTime)
                    }, 60 * 1000);

                });
        }

        //Define function displayWeatherForecastData to retrieve retrieve 5 day/3hour forecast weather data from weather api and display weather data in html
        function displayWeatherForecastData(weatherForecast) {
            $("#accordionEx").empty();
            var forecastDates;
            var weatherLength;
            var forecasthour;
            var startIndex;

            for (var d = 0; d < 5; d++) {

                if (d == 0) {
                    startIndex = 0;
                    forecastDates = moment(weatherForecast.list[0].dt, "X").format("ddd MMM Do");
                    forecasthour = moment(weatherForecast.list[0].dt, "X").format("HH");
                    var forecastTimePointsinNumbers = parseInt(forecasthour);

                    weatherLength = (23 - forecastTimePointsinNumbers) / 3 + 1;
                }
                else {
                    startIndex += weatherLength;
                    forecastDates = moment(weatherForecast.list[startIndex].dt, "X").format("ddd MMM Do");
                    forecasthour = moment(weatherForecast.list[startIndex].dt, "X").format("HH");
                    weatherLength = 8;
                }
                var cardTemplate =
                    `<div class="card">
                <div class="card-header" role="tab" id="headingOne${d}">
                    <a data-toggle="collapse" data-parent="#accordionEx" href="#collapse${d}"
                    aria-expanded="true" aria-controls="collapse${d}" id="weather-forecast-date">
                        <h5 class="mb-0">
                        ${forecastDates} <i class="fas fa-angle-down rotate-icon"></i>
                        </h5>
                    </a>
                </div>
                <div id="collapse${d}" class="collapse show" role="tabpanel" aria-labelledby="headingOne${d}"
                data-parent="#accordionEx">
                </div>
            </div>`;

                $("#accordionEx").append(cardTemplate);

                var cardBody = `<div id="body${d}" class="card-body">${forecasthour}</div>`;
                $("#collapse" + d).append(cardBody);

                for (var i = startIndex; i < startIndex + weatherLength; i++) {
                    var hour = moment(weatherForecast.list[i].dt, "X").format("HH:mm");
                    var weatherIconIDForFuture = weatherForecast.list[i].weather[0].icon;
                    var weatherIconURLForFuture = "http://openweathermap.org/img/w/" + weatherIconIDForFuture + ".png";
                    var icon = $("<img>").attr("src", weatherIconURLForFuture);

                    var temp = weatherForecast.list[i].main.temp + "° F";
                    var description = weatherForecast.list[i].weather[0].description;
                    //var humidityForFuture = weatherForecast.list[i].main.humidity + "%";
                    $("#body" + d).append(`<p id = "weather-forecast-p", style="color:blue;"> ${hour} ${temp} ${description}</p>`);

                }
            }

        }


        //If user doesn't check "Allow this page to use your location checkbox"， user needs to input the city name(doesn't allow to submit empty form)

        function displayWeatherByCity() {
            $('.location').empty();
            var cityName = $(".location").val().trim();
            var APIKey = "78c022ae7b87430bbaabb56f3fd651a0";
            var queryURLCity = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey + "&units=imperial";


            $.ajax({
                url: queryURLCity,
                method: "GET",
            }).then(function (weather) {
                displayWeatherData(weather);
                timeZone(weather);
                // calls the youtube API 
                api[1].youtubeApi(weatherMain);

            })

        }

        //Display Weather Forecast for 5 day/3 hour by city name
        function displayWeatherForecastByCity() {
            $('#landing').hide();
            var cityName = $(".location").val().trim();
            var APIKey = "78c022ae7b87430bbaabb56f3fd651a0";
            var queryURLCityForWeatherForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey + "&units=imperial";


            $.ajax({
                url: queryURLCityForWeatherForecast,
                method: "GET",
            }).then(function (weatherForecast) {

                displayWeatherForecastData(weatherForecast);
            })

            function showCityBackground() {
                var elem = document.querySelector('#background');
                elem.innerHTML = '<img class="background" src="assets/images/' + cityName + '.jpg" alt="' + cityName + '">'

            }
            showCityBackground()

        }

        //Adding a click event listener to search button
        //$(document).on("click", ".submit", displayWeatherByCity);
        $(".submit").on("click", function () {
            displayWeatherByCity();
            displayWeatherForecastByCity();
        })

    }
},


// Youtube API Call
{
    youtubeApi: function (weatherMainReturn) {
        $("#youtubeApp").empty();


        var pidDrizzle = "PLuXiwKradYWMuaTv2KlL134p4hqiDjIl3"; /* Acoustic Guitar Instrumentals */
        var pidClouds = "PLKYTmz7SemaqVDF6XJ15bv_8-j7ckkNgb"; /* lo-fi hip hop */
        var pidSnow = "PLBiHiGDiFvmjV_hVEQkFUV2WmD5ubKXxP"; /* Music-Warm Winter Season */
        var pidThunder = "PLsj2E7daicxYNzGv_aFjKhzTsb4wtviz9"; /* Thunderstruck \m/ */
        var pidRain = "PLJzjrheyqoDVnOXyOCluGuBtV0K-8seCC"; /* Rainy Day */
        var pidClear = "PLHOyawPtVknXCyiXycVftCM-8LOICtBp6"; /* Have a great day */


        var currentWeatherPlaylist;
        // conditionals to insert current weather into query
        if (weatherMainReturn === "Rain") { currentWeatherPlaylist = pidRain }
        else if (weatherMainReturn === "Clear") { currentWeatherPlaylist = pidClear }
        else if (weatherMainReturn === "Thunderstorm") { currentWeatherPlaylist = pidThunder }
        else if (weatherMainReturn === "Drizzle") { currentWeatherPlaylist = pidDrizzle }
        else if (weatherMainReturn === "Clouds") { currentWeatherPlaylist = pidClouds }
        else if (weatherMainReturn === "Snow") { currentWeatherPlaylist = pidSnow }


        var apiKey = "AIzaSyB7sFAVldHcGO73tmAfQk3axlCJaTKQNMk";
        var maxResults = 50;

        var queryURL = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=" + currentWeatherPlaylist + "&key=" + apiKey + "&maxResults=" + maxResults;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {


            var youtubeText = $("<div>").attr("id", "youtubeText").html("<h4>Music Suggestions</h4>");
            var list = $("<div>").attr("id", "vidList")
            $("#youtubeApp").append(youtubeText).append(list)

            var playlist = shuffle(response.items);

            // only return the first 5 songs of shuffled list
            for (let i = 0; i < 5; i++) {
                var playlistTitle = playlist[i].snippet.title.split(' ').slice(0, 5).join(' ');
                var listItems = $("<button>").addClass("playlistTitle btn-hover").attr("videoID", playlist[i].snippet.resourceId.videoId).append(playlistTitle);
                $("#vidList").append(listItems);
            }
        })
    }
}
]

