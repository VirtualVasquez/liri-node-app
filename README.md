# Trivia Game
Week 10 Assignment: LIRI Bot

## About LIRI Bot

This is an assignment that was given during the tenth week of University of Miami Coding bootcamp. LIRI, or Language Interpretation and Recognition Interface, is a command line node app capable of displaying the last twenty tweets from the linked Twitter account (a sample account, in this case), search for song information from Spotify from a submitted track query, or generate movie information from the OMDB API.

**NOTE:** You will need need API keys of your own to make the application work.

## How to Use LIRI

To be able to utilize LIRI in the terminal/bash window, the following commands must be input.

**Commands**

* node liri.js my-tweets
	* Shows the last 20 tweets and date of creation in the terminal/bash window

* node liri.js spotify-this-song '<song name here>'
	* In the terminal/bash window, the following infomrmation about the song will be displayed
		* Artist(s)
		* The song's name
		* A preview link of the song from Spotify
		* The album of origin
	* If no song is submitted, the default search term is "The Sign"

* node liri.js movie-this '<movie name here>'
	* This command generates the following information, in order
		   * Title of the movie.
   		   * Year the movie came out.
           * IMDB Rating of the movie.
           * Rotten Tomatoes Rating of the movie.
           * Country where the movie was produced.
           * Language of the movie.
           * Plot of the movie.
           * Actors in the movie.
	* If no movie title is submitted, the default movie it will search is 'Mr. Nobody'

* node liri.js do-what-it-says
	* LIRI reads the text of the file random.txt, and use it to call one of LIRI's commands.
		* Only one is in the file, which should run "spotify-this-song" of "I Want it That Way"

## Purpose

The purpose of this was to learn how about Node.JS, how it works, and how to use it. It was also to learn about npm packages that are utilzed in Node.JS to draw information and functionality from other web applications. The main benefits from this assignment was learning how to read documents from new or unfamiliar applications, and that experimentation is needed to see how they work as needed.

## Node Packages used

* [Twitter](https://www.npmjs.com/package/twitter)

* [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)

* [Request](https://www.npmjs.com/package/request)
	* This is used to get data from the [OMDB API](http://www.omdbapi.com/)
		*

* [DotEnv](https://www.npmjs.com/package/dotenv)