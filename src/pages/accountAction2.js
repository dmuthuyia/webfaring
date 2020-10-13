/*This is an Example of React Native Rotate Image View Using Animation*/
import React from 'react';
//import react in our project
import {
  StyleSheet,
  View,
  Animated,
  Image,
  Easing,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
//import all the components we needed
import Assets from '../assets/assets';

export default class AccountAction extends React.Component {
  constructor() {
    super();
    this.RotateValueHolder = new Animated.Value(0);
  }
  componentDidMount() {
    this.RotateValueHolder.setValue(0);
    Animated.timing(this.RotateValueHolder, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
    }).start();
  }

  render() {
    const RotateData = this.RotateValueHolder.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    return (
      <View style={styles.container}>
        <View>
          <Animated.View
            style={{
              color: '#fff',
              fontSize: 12,

              transform: [{rotate: RotateData}],
            }}>
            <ImageBackground
              source={Assets.plateB}
              style={{width: 300}}
              imageStyle={{
                resizeMode: 'contain', // works only here!
              }}>
              <View style={{width: 300}}>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={this.loginUser}>
                  <Text
                    style={{
                      width: 300,
                      height: 150,
                      textAlign: 'center',
                      paddingTop: 80,
                      fontSize: 18,
                    }}>
                    Straight to order
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row', width: 400}}>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={this.loginUser}>
                  <Text
                    style={{
                      width: 150,
                      height: 150,
                      right: 20,
                      top: 60,
                      textAlign: 'right',
                      fontSize: 20,
                    }}>
                    Sign up
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={this.loginUser}>
                  <Text
                    style={{
                      width: 200,
                      height: 200,
                      left: 20,
                      top: 60,
                      marginRight: 20,
                      fontSize: 18,
                    }}>
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
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
