

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
    console.log(weather)
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
    console.log(weatherIconID);
    var weatherIconURL = "http://openweathermap.org/img/w/" + weatherIconID + ".png";
    console.log(weatherIconURL);
    var weatherIconImage = $("<img>").attr("src", weatherIconURL)
    console.log(weatherIconImage);

    //retrieve temperature
    var currentTemp = weather.main.temp;
    console.log(currentTemp);
    var pCurrentTemp = $("<p>").text(currentTemp + " Fahrenheit");



    //retrieve main weather conditio
    var weatherMain = weather.weather[0].main;
    console.log(weatherMain);
    var pWeatherMain = $("<p>").text(weatherMain);


    //Show current time and data
    var currentTime = moment().format("MMM Do YYYY, hh:mm A")
    console.log(currentTime);
    var pCurrentTime = $("<p>").text(currentTime);


    //retrieve clouds data
    var cloudiness = weather.clouds.all;
    console.log(cloudiness);
    var pCloudiness = $("<p>").text("Cloudiness: " + cloudiness + "%");

    //retrieve humudity
    var humidity = weather.main.humidity;
    console.log(humidity);
    var pHumidity = $("<p>").text("Humidity: " + humidity + "%");

    //retrieve sunrise data
    var sunrise = weather.sys.sunrise;
    var sunrisePrettify = moment(sunrise, "X").format("HH:mm");
    console.log(sunrisePrettify);
    var pSunrise = $("<p>").text("Sunrise: " + sunrisePrettify);

    //retrieve sunset data
    var sunset = weather.sys.sunset;
    var sunsetPrettify = moment(sunset, "X").format("HH:mm");
    console.log(sunsetPrettify);
    var pSunset = $("<p>").text("Sunset: " + sunsetPrettify);

    //Put the above weather data into html
    $(".weatherMain").empty().append(
        weatherIconImage,
        pCurrentTime,
        pWeatherMain,
        pCurrentTemp,
        pCloudiness,
        pHumidity,
        pSunrise,
        pSunset

    )
}

//If user doesn't check "Allow this page to use your location checkbox"， user needs to input the city name or zip code(doesn't allow to submit empty form)

function displayWeatherByCity() {
    var APIKey = "78c022ae7b87430bbaabb56f3fd651a0";
    var cityName = $(".location").val().trim();

    var queryURLCity = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey + "&units=imperial";

    $.ajax({
        url: queryURLCity,
        method: "GET",
    }).then(function (weather) {
        displayWeatherData(weather);
    })
}

//Adding a click event listener to search button
$(document).on("click", ".submit", displayWeatherByCity);