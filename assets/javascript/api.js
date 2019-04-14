
// Global weather declaration in order to use it cross script/method
var api = [{
    // Weather API Call
    weatherApi: function () {
        //If user check the "Allow this page to use your location checkbox", the page will detect the user's city automatically
        $(":checkbox").on("click", function getLocation() {
            //Use HTML5 Geolocation API to get the geographical position of a user

            if (navigator.geolocation) {
                console.log(navigator);
                console.log(navigator.geolocation);

                //Use getCurrentPosition() method to return the user's position
                navigator.geolocation.getCurrentPosition(

                    //Use position property to get the latitude and longitude of the user's position

                    function success(position) {
                        console.log(position)

                        //Call openweathermap API and use the two parameters latitude and longitude to retrive city, time and weather data
                        function displayWeatherByGeolocation() {
                            var APIKey = "78c022ae7b87430bbaabb56f3fd651a0"
                            var latitude = position.coords.latitude;
                            var longitude = position.coords.longitude
                            var queryURLGeolocation = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey + "&units=imperial";

                            $.ajax({
                                url: queryURLGeolocation,
                                method: "GET",
                            }).then(function (weather) {
                                displayWeatherData(weather);
                                console.log(weather)

                                api[1].youtubeApi(weatherMain);
                            })
                        }
                        displayWeatherByGeolocation();
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


        //Define function displayWeatherData to retrieve weather data from weather api and display weather data in html

        function displayWeatherData(weather) {
            //console.log(queryURLGeolocation);
            console.log("displayWeatherData: " + weather)
            //retrieve country name and city name
            var countryNameByGeolocation = weather.sys.country;
            console.log(countryNameByGeolocation);
            var cityNameByGeolocation = weather.name;
            console.log(cityNameByGeolocation);

            //combine city name and country
            var cityAndCountry = cityNameByGeolocation + ", " + countryNameByGeolocation;

            //put city name and country into html
            $("#currentLocation").html(cityAndCountry);


            //retrieve weather icon
            var weatherIconID = weather.weather[0].icon;
            console.log("WeatherIconID: " + weatherIconID);
            var weatherIconURL = "http://openweathermap.org/img/w/" + weatherIconID + ".png";
            console.log("weatherIconURL: " + weatherIconURL);
            var weatherIconImage = $("<img>").attr("src", weatherIconURL)
            console.log("weatherIconImage: " + weatherIconImage);

            //retrieve temperature
            var currentTemp = weather.main.temp;
            console.log("currentTemp: " + currentTemp);
            var currentTempRound = Math.round(currentTemp);
            console.log("currentTempRound: " + currentTempRound);
            var pCurrentTemp = currentTempRound + " Fahrenheit";


            //retrieve main weather condition
            weatherMain = weather.weather[0].main;
            console.log("weatherMain: " + weatherMain);
            var pWeatherMain = weatherMain;


            //Show current time and data
            var currentTime = moment().format("MMM Do YYYY, hh:mm A")
            console.log("currentTime: " + currentTime);
            var pCurrentTime = currentTime;

            //retrieve wind speed data
            var windSpeed = weather.wind.speed;
            console.log("windSpeed: " + windSpeed);
            var windSpeedRound = Math.round(windSpeed);
            console.log("windSpeedRound: " + windSpeedRound);
            var pWindSpeed = "Wind speed: " + windSpeedRound + " meter/sec"



            //retrieve clouds data
            //var cloudiness = weather.clouds.all;
            //console.log(cloudiness);
            //var pCloudiness = $("<p>").text("Cloudiness: " + cloudiness + "%");

            //retrieve humudity
            var humidity = weather.main.humidity;
            console.log("humidity: " + humidity);
            var humidityRound = Math.round(humidity);
            console.log("humidityRoun: " + humidityRound);
            var pHumidity = "Humidity: " + humidityRound + "%";

            //retrieve sunrise data
            var sunrise = weather.sys.sunrise;
            var sunrisePrettify = moment(sunrise, "X").format("hh:mm A");
            console.log("sunrisePrettify: " + sunrisePrettify);
            var pSunrise = "Sunrise: " + sunrisePrettify;

            //retrieve sunset data
            var sunset = weather.sys.sunset;
            var sunsetPrettify = moment(sunset, "X").format("hh:mm A");
            console.log(sunsetPrettify);
            var pSunset = "Sunset: " + sunsetPrettify;

            //Put the above weather data into html
            $("#temperatureDiv").text(pCurrentTemp);
            $("#descriptionDiv").text(pWeatherMain);
            $("#windSpeedDiv").text(pWindSpeed);
            $("#humidityDiv").text(pHumidity);
            $("#sunriseDiv").text(pSunrise);
            $("#sunsetDiv").text(pSunset);
            $("#weatherIcon").html(weatherIconImage);
            $("#currentDateTime").text(pCurrentTime)

        }

        //If user doesn't check "Allow this page to use your location checkbox"， user needs to input the city name or zip code(doesn't allow to submit empty form)

        function displayWeatherByCity() {
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

        //Adding a click event listener to search button
        $(document).on("click", ".submit", displayWeatherByCity);

    }
},

// Youtube API Call
{
    youtubeApi: function (weatherMainReturn) {

        console.log("----weatherMainReturn: " + weatherMainReturn)

        var pidDrizzle = "PLuXiwKradYWMuaTv2KlL134p4hqiDjIl3"; /* Acoustic Guitar Instrumentals */
        var pidClouds = "PLKYTmz7SemaqVDF6XJ15bv_8-j7ckkNgb"; /* lo-fi hip hop */
        var pidSnow = "RD6HckCca2lA8"
        var pidThunder = "PLsj2E7daicxYNzGv_aFjKhzTsb4wtviz9"; /* Thunderstruck \m/ */
        var pidRain = "PLJzjrheyqoDVnOXyOCluGuBtV0K-8seCC"; /* Rainy Day */
        var pidClear = "PLHOyawPtVknXCyiXycVftCM-8LOICtBp6"; /* Have a great day */


        var currentWeather;
        // conditionals to insert current weather into query
        if (weatherMainReturn === "Rain") { currentWeather = pidRain }
        else if (weatherMainReturn === "Clear") { currentWeather = pidClear }
        else if (weatherMainReturn === "Thunderstorm") { currentWeather = pidThunder }
        else if (weatherMainReturn === "Drizzle") { currentWeather = pidDrizzle }
        else if (weatherMainReturn === "Clouds") { currentWeather = pidClouds }
        else if (weatherMainReturn === "Snow") { currentWeather = pidSnow }

        console.log("current weather: " + currentWeather)

        var apiKey = "AIzaSyB7sFAVldHcGO73tmAfQk3axlCJaTKQNMk";
        var maxResults = 5;

        var queryURL = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=" + currentWeather + "&key=" + apiKey + "&maxResults=" + maxResults;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response.items)

            var list = $("<ul>").attr("id", "vidList")
            $("#youtubeApp").html(list)



            var playlist = response.items;
            for (let i = 0; i < playlist.length; i++) {
                var listItems = $("<li>").append(playlist[i].snippet.title);
                $("#vidList").append(listItems);
            }
        })
    }
}
]

