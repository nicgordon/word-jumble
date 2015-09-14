import React, { PropTypes } from 'react';

export default class Application extends React.Component {
  static propTypes = {

  }

  render() {
    return (
      <div>
        <p id="jumble"></p>
        <p>Time remaining: <span id="timer"></span></p>
        <p>Your score: <span id="score"></span></p>
        <input name="solution" type="text" />
        <button name="submit">Submit</button>
        <button name="clear">Clear</button>
        <ul id="word-list"></ul>
      </div>
    );
  }
}
