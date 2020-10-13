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
  Dimensions,
} from 'react-native';
//import all the components we needed
import Assets from '../assets/assets';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const point3H = (40 * HEIGHT) / 100;
const controlsContHeight = (10 * HEIGHT) / 100;
const mains = (50 * WIDTH) / 100;
const sidebars = (25 * WIDTH) / 100;

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
        <View style={{flexDirection: 'row'}}>
          <View style={{width: sidebars, overflow: 'hidden'}}>
            <ImageBackground
              source={Assets.fork}
              style={{width: '100%', height: 300, overflow: 'hidden'}}
              imageStyle={{
                resizeMode: 'contain', // works only here!
              }}
            />
          </View>
          <View style={{width: mains, overflow: 'hidden'}}>
            <Animated.View
              style={{
                color: '#fff',
                fontSize: 12,
                height: 300,
                width: '100%',
                transform: [{rotate: RotateData}],
              }}>
              <ImageBackground
                source={Assets.plateB}
                style={{width: '100%', overflow: 'hidden'}}
                imageStyle={{
                  resizeMode: 'contain', // works only here!
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: mains,
                    height: 140,
                    overflow: 'hidden',
                  }}>
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => this.props.navigation.navigate('Signup')}>
                    <Text
                      style={{
                        width: 150,
                        height: 140,
                        right: 20,
                        top: 70,
                        textAlign: 'right',
                        fontSize: 20,
                        color: 'blue',
                      }}>
                      Sign up
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => this.props.navigation.navigate('Login')}>
                    <Text
                      style={{
                        width: 150,
                        height: 140,
                        left: 20,
                        top: 70,
                        marginRight: 20,
                        fontSize: 18,
                        color: 'blue',
                      }}>
                      Login
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{width: mains, height: 160, overflow: 'hidden'}}>
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => this.props.navigation.navigate('Dashboard')}>
                    <Text
                      style={{
                        width: mains,
                        height: 160,
                        textAlign: 'center',
                        top: 40,
                        fontSize: 18,
                        color: 'blue',
                      }}>
                      Straight to order
                    </Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </Animated.View>
          </View>

          <View style={{width: sidebars, overflow: 'hidden'}}>
            <ImageBackground
              source={Assets.spoon}
              style={{width: '100%', height: 300, overflow: 'hidden'}}
              imageStyle={{
                resizeMode: 'contain', // works only here!
              }}
            />
          </View>
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
    backgroundColor: '#020202',
  },
});
