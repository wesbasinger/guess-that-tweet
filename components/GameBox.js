var React = require('react');

function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}

var GameBox = React.createClass({

  render: function() {

    var currQuestion = this.props.onGameObjRequest();

    var choices = [currQuestion.correctUser, currQuestion.bogusUserOne, currQuestion.bogusUserTwo];

    shuffle(choices);

    const numbers = [1, 2, 3]

    return(
      <div>
        <h1>Guess the Twitter user...</h1>
        <blockquote>{currQuestion.text}</blockquote>
        {choices.map(function(choice) {
          return(
              <button value={choice} key={numbers.pop()}>{choice}</button>
          )
        })}
      </div>
    )
  }
})

module.exports = GameBox;
