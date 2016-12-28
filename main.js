var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var App = React.createClass({

  getInitialState: function() {
    return {
      ready: false,
      score: 0,
      name: null,
      highScore: null,
      tweets: null
    }
  },

  componentDidMount() {
    $.ajax({
      url: 'api/tweets',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({tweets: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });
  },

  render: function() {
    if (!this.state.ready) {
      return(
        <div>
          <h1>Are you ready to play?</h1>
          <button>Yes</button>
        </div>
      )
    } else {
      return(
        <div>You must be ready!</div>
      )
    }
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('shell')
);
