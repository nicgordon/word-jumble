import React, { PropTypes } from 'react';
import style from './tile.styl';

export default class Tile extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    movement: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      selected: false,
    };

    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler() {
    if (this.props.value) {
      this.props.actions.tile.touchTile(this.props.index, this.props.movement);
    }
  }

  render() {
    return (
      <div className={style.default} onClick={this.onClickHandler}>
        {this.props.value.toUpperCase()}
      </div>
    );
  }
}