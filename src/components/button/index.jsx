import React, { PropTypes } from 'react';
import style from './button.css';

export default class Button extends React.Component {
  static propTypes = {
    children: PropTypes.string,
  }

  render() {
    const { children, ...otherProps } = this.props;
    return <button {...otherProps} type="button" className={style.button}>{children}</button>;
  }
}