import React, { PropTypes } from 'react';
import pluck from 'lodash/collection/pluck';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TILE_MOVEMENT, TILE_PANEL_TYPE } from '../../constants';

// Actions
import tilesActions from '../../actions/tiles';

// Components
import TilePanel from '../../components/tile-panel';

export default class Application extends React.Component {
  static propTypes = {
    // From redux state
    actions: PropTypes.object.isRequired,
    attempt: PropTypes.array.isRequired,
    jumble: PropTypes.array.isRequired,
    score: PropTypes.number.isRequired,
    timeRemaining: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);

    this.onClearHandler = this.onClearHandler.bind(this);
    this.onKeydownHandler = this.onKeydownHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.onKeydownHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeydownHandler);
  }

  onClearHandler() {
    this.props.actions.tiles.clearAttempt();
  }

  onKeydownHandler(event) {
    // If any modifier keys are being pressed then return
    if (event.altKey || event.ctrlKey || event.metaKey) {
      return;
    }

    event.preventDefault();
    const { attempt, jumble } = this.props;

    const keyCode = event.keyCode || event.which;
    if (!keyCode) { return; }

    switch(keyCode) {
      case 13: // Enter
        if (this.props.attempt.length > 0) {
          this.submitAttempt();    
        }
        break;
      case 8: // Backspace
        if (this.props.attempt.length > 0) {
          this.props.actions.tiles.touchTile(this.props.attempt.length - 1, TILE_MOVEMENT.RETURN_TO_JUMBLE);
        }
        break;
      default:
        const characterPressed = String.fromCharCode(keyCode);

        // Loop through the jumble and see if there are any tiles with values the same as the key pressed
        for (let i = 0, len = jumble.length; i < len; i++) {
          const tile = jumble[i];

          if (tile.value.toLowerCase() === characterPressed.toLowerCase()) {
            this.props.actions.tiles.touchTile(i, TILE_MOVEMENT.ADD_TO_ATTEMPT);
            break;
          }
        }
    }
  }

  onSubmitHandler(event) {
    event.preventDefault();
    this.submitAttempt();
  }

  submitAttempt() {
    const submission = pluck(this.props.attempt, 'value').join('');
    this.props.actions.tiles.submitAttempt(submission);
  }

  render() {
    const { actions, attempt, jumble, score, timeRemaining } = this.props;

    return (
      <div>
        <p>Time remaining: <span id="timer">{timeRemaining}</span></p>
        <p>Your score: <span id="score">{score}</span></p>

        <TilePanel actions={actions} tiles={attempt} type={TILE_PANEL_TYPE.ATTEMPT} />
        <TilePanel actions={actions} tiles={jumble} type={TILE_PANEL_TYPE.JUMBLE} />
        
        <button type="button" name="submit" onClick={this.onSubmitHandler}>Submit</button>
        <button type="button" name="clear" onClick={this.onClearHandler}>Clear</button>

        <ul id="word-list"></ul>
      </div>
    );
  }
} 

function mapStateToProps(state) {
  return {
    attempt: state.tiles.attempt,
    jumble: state.tiles.jumble,
    score: state.score.score,
    timeRemaining: state.time.timeRemaining,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      tiles: bindActionCreators(tilesActions, dispatch),
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Application);
