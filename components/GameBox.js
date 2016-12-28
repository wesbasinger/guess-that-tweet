var React = require('react');

var GameBox = React.createClass({
  render: function() {
    return(
      <div>
        <Header />
        <Tweet />
      </div>
    )
  }
})

var Tweet = React.createClass({
  render: function() {
    return(
      <div>
        This is a Tweet
      </div>
    )
  }
})

var Header = React.createClass({
  render: function() {
    return(
      <div>
        This is a Header
      </div>
    )
  }
})

module.exports = GameBox;
