var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var GameBox = require('./components/GameBox');

var App = React.createClass({

  getInitialState: function() {
    return {
      ready: false,
      score: 0,
      name: null,
      highScore: null,
      tweets: null,
      users:  null
    }
  },

  componentDidMount() {
    $.ajax({
      url: 'api/tweets',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({tweets: data});
        var screenNames = [];
        data.forEach(function(tweet) {
          if (screenNames.indexOf(tweet.user) == -1) {
              screenNames.push(tweet.user);
          }
        });
        this.setState({users: screenNames});
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
        <GameBox tweets={this.state.tweets} users={this.state.users}/>
      )
    }
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('shell')
);
