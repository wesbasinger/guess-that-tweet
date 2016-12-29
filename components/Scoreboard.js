var React = require('react');

var Scoreboard = React.createClass({

  getDefaultProps: function() {
    return {
      score: 0
    }
  },

  render: function() {
    return(
      <div>
        Current Score: {this.props.score}
      </div>
    )
  }

});

module.exports = Scoreboard;
