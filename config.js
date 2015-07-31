var lang = window.navigator.language;

// Default Language
var lang = "en";

var weatherParams = {
	'q': 'New York, US',
	'units': 'metric',
	'lang': lang,
	'weatherRefresh': 600000,
	'forecastRefresh': 18000000
};

var messages = {
	'show': true,
	'refresh': 60000,
	'data': [
		'Hello, There!',
		'Hey Sexy!',
		'You, Look like the spouse I always dreamed of',
		'Hey..... You!',
		'Looking like a winner today',
		'Enjoy your day!'
	]
};

var newsfeed = {
	'show': true,
	'url': 'http://rss.cnn.com/rss/cnn_topstories.rss',
	'limit': 10,
	'refresh': 20000
};