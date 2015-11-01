import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { GAME_STATE } from '../../constants';

// Actions
import GameActions from '../../actions/game';

// Components
import Game from '../game';
import Splash from '../splash';
import Summary from '../summary';

export default class Application extends React.Component {
  static propTypes = {
    // From redux state
    gameState: PropTypes.string.isRequired,
  }

  render() {
    switch(this.props.gameState) {
      case GAME_STATE.PRE_GAME:
        return <Splash />;
      case GAME_STATE.COMPLETED:
        return <Summary />;
      default:
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
