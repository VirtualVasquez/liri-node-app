//Variables and Requires
//---------------------------------------------------
require("dotenv").config();
var keys = require("./keys.js");

var inputString = process.argv;
//var operand = inputString[2];
// var searchTerm = inputString[3];
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
//Main Processes
//---------------------------------------------------
// if (operand === "my-tweets"){
// 	getTweets();
// }
// else if (operand === "spotify-this-song"){
//   getMeSpotify();
// }
var pick = function(caseData, functionData) {
  switch (caseData) {
    case 'my-tweets':
      getTweets();
      break;
    case 'spotify-this-song':
      getMeSpotify(functionData);
      break;
    // case 'movie-this':
    //   getMeMovie(functionData);
    //   break;
    // case 'do-what-it-says':
    //   doWhatItSays();
    //   break;
    // default:
    //   console.log('LIRI doesn\'t know that');
  }
}
//run this on load of js file
var runThis = function(argOne, argTwo) {
  pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);
//---------------------------------------------------


// TWO `node liri.js spotify-this-song '<song name here>'`

//      * Artist(s)
//      * The song's name
//      * A preview link of the song from Spotify
//      * The album that the song is from

//    * If no song is provided then your program will default to "The Sign" by Ace of Base.
   
//    * You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.
   
//    * Like the Twitter API, the Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a **client id** and **client secret**:

//    * Step One: Visit <https://developer.spotify.com/my-applications/#!/>
   
//    * Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.

//    * Step Three: Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.

//    * Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the [node-spotify-api package](https://www.npmjs.com/package/node-spotify-api).


// THREE    * `movie-this`
//     `node liri.js movie-this '<movie name here>'`

//    * This will output the following information to your terminal/bash window:

//      ```
//        * Title of the movie.
//        * Year the movie came out.
//        * IMDB Rating of the movie.
//        * Rotten Tomatoes Rating of the movie.
//        * Country where the movie was produced.
//        * Language of the movie.
//        * Plot of the movie.
//        * Actors in the movie.
//      ```

//    * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
     
//      * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>
     
//      * It's on Netflix!
   
//    * You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.

// FOUR    * `do-what-it-says`
//     `node liri.js do-what-it-says`
   
//    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
     
//      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
     
//      * Feel free to change the text in that document to test out the feature for other commands.
