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
import AsyncStorage from '@react-native-community/async-storage';
//import all the components we needed
import Assets from '../assets/assets';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const thirty = (30 * HEIGHT) / 100;
const ten = (10 * HEIGHT) / 100;
const twenty = (20 * HEIGHT) / 100;
const five = (8 * HEIGHT) / 100;
const ten2 = (8 * HEIGHT) / 100;

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
    this.accessToken();
    this.loadData();
  }

  accessToken = async () => {
    const currentTicket = await AsyncStorage.getItem('ticket');
    if (!currentTicket) {
      secA = Math.floor(Math.random() * 10);
      seeDate = new Date().valueOf();
      secB = seeDate + 'x23' + secA;
      await AsyncStorage.setItem('ticket', secB);
      //alert(this.state.currentUserName);
    }
  };

  loadData = async () => {
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');

    if (isLoggedIn == 'Yes') {
      this.props.navigation.navigate('Dashboard');
    }
  };

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
              style={{width: '100%', height: thirty, overflow: 'hidden'}}
              imageStyle={{
                resizeMode: 'contain', // works only here!
              }}
            />
          </View>
          <View style={{width: mains, height: thirty}}>
            <Animated.View
              style={{
                color: '#fff',
                fontSize: 12,
                height: '100%',
                width: '100%',
                transform: [{rotate: RotateData}],
              }}>
              <ImageBackground
                source={Assets.plateB}
                style={{width: '100%', height: '100%'}}
                imageStyle={{
                  resizeMode: 'contain', // works only here!
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: mains,
                    height: ten,
                  }}>
                  <TouchableOpacity
                    style={(styles.buttonContainer, {top: five})}
                    onPress={() => this.props.navigation.navigate('Signup')}>
                    <Text
                      style={{
                        width: sidebars,
                        height: ten,
                        right: 20,

                        textAlign: 'right',
                        fontSize: 12,
                        color: 'blue',
                      }}>
                      Sign up
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={(styles.buttonContainer, {top: five})}
                    onPress={() => this.props.navigation.navigate('Login')}>
                    <Text
                      style={{
                        width: sidebars,
                        height: ten,
                        left: 20,
                        fontSize: 12,
                        color: 'blue',
                      }}>
                      Login
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{width: mains, height: twenty}}>
                  <TouchableOpacity
                    style={(styles.buttonContainer, {top: ten2})}
                    onPress={() => this.props.navigation.navigate('Dashboard')}>
                    <Text
                      style={{
                        width: mains,
                        height: twenty,
                        textAlign: 'center',

                        fontSize: 12,
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
              style={{width: '100%', height: thirty, overflow: 'hidden'}}
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
