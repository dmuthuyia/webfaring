import React, {Component} from 'react';

import {createSwitchNavigator, createAppContainer} from 'react-navigation';

import SplashScreen from './splash';
import boukdLogin from './loginnav';
import boukdDashboard from './dashboard';

//--------NAVIGATORS ---------------------------------------------------

const splashwitchNavigator = createSwitchNavigator(
  {
    SplashScreen: {screen: SplashScreen},
    Login: {screen: boukdLogin},
    boukdDashboard: {screen: boukdDashboard},
  },
  {
    initialRouteName: 'SplashScreen',
  },
);

//--------NAVIGATOR CONTAINER 1 ---------------------------------------------------

const splashContainer = createAppContainer(splashwitchNavigator);
export default splashContainer;
