import React, { PropTypes } from 'react';

export default class WordList extends React.Component {
  static propTypes = {
    words: PropTypes.array,
  }

  render() {
    const words = this.props.words.map(word => <li>{word}</li>);

    return (
      <ul>
        {words}
      </ul>
    );
  }
}