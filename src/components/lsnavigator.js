import React, {Component} from 'react';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

import Assets from '../assets/assets';

import Live from './live';
import Lvstream from './lvstream';
import Photo from './photo';
import Watch from './watch';
import Buttn from './buttn';

export default class Sn extends Component {
  render() {
    return <AppContainer />;
  }
}

const MyNavigator = createSwitchNavigator({
  lsLvstream: Lvstream,
  lsLive: Live,
  lsPhoto: Photo,
  lsWatch: Watch,
});

const AppContainer = createAppContainer(MyNavigator);
