var fs = require('fs');


var Twitter = require("twitter");
var Filter = require('bad-words');
var config = require("./config");

function getStudentTweets(callback) {

	var pfilter = new Filter();

	var results = [];

	var client = new Twitter({
		consumer_key : config.consumerKey,
		consumer_secret : config.consumerSecret,
		access_token_key : config.accessToken,
		access_token_secret : config.accessTokenSecret
	});

	var student_file = fs.readFileSync("students.txt", {encoding: 'utf-8'});
	var delim = student_file.split("\n")

	var params = {count : 200};

	client.get('statuses/home_timeline', params, function(err, tweets, res) {
		if(err) {
			console.log(err);
		} else {
			tweets.forEach(function(tweet) {
				delim.forEach(function(name) {
					if(name == tweet.user.screen_name) {
						results.push({"user" : name, "tweet" : pfilter.clean(tweet.text)});
					}
				});
			});
			callback(results);
		}
	})
}

module.exports = getStudentTweets;
