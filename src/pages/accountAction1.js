/*This is an Example of React Native Rotate Image View Using Animation*/
import React from 'react';
//import react in our project
import {StyleSheet, View, Animated, Image, Easing, Text} from 'react-native';
//import all the components we needed
export default class AccountAction extends React.Component {
  constructor() {
    super();
    this.RotateValueHolder = new Animated.Value(0);
  }
  componentDidMount() {
    this.StartImageRotateFunction();
  }
  StartImageRotateFunction() {
    this.RotateValueHolder.setValue(0);
    Animated.timing(this.RotateValueHolder, {
      toValue: 1,
      duration: 8000,
      easing: Easing.linear,
    }).start(() => this.StartImageRotateFunction());
  }
  render() {
    const RotateData = this.RotateValueHolder.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    return (
      <View style={styles.container}>
        <Animated.Image
          style={{
            width: 200,
            height: 200,
            transform: [{rotate: RotateData}],
          }}
          source={{
            uri:
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png',
          }}
        />
        <View>
          <Text>heyyy</Text>
          <Animated.View
            style={{
              color: '#fff',
              fontSize: 12,
              backgroundColor: 'red',
              transform: [{rotate: RotateData}],
            }}>
            <Text>Hygiene, taste, class, feels like home</Text>
          </Animated.View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C2C2C2',
  },
});
