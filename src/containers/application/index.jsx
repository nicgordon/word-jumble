import React, { PropTypes } from 'react';
import pluck from 'lodash/collection/pluck';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TILE_PANEL_TYPE } from '../../constants';

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
  }

  constructor(props) {
    super(props);

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onClearHandler() {
    this.props.actions.tiles.clearAttempt();
  }

  onSubmitHandler(event) {
    event.preventDefault();

    const submission = pluck(this.props.attempt, 'value').join('');
    this.props.actions.tiles.submitAttempt(submission);
  }

  render() {
    const { actions, attempt, jumble } = this.props;

    return (
      <div>
        {this.props.testing}
        <p>Time remaining: <span id="timer"></span></p>
        <p>Your score: <span id="score"></span></p>

        <TilePanel actions={actions} tiles={attempt} type={TILE_PANEL_TYPE.ATTEMPT} />
        <TilePanel actions={actions} tiles={jumble} type={TILE_PANEL_TYPE.JUMBLE} />
        
        <form onSubmit={this.onSubmitHandler}>
          <button type="submit" name="submit">Submit</button>
          <button type="button" name="clear">Clear</button>
        </form>
        <ul id="word-list"></ul>
      </div>
    );
  }
} 

function mapStateToProps(state) {
  return {
    attempt: state.tiles.attempt,
    jumble: state.tiles.jumble,
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
