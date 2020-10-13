import React, {Component} from 'react';
import {StyleSheet, Text, View, Animated, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
//import { NavigationActions } from "react-navigation";

import Assets from '../assets/assets';

const h = Dimensions.get('window').height;
const height = h * 2;

export default class SplashScreen extends Component {
  circle = new Animated.Value(0);
  logo = new Animated.Value(0);
  title = new Animated.Value(0);
  box1 = new Animated.Value(0);

  componentDidMount() {
    Animated.sequence([
      Animated.timing(this.circle, {
        toValue: 1,
        duration: 2000,
      }),

      Animated.timing(this.logo, {
        toValue: 1,
        duration: 1000,
      }),

      Animated.timing(this.title, {
        toValue: 1,
        duration: 2000,
      }),

      Animated.timing(this.box1, {
        toValue: 1,
        duration: 2000,
      }),
    ]).start();

    this.timeoutHandle = setTimeout(() => {
      // Add your logic for the transition
      //this.setState({component: <Defis />});
      this._loadData();
      //this.props.navigation.navigate('AccountAction');
    }, 9000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutHandle);
  }

  _loadData = async () => {
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    this.props.navigation.navigate(
      isLoggedIn !== 'Yes' ? 'Login' : 'Dashboard',
    );
  };

  render() {
    const translateY = this.circle.interpolate({
      inputRange: [0, 1],
      outputRange: [-height, 0],
    });

    const tranY = this.logo.interpolate({
      inputRange: [0, 1],
      outputRange: [h, 0],
    });

    const opacity = this.title.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      color: 'green',
    });

    const opacity2 = this.title.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    });

    const paintxy1 = this.box1.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    });

    return (
      <View style={styles.cont}>
        <Animated.Image source={Assets.logo} style={[styles.icon, {opacity}]} />

        <Animated.Text style={{color: '#8be487', fontSize: 16, opacity}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cont: {
    backgroundColor: '#020202',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titles: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  circle: {
    width: height,
    height,
    backgroundColor: '#020202',
    borderRadius: h,
    position: 'absolute',
    zIndex: -1,
    borderWidth: 12,
    borderColor: 'red',
  },
  box1: {
    width: height,
    height,
    backgroundColor: '#020202',
    position: 'absolute',
    zIndex: -1,
    borderWidth: 12,
    borderColor: '#4c1037',
  },
  icon: {
    width: 300,
    height: 300,
    /*borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',*/
  },
  buttonCont: {
    backgroundColor: 'red',
  },
  buttonContainer: {
    bottom: 0,
    position: 'absolute',
    backgroundColor: '#4c1037',
    paddingVertical: 5,
    textAlign: 'center',
    width: '100%',
  },
  buttonText: {
    textAlign: 'center',
    color: '#020202',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
