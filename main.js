var React = require('react');
var ReactDOM = require('react-dom');

var App = React.createClass({
  render: function() {
    return(
      <div>This is a React component</div>
    )
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('shell')
);
