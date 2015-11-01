import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

class Summary extends React.Component {
  static propTypes = {
    score: PropTypes.number.isRequired,
  }

  render() {
    return (
      <div>
        Congrats mate, your score was {this.props.score}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    score: state.score.score,
  };
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
)(Summary);
