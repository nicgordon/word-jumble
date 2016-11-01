import React, { PropTypes } from 'react';
import { TILE_MOVEMENT, TILE_PANEL_TYPE } from '_constants';

// Components
import Tile from '../tile';

// Style
import style from './tile-panel.styl';

export default class TilePanel extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    tiles: PropTypes.array,
    type: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      selected: false,
    };
  }

  render() {
    const { actions, type } = this.props;
    const tileMovement = (type === TILE_PANEL_TYPE.ATTEMPT) ? TILE_MOVEMENT.RETURN_TO_JUMBLE : TILE_MOVEMENT.ADD_TO_ATTEMPT;
    const tiles = this.props.tiles.map((tile, index) => {
      return tile.value ? (
        <Tile {...tile} actions={actions} index={index} key={index} movement={tileMovement} />
      ) : (
        <div key={index} className={style.tilePlaceholder}></div>
      );
    });

    return (
      <div className={style.default}>
        {tiles}
      </div>
    );
  }
}