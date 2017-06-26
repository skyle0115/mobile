import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
import AppWithNavigationState from './navigators/AppNavigator';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export default class App extends Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
