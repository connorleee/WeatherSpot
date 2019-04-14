// TODO: array of objects tying mood to weather. Playlists will be attached to mood
// TODO: logic to take weather API call and pull from above array

var playlistID = "37i9dQZF1DX7KNKjOK0o75"
var queryURL = "https://api.spotify.com/v1/playlists/" + playlistID


$.ajax({
    url: queryURL,
    headers: {
        "Accept" : "application/json",
        "Content-Type" : "application/json",
        "Authorization" : "Bearer BQBmORlZpHzLwGCBqT0rcqFnEOK1OLnk6rHv_XTrpHbpRNYYIK4sgNro9br8pnm111mrQvwL24N8Lc6PG8OE__ZP5lCUn59bvTDILTaEkeBbaYLmQgHgfT9s_mK-svqAJSQZfzpg6uHqBDMRWw"
    }, 
    method: "GET"

}).then(function (response) {
    console.log(response);

})