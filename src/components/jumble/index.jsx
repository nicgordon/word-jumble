import React, { PropTypes } from 'react';
import style from './jumble.css';
import Tile from '../tile';

export default class Jumble extends React.Component {
  static propTypes = {
    tiles: PropTypes.array,
  }

  constructor(props) {
    super(props);

    this.state = {
      selected: false,
    };
  }

  render() {
    const tiles = this.props.tiles.map(tile => {
      return tile.value ? <Tile {...tile} /> : <div className={style.tilePlaceholder}></div>;
    });

    return (
      <div className={style.default}>
        {tiles}
      </div>
    );
  }
}