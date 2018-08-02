import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { GAME_STATE } from '_constants';

import socket from '../../../client/lib/socket-io';

// Actions
import GameActions from '../../actions/game';

// Components
import Button from '../../components/button';

import dictionary from '../../services/dictionary';

class Splash extends React.Component {
  static propTypes = {
    // From redux state
    actions: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.startButtonClickHandler = this.startButtonClickHandler.bind(this);
    this.sendMessageHandler = this.sendMessageHandler.bind(this);
  }

  startButtonClickHandler() {
    this.props.actions.game.changeGameState(GAME_STATE.UNDERWAY);
  }

  testButtonClickHandler() {
    console.log('loading words');
    dictionary.loadWords();
  }

  sendMessageHandler() {
    console.log('sent:', this.refs.message.value);
    socket.emit('chat message', this.refs.message.value);
  }

  render() {
    return (
      <div>
        <Button onClick={this.startButtonClickHandler} theme="big">Start game</Button>
        <Button onClick={this.testButtonClickHandler} theme="big">Load Words</Button>

        <input type="text" ref="message" name="message" />
        <Button onClick={this.sendMessageHandler} theme="small">Send</Button>
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
