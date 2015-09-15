import React, { PropTypes } from 'react';
import Tile from '../../components/tile';

export default class Application extends React.Component {
  static propTypes = {

  }

  render() {
    const tiles = 'chicken'.split('').map((letter, index) => {
      return <Tile value={letter} key={index} />;
    });

    return (
      <div>
        <div id="jumble">{tiles}</div>
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
