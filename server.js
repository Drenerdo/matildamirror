var http   	   = require('http'),
	static 	   = require('node-static'),
	url    	   = require('url'),
	rq     	   = require('request'),
	path   	   = require('path'),
	google 	   = require('googleapis'),
	googleapis = require('google-auth-library'),
	fs 		   = require('fs'),
	express    = require('express'),
	twitter    = require('twitter');

var app = express();

var config = require("envy").load(__dirname + '/node.config.json');

// var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

// Twitter API
// var tw = new Twitter(config.twitter);


var file = new static.Server('./');

app.get('/api/tweets', function(req, res) {
  tw.get('statuses/user_timeline', {count: 65, include_entities: false}, function(err, tweets, response) {
    if(err) {
      console.error(err);
    } else {
      res.json(tweets);
    }
  });
});

function onRequest(request, response) {
	console.log("Request recevied");
	var pathname = url.parse(request.url).pathname;
	console.log("Pathname: "+pathname);

	if(pathname === "/proxy") {
		var query = url.parse(request.url, true).query;
		if(query.url !== undefined) {
			rq.get(request.url, function(error, res, body){
				if(!error && res.statusCode == 200) {
					response.writeHead(200, {"Access-Control-Allow-Origin": "*"});
					response.end(body);
					console.log("Proxied => " + query.url);
				}
				else {
					console.log(error);
				}
			});
		}
		else {
			console("/proxy missing url parameter");
		}
	}
	else {
		file.serve(request, response);
	}
	console.log("Response ended");
}

http.createServer(onRequest).listen(config.port);
console.log(process.env.NODE_ENV + " server has started at port" + config.port + ".");
