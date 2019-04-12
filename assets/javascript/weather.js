function displayWeather() {
    var APIKey = "78c022ae7b87430bbaabb56f3fd651a0";
    var cityName;
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response){

        console.log(queryURL)
        console.log(response);
    })
    
}

//Adding a click event listener to search button
$(document).on("click")