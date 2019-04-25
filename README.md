# [WeatherSpot](https://connorleee.github.io/project-1/)

### WeatherSpot is a weather app that spices up your daily routine by suggesting music that relates to the mood that the current weather might induce. Click the README title to check out WeatherSpot!

#### WeatherSpot incorporates two API calls to generate the information shown on the DOM:
  1. OpenWeatherMap 
  2. Youtube

#### OpenWeatherMap is called based on user input. User can choose to call for weather information in their current location or in a city of their choice. Once the user submits the call, OpenWeatherMap will return general weather information for the location the user submitted, and a main weather type (sunny, rainy, etc). The main weather type will determine the appropriate front-end background and also be fed into the Youtube API.

#### Youtube API will take the main weather type as an argument and choose from pre-defined playlists related to the weather mood. This playlist will be pushed to the DOM as a list of 5 songs as buttons that can be clicked to launch an embedded Youtube player for that song.

### _The weather can affect your mood, so why can't your weather app???_
