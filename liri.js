//Variables and Requires
//---------------------------------------------------
require("dotenv").config();
var keys = require("./keys.js");

var inputString = process.argv;

var twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require('request');

var clientS = new Spotify(keys.spotify);
var client = new twitter(keys.twitter);

//Functions
//---------------------------------------------------
var getTweets = function() {
  var params = { screen_name: 'LIRI_demo', count: 20 };
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      var data = []; //empty array to hold data
      for (var i = 0; i < tweets.length; i++) {
        data.push({
            'created at: ' : tweets[i].created_at,
            'Tweets: ' : tweets[i].text,
        });
      }
      console.log(data);
    }
  });
};

var getArtistNames = function(artist) {
  return artist.name;
};

//Function for finding songs on Spotify
var getMeSpotify = function(searchTerm) {
  //If no song is provided then your program will default to "The Sign" by Ace of Base.
  if (searchTerm === undefined) {
    searchTerm = 'The-Sign';
  };

clientS.search({ type: 'track', query: searchTerm, limit: 2 }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  } 
  
  var songs = data.tracks.items;
  var data = []; //empty array to hold data

    for (var i = 0; i < songs.length; i++) {
      data.push({
        'artist(s)': songs[i].artists.map(getArtistNames),
        'song name: ': songs[i].name,
        'preview song: ': songs[i].preview_url,
        'album: ': songs[i].album.name,
      });
    }
    console.log(data);
  });
};

var getMeMovie = function(movieName) {

  if (movieName === undefined) {
    movieName = 'Mr Nobody';
  }

  var queryURL = "https://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  request(queryURL, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = [];
      var jsonData = JSON.parse(body);

      data.push({
      'Title: ' : jsonData.Title,
      'Year: ' : jsonData.Year,
      'IMDB Rating: ' :jsonData.imdbRating,
      'Rotten Tomatoes Ratings:' : jsonData.Ratings[1].Value,
      'Country: ' : jsonData.Country,
      'Language: ' : jsonData.Language, 
      'Plot: ' : jsonData.Plot,
      'Actors: ' : jsonData.Actors,
  });
     console.log(data) 
     // console.log(JSON.parse(body));||<-was used to read the JSON to determine how to extract needed data
}
  });

}

//Function for getting movie information, caseData = move-this <movie name here>
//Main Processes
//---------------------------------------------------
var pick = function(caseData, functionData) {
  switch (caseData) {
    case 'my-tweets':
      getTweets();
      break;
    case 'spotify-this-song':
      getMeSpotify(functionData);
      break;
    case 'movie-this':
      getMeMovie(functionData);
      break;
    case 'do-what-it-says':
      doWhatItSays();
      break;
    default:
      console.log('LIRI doesn\'t know that');
  }
}
//run this on load of js file
var runThis = function(argOne, argTwo) {
  pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);
//---------------------------------------------------

// FOUR    * `do-what-it-says`
//     `node liri.js do-what-it-says`
   
//    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
     
//      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
     
//      * Feel free to change the text in that document to test out the feature for other commands.
