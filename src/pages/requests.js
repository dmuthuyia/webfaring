/**
 developer: Dennis Muthuyia  
 email:  dmuthuyia@gmail.com
 */

import React, {Component} from 'react';
import {StyleSheet, Image, Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';

import Analytics from './featured';
import Twitter from './maindishes';
import Google from './fastfood';
import FaceBook from './drinks';
import Instagram from './african';
import Webfaring from './world';

import Assets from '../assets/assets';

const Drawer = createMaterialTopTabNavigator(
  {
    Analytics: {
      screen: Analytics,
      navigationOptions: {
        tabBarLabel: (
          <Text style={{fontSize: 10, color: '#fff'}}> Analytics </Text>
        ),
        tabBarIcon: ({tintColor}) => (
          <Image source={Assets.analytics} style={{height: 20, width: 20}} />
        ),
        tabBarOptions: {
          activeTintColor: '#020202',
          inactiveTintColor: '#D3D3D3',
          showLabel: true,
          showIcon: true,
          style: {
            backgroundColor: '#020202',
            borderTopColor: '#D3D3D3',
          },
          indicatorStyle: {
            backgroundColor: 'green',
          },
        },
      },
    },
    Twitter: {
      screen: Twitter,
      navigationOptions: {
        tabBarLabel: <Text style={{fontSize: 10, color: '#fff'}}>Twitter</Text>,
        tabBarIcon: ({tintColor}) => (
          <Image source={Assets.twitter} style={{height: 20, width: 20}} />
        ),
        tabBarOptions: {
          activeTintColor: '#020202',
          inactiveTintColor: '#D3D3D3',
          showLabel: true,
          showIcon: true,
          style: {
            backgroundColor: '#020202',
            borderTopColor: '#D3D3D3',
          },
          indicatorStyle: {
            backgroundColor: 'green',
          },
        },
      },
    },
    Google: {
      screen: Google,
      navigationOptions: {
        tabBarLabel: <Text style={{fontSize: 10, color: '#fff'}}>Google</Text>,
        tabBarIcon: ({tintColor}) => (
          <Image source={Assets.google} style={{height: 20, width: 20}} />
        ),
        tabBarOptions: {
          activeTintColor: '#020202',
          inactiveTintColor: '#D3D3D3',
          showLabel: true,
          showIcon: true,
          style: {
            backgroundColor: '#020202',
            borderTopColor: '#D3D3D3',
          },
          indicatorStyle: {
            backgroundColor: 'green',
          },
        },
      },
    },
    FaceBook: {
      screen: FaceBook,
      navigationOptions: {
        tabBarLabel: (
          <Text style={{fontSize: 10, color: '#fff'}}>FaceBook</Text>
        ),
        tabBarIcon: ({tintColor}) => (
          <Image source={Assets.facebook} style={{height: 20, width: 20}} />
        ),
        tabBarOptions: {
          activeTintColor: '#020202',
          inactiveTintColor: '#D3D3D3',
          showLabel: true,
          showIcon: true,
          style: {
            backgroundColor: '#020202',
            borderTopColor: '#D3D3D3',
          },
          indicatorStyle: {
            backgroundColor: 'green',
          },
        },
      },
    },
    Instagram: {
      screen: Instagram,
      navigationOptions: {
        tabBarLabel: (
          <Text style={{fontSize: 10, color: '#fff'}}>Instagram</Text>
        ),
        tabBarIcon: ({tintColor}) => (
          <Image source={Assets.instagram} style={{height: 20, width: 20}} />
        ),
        tabBarOptions: {
          activeTintColor: '#020202',
          inactiveTintColor: '#D3D3D3',
          showLabel: true,
          showIcon: true,
          style: {
            backgroundColor: '#020202',
            borderTopColor: '#D3D3D3',
          },
          indicatorStyle: {
            backgroundColor: 'green',
          },
        },
      },
    },
    Webfaring: {
      screen: Webfaring,
      navigationOptions: {
        tabBarLabel: (
          <Text style={{fontSize: 10, color: '#fff'}}> Webfaring</Text>
        ),
        tabBarIcon: ({tintColor}) => (
          <Image source={Assets.webfrng} style={{height: 20, width: 20}} />
        ),
        tabBarOptions: {
          activeTintColor: '#020202',
          inactiveTintColor: '#D3D3D3',
          showLabel: true,
          showIcon: true,
          style: {
            backgroundColor: '#020202',
            borderTopColor: '#D3D3D3',
          },
          indicatorStyle: {
            backgroundColor: 'green',
          },
        },
      },
    },
  },
  {
    navigationOptions: {
      tabBarLabel: 'u',
      tabBarIcon: ({tintColor}) => (
        <Image source={Assets.order} style={{height: 20, width: 20}} />
      ),
      tabBarOptions: {
        activeTintColor: 'green',
        inactiveTintColor: '#D3D3D3',
        style: {
          backgroundColor: '#020202',
          borderTopColor: '#D3D3D3',
        },
        indicatorStyle: {
          backgroundColor: 'green',
        },
      },
    },
  },
);

const PContainer = createAppContainer(Drawer);

export default PContainer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#020202',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    width: 250,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: '#fff',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  logoText: {
    marginVertical: 15,
    fontSize: 18,
    color: 'rgba(255,255,255,0.7)',
  },
  buttonContainer: {
    width: 250,
    backgroundColor: '#92ca2c',
    paddingVertical: 5,
    borderRadius: 10,
    borderColor: '#020202',
    borderWidth: 2,
  },
  buttonText: {
    textAlign: 'center',
    color: 'rgb(32, 53, 70)',
    fontWeight: 'bold',
    fontSize: 18,
  },
  signupTextCont: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row',
  },
  signupText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 16,
  },
  signupButton: {
    color: 'yellow',
    fontSize: 16,
    fontWeight: '500',
  },
});
