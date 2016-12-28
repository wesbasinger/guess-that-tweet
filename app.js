
var express = require('express');
var app = express();

var tweets = require('./tweets')

app.use(express.static('public'))

var port = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

app.get('/api/tweets', function(err, res) {
  tweets(function(objs) {
    res.json(objs);
  });
});

app.listen(port, function() {
	console.log('Listening on port ' + port);
});
