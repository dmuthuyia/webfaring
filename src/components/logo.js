/**
 developer: Dennis Muthuyia  
 email:  dmuthuyia@gmail.com
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Assets from '../assets/assets';

export default class Logo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={Assets.logo} style={styles.logo} />
        <Text style={styles.logoText} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 150,
    //borderRadius: 20,
    //borderWidth: 1,
    //borderColor: '#fff',
  },
  logoText: {
    marginVertical: 15,
    fontSize: 18,
    color: 'rgba(255,255,255,0.7)',
  },
});
