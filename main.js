var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var GameBox = require('./components/GameBox');
var Scoreboard = require('./components/Scoreboard');

var App = React.createClass({

  getInitialState: function() {
    return {
      ready: false,
      gameObjs: null,
      score: 0,
      message: null
    }
  },

  handleClick: function(e) {
    var currQuestion = this.state.gameObjs[0];
    if(e.target.value == currQuestion.correctUser) {
      var currScore = parseInt(this.state.score)
      var incScore = currScore + 1;
      this.setState({score: incScore});
      this.setState({message: "Correct!"});
    } else {
      this.setState({message: "Incorrect! it was actually " +
                    currQuestion.correctUser});
    }
    var cp = this.state.gameObjs;
    cp.shift();
    this.setState({gameObjs:cp});
  },

  componentDidMount() {
    $.ajax({
      url: 'api/tweets',
      dataType: 'json',
      cache: false,
      success: function(data) {
        var gameObjs = [];
        var screenNames = [];
        data.forEach(function(tweet) {
          if (screenNames.indexOf(tweet.user) == -1) {
              screenNames.push(tweet.user);
          }
          gameObjs.push({
            correctUser: tweet.user,
            text: tweet.tweet
          })
        });
        gameObjs.forEach(function(gameObj) {
          var cp = screenNames.slice()
          var correctUserIndex = cp.indexOf(gameObj.correctUser);
          cp.splice(correctUserIndex, 1)
          gameObj.bogusUserOne = cp[Math.floor(Math.random() * cp.length)];
          var bogusUserOneIndex = cp.indexOf(gameObj.bogusUserOne)
          cp.splice(bogusUserOneIndex, 1)
          gameObj.bogusUserTwo = cp[Math.floor(Math.random() * cp.length)];
        })
        this.setState({gameObjs: gameObjs});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });
  },

  onYesButtonClick: function(e) {
    this.setState({ready: true});
  },

  render: function() {
    if (!this.state.ready) {
      return(
        <div>
          <h1>Are you ready to play?</h1>
          <button onClick={this.onYesButtonClick}>Yes</button>
        </div>
      )
    } else if (this.state.ready && this.state.gameObjs) {
      return(
        <div>
        <Scoreboard score={this.state.score} />
        <GameBox message={this.state.message}
                 gameObjs={this.state.gameObjs}
                 onClickEvent={this.handleClick}/>
        </div>
      )
    } else {
      return(
        <div>
          <p>Game objects still loading...  Try again.</p>
          <button onClick={this.onYesButtonClick}>Try Again</button>
        </div>
      )
    }
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('shell')
);
