
// Global weather declaration in order to use it cross script/method
var api = [{
    // Weather API Call
    weatherApi: function () {
        //If user check the "Allow this page to use your location checkbox", the page will detect the user's city automatically
        $(":checkbox").on("click", function getLocation() {
            //Use HTML5 Geolocation API to get the geographical position of a user

            if (navigator.geolocation) {
                // console.log(navigator);
                // console.log(navigator.geolocation);

                //Use getCurrentPosition() method to return the user's position
                navigator.geolocation.getCurrentPosition(

                    //Use position property to get the latitude and longitude of the user's position

                    function success(position) {
                        console.log(position)
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
                                // console.log(weather)

                                api[1].youtubeApi(weatherMain);
                            })
                        }
                        displayWeatherByGeolocation();

                        //Call openweathermap API and use the two parameters latitude and longitude to retrive 5 day/3 hour weather forecast data
                        function displayWeatherForecastByGeolocation() {
                            var queryURLGeolocationForWeatherForecase = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey + "&units=imperial";
                            console.log(queryURLGeolocationForWeatherForecase);
                            $.ajax({
                                url: queryURLGeolocationForWeatherForecase,
                                method: "GET",
                            }).then(function (weatherForecast) {
                                console.log(weatherForecast);
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
            //retrieve country name and city name
            var countryNameByGeolocation = weather.sys.country;
            // console.log(countryNameByGeolocation);
            var cityNameByGeolocation = weather.name;
            // console.log(cityNameByGeolocation);

            //combine city name and country
            var cityAndCountry = cityNameByGeolocation + ", " + countryNameByGeolocation;

            //put city name and country into html
            $("#currentLocation").html(cityAndCountry);


            //retrieve weather icon
            var weatherIconID = weather.weather[0].icon;
            // console.log("WeatherIconID: " + weatherIconID);
            var weatherIconURL = "http://openweathermap.org/img/w/" + weatherIconID + ".png";
            console.log("weatherIconURL: " + weatherIconURL);
            var weatherIconImage = $("<img>").attr("src", weatherIconURL)


            //retrieve temperature
            var currentTemp = weather.main.temp;
            // console.log("currentTemp: " + currentTemp);
            var currentTempRound = Math.round(currentTemp);
            // console.log("currentTempRound: " + currentTempRound);
            var pCurrentTemp = currentTempRound + " Fahrenheit";


            //retrieve main weather condition
            weatherMain = weather.weather[0].main;
            console.log("weatherMain: " + weatherMain);
            var pWeatherMain = weatherMain;


        


            //retrieve wind speed data
            var windSpeed = weather.wind.speed;
            // console.log("windSpeed: " + windSpeed);
            var windSpeedRound = Math.round(windSpeed);
            // console.log("windSpeedRound: " + windSpeedRound);
            var pWindSpeed = "Wind speed: " + windSpeedRound + " meter/sec"



            //retrieve clouds data
            //var cloudiness = weather.clouds.all;
            //console.log(cloudiness);
            //var pCloudiness = $("<p>").text("Cloudiness: " + cloudiness + "%");

            //retrieve humudity
            var humidity = weather.main.humidity;
            // console.log("humidity: " + humidity);
            var humidityRound = Math.round(humidity);
            // console.log("humidityRoun: " + humidityRound);
            var pHumidity = "Humidity: " + humidityRound + "%";

            //retrieve sunrise data
            var sunrise = weather.sys.sunrise;
            var sunrisePrettify = moment(sunrise, "X").format("hh:mm A");
            // console.log("sunrisePrettify: " + sunrisePrettify);
            var pSunrise = "Sunrise: " + sunrisePrettify;

            //retrieve sunset data
            var sunset = weather.sys.sunset;
            var sunsetPrettify = moment(sunset, "X").format("hh:mm A");
            // console.log(sunsetPrettify);
            var pSunset = "Sunset: " + sunsetPrettify;

            //Put the above weather data into html
            $("#temperatureDiv").text(pCurrentTemp);
            $("#descriptionDiv").text(pWeatherMain);
            $("#windSpeedDiv").text(pWindSpeed);
            $("#humidityDiv").text(pHumidity);
            $("#sunriseDiv").text(pSunrise);
            $("#sunsetDiv").text(pSunset);
            $("#weatherIcon").html(weatherIconImage);

        }
            //Show current time and data
            var currentTime = moment().format("MMM Do YYYY, hh:mm A");
            $("#currentDateTime").text(currentTime);

            setInterval(function(){
                currentTime = moment().format("MMM Do YYYY, hh:mm A")
                var pCurrentTime = currentTime;
                //console.log("currentTime: " + currentTime);
                $("#currentDateTime").text(pCurrentTime)
            }, 60*1000 );
        
        

       

        //Define function displayWeatherForecastData to retrieve retrieve 5 day/3hour forecast weather data from weather api and display weather data in html
        function displayWeatherForecastData(weatherForecast) {
            console.log(weatherForecast);

            for (var i = 0; i < weatherForecast.list.length; i++) {
                //retrieve future Date
                var futureDayOne = moment(weatherForecast.list[i].dt, "X").format("ddd MMM Do");
                console.log(futureDayOne);

                //retrieve future day one at 03:00 AM

                var futureDayOneTimeThree = moment(weatherForecast.list[i].dt, "X").format("hh:mm A");
                console.log(futureDayOneTimeThree);

                //retrieve temperature at future day one at 03:00 AM

                var futureDayOneTimeThreeTemp = weatherForecast.list[i].main.temp;
                console.log(futureDayOneTimeThreeTemp);

                //retrieve weather icon at future day one at 03:00 AM
                var weatherIconIDForFuture = weatherForecast.list[i].weather[0].icon;
                console.log(weatherIconIDForFuture);
                var weatherIconURLForFuture = "http://openweathermap.org/img/w/" + weatherIconIDForFuture + ".png";
                console.log(weatherIconURLForFuture);
                var weatherIconImageForFuture = $("<img>").attr("src", weatherIconURLForFuture);

                //retrieve weather description at future day one at 03:00 AM
                var weatherDescriptionForFuture = weatherForecast.list[i].weather[0].description;
                console.log(weatherDescriptionForFuture);

                //retrieve humidity at future day one at 03:00 AM
                var humidityForFuture = weatherForecast.list[i].main.humidity + "%";
                console.log(humidityForFuture);
            }











        }

        //If user doesn't check "Allow this page to use your location checkbox"， user needs to input the city name(doesn't allow to submit empty form)

        function displayWeatherByCity() {
            $('.rain').hide();
            $('.snowflakes').hide();
            $('.storm').hide();
            $('.sun').hide();
            var cityName = $(".location").val().trim();
            var APIKey = "78c022ae7b87430bbaabb56f3fd651a0";
            var queryURLCity = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey + "&units=imperial";
            console.log(queryURLCity);

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
            console.log(queryURLCityForWeatherForecast);

            $.ajax({
                url: queryURLCityForWeatherForecast,
                method: "GET",
            }).then(function (weatherForecast) {
                console.log(weatherForecast);
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

        // console.log("weatherMainReturn: " + weatherMainReturn)

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

        // console.log("current weather playlist: " + currentWeatherPlaylist)

        var apiKey = "AIzaSyB7sFAVldHcGO73tmAfQk3axlCJaTKQNMk";
        var maxResults = 5;

        var queryURL = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=" + currentWeatherPlaylist + "&key=" + apiKey + "&maxResults=" + maxResults;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response.items)

            var youtubeText = $("<div>").attr("id", "youtubeText").html("<h4>Music Suggestions</h4>");
            var list = $("<div>").attr("id", "vidList")
            $("#youtubeApp").append(youtubeText).append(list)

            var playlist = response.items;
            for (let i = 0; i < playlist.length; i++) {
                var playlistTitle = playlist[i].snippet.title.split(' ').slice(0, 5).join(' ');
                var listItems = $("<button>").addClass("playlistTitle btn-hover").attr("videoID", playlist[i].snippet.resourceId.videoId).append(playlistTitle);
                $("#vidList").append(listItems);
            }
            
        })
    }
}
]

