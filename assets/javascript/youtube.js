var playlistId = "PLHOyawPtVknXCyiXycVftCM-8LOICtBp6";
var apiKey = "AIzaSyB7sFAVldHcGO73tmAfQk3axlCJaTKQNMk";
var maxResults = 25;
var queryURL = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=" + playlistId + "&key=" + apiKey + "&maxResults=" + maxResults;

$.ajax({
    url: queryURL,
    // Accept: application / json,
    method: "GET"
}).then(function (response) {
    console.log(response)
})