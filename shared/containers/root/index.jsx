import React, { Component, PropTypes } from 'react';

import { Provider } from 'react-redux';
import Application from '../application';

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object,
  };

  render() {
    const { store } = this.props;

    return (
      <div>
        <Provider store={this.props.store}>
          <Application />
        </Provider>
      </div>
    );
  }
}
