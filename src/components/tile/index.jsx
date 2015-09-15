import React, { PropTypes } from 'react';
import style from './tile.css';

export default class Tile extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      selected: false,
    };
  }

  render() {
    return (
      <div className={style.default}>
        {this.props.value.toUpperCase()}
      </div>
    );
  }
}