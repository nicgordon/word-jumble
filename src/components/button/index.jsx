import React, { PropTypes } from 'react';
import classnames from 'classnames';

// Style
import style from './button.css';

export default class Button extends React.Component {
  static propTypes = {
    children: PropTypes.string,
    theme: PropTypes.string,
  }

  render() {
    const { children, theme, ...otherProps } = this.props;
    const classes = classnames([
      style.button,
      style[theme],
    ]);

    return <button {...otherProps} type="button" className={classes}>{children}</button>;
  }
}