import React, { PropTypes } from 'react';

export default class Summary extends React.Component {
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
