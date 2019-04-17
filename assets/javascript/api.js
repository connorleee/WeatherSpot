
// Global weather declaration in order to use it cross script/method
var api = [{
    // Weather API Call
    weatherApi: function () {
        //If user check the "Allow this page to use your location checkbox", the page will detect the user's city automatically
        $(":checkbox").on("click", function getLocation() {
            //Use HTML5 Geolocation API to get the geographical position of a user
            $('#youtubePlayer').show();
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
                } else if (weatherMain === "Snow") {
                    $('.snowflakes').show();
                    $('.fog').hide();
                    $('.rain').show();
                } else if (weatherMain === "Clear" || weatherMain === "Sun") {
                    $('.sun').show();
                    $('.rain').hide();
                    $('.fog').hide();
                } else if (weatherMain === "Thunderstorm") {
                    $('.storm').show();
                    $('.rain').show();
                    $('.sun').hide();
                } else if (weatherMain === "Mist" || weatherMain === "Clouds") {
                    $('.fog').show();
                    $('.sun').hide();
                }
                    
                }
            determineWeatherAnimation();

        }
            //Show current time and data
            var currentTime = moment().format("MMM Do YYYY, hh:mm A");
            $("#currentDateTime").text(currentTime);

            setInterval(function(){
                currentTime = moment().format("MMM Do YYYY, hh:mm A")
                var pCurrentTime = currentTime;

                $("#currentDateTime").text(pCurrentTime)
            }, 60*1000 );

        //Define function displayWeatherForecastData to retrieve retrieve 5 day/3hour forecast weather data from weather api and display weather data in html
        function displayWeatherForecastData(weatherForecast) {


            for (var i = 0; i < weatherForecast.list.length; i++) {
                //retrieve future Date
                var futureDayOne = moment(weatherForecast.list[i].dt, "X").format("ddd MMM Do");


                //retrieve future day one at 03:00 AM

                var futureDayOneTimeThree = moment(weatherForecast.list[i].dt, "X").format("hh:mm A");


                //retrieve temperature at future day one at 03:00 AM

                var futureDayOneTimeThreeTemp = weatherForecast.list[i].main.temp;


                //retrieve weather icon at future day one at 03:00 AM
                var weatherIconIDForFuture = weatherForecast.list[i].weather[0].icon;

                var weatherIconURLForFuture = "http://openweathermap.org/img/w/" + weatherIconIDForFuture + ".png";

                var weatherIconImageForFuture = $("<img>").attr("src", weatherIconURLForFuture);

                //retrieve weather description at future day one at 03:00 AM
                var weatherDescriptionForFuture = weatherForecast.list[i].weather[0].description;


                //retrieve humidity at future day one at 03:00 AM
                var humidityForFuture = weatherForecast.list[i].main.humidity + "%";

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

                // calls the youtube API 
                api[1].youtubeApi(weatherMain);
            })

        }

        //Display Weather Forecast for 5 day/3 hour by city name
        function displayWeatherForecastByCity() {
            var cityName = $(".location").val().trim();
            var APIKey = "78c022ae7b87430bbaabb56f3fd651a0";
            var queryURLCityForWeatherForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey;


            $.ajax({
                url: queryURLCityForWeatherForecast,
                method: "GET",
            }).then(function (weatherForecast) {

                displayWeatherForecastData(weatherForecast);
            })
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
        var pidSnow = "RD6HckCca2lA8"
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

