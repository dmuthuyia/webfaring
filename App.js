/**
 developer: Dennis Muthuyia  
 email:  dmuthuyia@gmail.com
 */

import React, {Component} from 'react';
import {StyleSheet, View, StatusBar, Button, Text} from 'react-native';

import {createSwitchNavigator, createAppContainer} from 'react-navigation';

import Splashnav from './src/pages/splashnav';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#020202" barStyle="light-content" />
        <Splashnav />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#daf30b',
    flex: 1,
  },
});
