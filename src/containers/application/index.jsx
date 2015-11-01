import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { GAME_STATE } from '../../constants';

// Actions
import GameActions from '../../actions/game';

// Components
import Game from '../game';
import Splash from '../splash';

export default class Application extends React.Component {
  static propTypes = {
    // From redux state
    gameState: PropTypes.string.isRequired,
  }

  render() {
    if (this.props.gameState === GAME_STATE.PRE_GAME) {
      return <Splash />;
    } else {
      return <Game />;
    }
  }
} 

function mapStateToProps(state) {
  return {
    gameState: state.game.state,
  };
}

export default connect(
  mapStateToProps
)(Application);
