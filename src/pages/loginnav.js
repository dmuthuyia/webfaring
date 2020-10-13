/**
 developer: Dennis Muthuyia  
 email:  dmuthuyia@gmail.com
 */

import React, {Component} from 'react';

import {createSwitchNavigator, createAppContainer} from 'react-navigation';

import boukdLogin from './login';
import boukdSignup from './signup';
import Dashboard from './dashboard';
//import accountAction from './accountActiona';

//--------NAVIGATORS ---------------------------------------------------

const loginwitchNavigator = createSwitchNavigator(
  {
    //AccountAction: {screen: accountAction},
    Login: {screen: boukdLogin},
    Signup: {screen: boukdSignup},
    Dashboard: {screen: Dashboard},
  },
  {
    initialRouteName: 'Login',
  },
);

//--------NAVIGATOR CONTAINER 1 ---------------------------------------------------

const loginContainer = createAppContainer(loginwitchNavigator);
export default loginContainer;
