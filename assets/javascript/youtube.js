var pidSnow = "RD6HckCca2lA8"
var pidThunder = "PLsj2E7daicxYNzGv_aFjKhzTsb4wtviz9"; /* Thunderstruck \m/ */
var pidRain = "PLJzjrheyqoDVnOXyOCluGuBtV0K-8seCC"; /* Rainy Day */
var pidClear = "PLHOyawPtVknXCyiXycVftCM-8LOICtBp6"; /* Have a great day */

var apiKey = "AIzaSyB7sFAVldHcGO73tmAfQk3axlCJaTKQNMk";
var maxResults = 25;
var queryURL = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=" + pidThunder + "&key=" + apiKey + "&maxResults=" + maxResults;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(response.items)

    var list = $("<ul>").attr("id", "vidList")
    $("#spotifyApp").html(list)
    var playlist = response.items;
    for (let i = 0; i < playlist.length; i++) {
        var listItems = $("<li>").append(playlist[i].snippet.title);
        $("#vidList").append(listItems);
    }
})