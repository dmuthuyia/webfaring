/**
 developer: Dennis Muthuyia  
 email:  dmuthuyia@gmail.com
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Image,
} from 'react-native';

import Assets from '../assets/assets';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Buttn extends Component {
  state = {
    animation: new Animated.Value(0),
  };

  toggleOpen = () => {
    const toValue = this._open ? 0 : 1;
    Animated.timing(this.state.animation, {
      toValue,
      duration: 200,
    }).start();
    this._open = !this._open;
  };

  alt = () => {
    alert('hello');
  };

  render() {
    const bgstyle = {
      transform: [
        {
          scale: this.state.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 30],
          }),
        },
      ],
    };

    const watchStyle = {
      transform: [
        {scale: this.state.animation},
        {
          translateY: this.state.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -70],
          }),
        },
      ],
    };

    const photoStyle = {
      transform: [
        {scale: this.state.animation},
        {
          translateY: this.state.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -140],
          }),
        },
      ],
    };

    const liveStyle = {
      transform: [
        {scale: this.state.animation},
        {
          translateY: this.state.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -210],
          }),
        },
      ],
    };

    const labelPositionInterpolate = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -60],
    });

    const opacityInterpolate = this.state.animation.interpolate({
      inputRange: [0, 0.8, 1],
      outputRange: [0, 0, 1],
    });

    const labelStyle = {
      opacity: opacityInterpolate,
      transform: [
        {
          translateX: labelPositionInterpolate,
        },
      ],
    };

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.background, bgstyle]} />

        <TouchableWithoutFeedback>
          <Animated.View style={[styles.button, styles.other, liveStyle]}>
            <Animated.Text style={[styles.label, labelStyle]}>
              Live
            </Animated.Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('lsLive')}>
              <Image
                source={Assets.connectliftLive}
                style={{height: 30, width: 30}}
              />
            </TouchableOpacity>
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback>
          <Animated.View style={[styles.button, styles.other, photoStyle]}>
            <Animated.Text style={[styles.label, labelStyle]}>
              Photo
            </Animated.Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('lsPhoto')}>
              <Icon name="google-photos" size={40} color="orange" />
            </TouchableOpacity>
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback>
          <Animated.View style={[styles.button, styles.other, watchStyle]}>
            <Animated.Text style={[styles.label, labelStyle]}>
              Watch
            </Animated.Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('lsWatch')}>
              <Icon name="youtube-tv" size={40} color="red" />
            </TouchableOpacity>
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={this.toggleOpen}>
          <View style={[styles.button, styles.pay]}>
            <Image source={Assets.bkdbtnset} style={{height: 60, width: 60}} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    backgroundColor: 'black',
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    bottom: 20,
    right: 20,
    opacity: 0.4,
  },
  button: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#333',
    shadowOpacity: 0.1,
    shadowOffset: {x: 2, y: 0},
    shadowRadius: 2,
    borderRadius: 30,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  pay: {
    backgroundColor: 'blue',
  },
  other: {
    backgroundColor: 'purple',
  },
  payText: {
    color: '#fff',
  },
  label: {
    color: 'yellow',
    position: 'absolute',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
});
