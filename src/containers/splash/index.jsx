import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { GAME_STATE } from '../../constants';

// Actions
import GameActions from '../../actions/game';

// Components
import Button from '../../components/button';

import dictionary from '../../models/dictionary';

export default class Splash extends React.Component {
  static propTypes = {
    // From redux state
    actions: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.startButtonClickHandler = this.startButtonClickHandler.bind(this);
  }

  startButtonClickHandler() {
    this.props.actions.game.changeGameState(GAME_STATE.UNDERWAY);
  }

  testButtonClickHandler() {
    console.log('loading words');
    dictionary.loadWords();
  }

  render() {
    return (
      <div>
        <Button onClick={this.startButtonClickHandler} theme="big">Start game</Button>
        <Button onClick={this.testButtonClickHandler} theme="big">Load Words</Button>
      </div>
    );
  }
} 

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      game: bindActionCreators(GameActions, dispatch),
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Splash);
