import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Jumble from '../../components/jumble';

export default class Application extends React.Component {
  static propTypes = {
    jumble: PropTypes.array,
    solution: PropTypes.array,
  }

  render() {
    return (
      <div>
        <p>Time remaining: <span id="timer"></span></p>
        <p>Your score: <span id="score"></span></p>
        <Jumble tiles={this.props.jumble} />
        <input name="solution" type="text" />
        <button name="submit">Submit</button>
        <button name="clear">Clear</button>
        <ul id="word-list"></ul>
      </div>
    );
  }
} 

const mapStateToProps = state => ({
  jumble: state.tiles.jumble,
  solution: state.tiles.solution,
});

export default connect(mapStateToProps)(Application);