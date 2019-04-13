

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
                        console.log(queryURLGeolocation);
                        console.log(weather)
                        //retrieve country name and city name
                        var countryNameByGeolocation = weather.sys.country;
                        console.log(countryNameByGeolocation);
                        var cityNameByGeolocation = weather.name;
                        console.log(cityNameByGeolocation);

                        //combine city name and country
                        var pOne = $("<p>").text("Weathher in " + cityNameByGeolocation + ", " + countryNameByGeolocation);
                        



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

                        //combine weather icon and main weather condition
                        var pTwo = weatherIconImage + currentTemp

                        //retrieve main weather condition
                        var weatherMain = weather.weather[0].main;
                        console.log(weatherMain);
                        var pThree = weatherMain;

                        //Show current time and data
                        var currentTime = moment().format("MMM Do YYYY, hh:mm A")
                        console.log(currentTime);
                        var pTime = currentTime;

                        //retrieve clouds data
                        var cloudiness = weather.clouds.all;
                        console.log(cloudiness);
                        var pFour = "Cloudiness: " + cloudiness + "%";

                        //retrieve humudity
                        var humidity = weather.main.humidity;
                        console.log(humidity);
                        var pFive = "Humidity: "+ humidity + "%";

                        //retrieve sunrise data
                        var sunrise = weather.sys.sunrise;
                        var sunrisePrettify = moment(sunrise, "X").format("HH:mm");
                        console.log(sunrisePrettify);
                        var pSix = "Sunrise: " + sunrisePrettify;

                        //retrieve sunset data
                        var sunset = weather.sys.sunset;
                        var sunsetPrettify = moment(sunset, "X").format("HH:mm");
                        console.log(sunsetPrettify);
                        var pSeven = "Sunset: " + sunsetPrettify;

                        //Put the above weather data into html
                        

                      

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




//Show the user's city on the weather image

//Show current time and date

//Show the current weather data including general weather condition, temperature, humidity, wind, cloudiness, humidity, sunrise and sunset



//If user doesn't check "Allow this page to use your location checkbox"， user needs to input the city name or zip code(doesn't allow to submit empty form)

//Show the user's city on the weather image

//Show current time and date

//Show the current weather data including general weather condition, temperature, humidity, wind, cloudiness, humidity, sunrise and sunset




function displayWeatherByCity() {
    var APIKey = "78c022ae7b87430bbaabb56f3fd651a0";
    var cityName = $(".location").val().trim();
    var queryURLCity = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey + "&units=imperial";

    $.ajax({
        url: queryURLCity,
        method: "GET",
    }).then(function (response) {

        console.log(queryURL)
        console.log(response);

    })

}

//Adding a click event listener to search button
$(document).on("click", ".submit", displayWeatherByCity);