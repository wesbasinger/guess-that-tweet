var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var GameBox = require('./components/GameBox');

var App = React.createClass({

  getInitialState: function() {
    return {
      ready: false,
      gameObjs: null
    }
  },

  handleClick: function(e) {
    var currQuestion = this.state.gameObjs[0];
    if(e.target.value == currQuestion.correctUser) {
      console.log("correct");
    } else {
      console.log("incorrect");
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
          gameObj.bogusUserOne = screenNames[Math.floor(Math.random() * screenNames.length)];
          gameObj.bogusUserTwo = screenNames[Math.floor(Math.random() * screenNames.length)];
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
    } else {
      return(
        <GameBox gameObjs={this.state.gameObjs} onClickEvent={this.handleClick}/>
      )
    }
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('shell')
);
