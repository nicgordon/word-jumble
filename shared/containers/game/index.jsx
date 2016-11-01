import React, { PropTypes } from 'react';
import Tock from 'tocktimer';
import map from 'lodash/map';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { GAME_STATE, TILE_MOVEMENT, TILE_PANEL_TYPE } from '_constants';

// Actions
import GameActions from '../../actions/game';
import TileActions from '../../actions/tile';
import TimeActions from '../../actions/time';

// Components
import Button from '../../components/button';
import TilePanel from '../../components/tile-panel';
import WordList from '../../components/word-list';

class Game extends React.Component {
  static propTypes = {
    // From redux state
    actions: PropTypes.object.isRequired,
    attempt: PropTypes.array.isRequired,
    jumble: PropTypes.array.isRequired,
    score: PropTypes.number.isRequired,
    timeRemaining: PropTypes.number.isRequired,
    words: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props);

    this.onClearHandler = this.onClearHandler.bind(this);
    this.onKeydownHandler = this.onKeydownHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onTimerComplete = this.onTimerComplete.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.onKeydownHandler);

    this.timer = new Tock({
      callback: this.props.actions.time.timerTick,
      complete: this.onTimerComplete,
      countdown: true,
      interval: 1000,
    });

    // Convert timeRemaining to mm:ss
    const minutes = Math.floor(this.props.timeRemaining / 60);
    const seconds = Math.floor(this.props.timeRemaining % 60);
    const pad = number => number < 10 ? ('0' + number) : number;
    const formattedTime = `${pad(minutes)}:${pad(seconds)}`;
    this.timer.start(formattedTime);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeydownHandler);
  }

  onClearHandler() {
    this.props.actions.tile.clearAttempt();
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
          this.props.actions.tile.touchTile(this.props.attempt.length - 1, TILE_MOVEMENT.RETURN_TO_JUMBLE);
        }
        break;
      default:
        const characterPressed = String.fromCharCode(keyCode);

        // Loop through the jumble and see if there are any tile with values the same as the key pressed
        for (let i = 0, len = jumble.length; i < len; i++) {
          const tile = jumble[i];

          if (tile.value.toLowerCase() === characterPressed.toLowerCase()) {
            this.props.actions.tile.touchTile(i, TILE_MOVEMENT.ADD_TO_ATTEMPT);
            break;
          }
        }
    }
  }

  onSubmitHandler(event) {
    event.preventDefault();
    this.submitAttempt();
  }

  onTimerComplete() {
    this.props.actions.game.changeGameState(GAME_STATE.COMPLETED);
  }

  submitAttempt() {


    const submission = map(this.props.attempt, 'value').join('');
    this.props.actions.tile.submitAttempt(submission);
  }

  render() {
    const { actions, attempt, jumble, score, timeRemaining, words } = this.props;

    return (
      <div>
        <p>Time remaining: <span id="timer">{timeRemaining}</span></p>
        <p>Your score: <span id="score">{score}</span></p>

        <TilePanel actions={actions} tiles={attempt} type={TILE_PANEL_TYPE.ATTEMPT} />
        <TilePanel actions={actions} tiles={jumble} type={TILE_PANEL_TYPE.JUMBLE} />
        
        <Button onClick={this.onSubmitHandler}>Submit</Button>
        <Button onClick={this.onClearHandler}>Clear</Button>

        <WordList words={words} />
      </div>
    );
  }
} 

function mapStateToProps(state) {
  return {
    attempt: state.tile.attempt,
    jumble: state.tile.jumble,
    score: state.score.score,
    timeRemaining: state.time.timeRemaining,
    words: state.score.wordList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      game: bindActionCreators(GameActions, dispatch),
      tile: bindActionCreators(TileActions, dispatch),
      time: bindActionCreators(TimeActions, dispatch),
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
