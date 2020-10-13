/**
 developer: Dennis Muthuyia  
 email:  dmuthuyia@gmail.com
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Image,
} from 'react-native';

import Geolocation from '@react-native-community/geolocation';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import geolib from 'geolib';
import Buttn from './buttn';

import Assets from '../assets/assets';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const mapHeight = (100 * HEIGHT) / 100;
const controlsContHeight = (10 * HEIGHT) / 100;
const maxWidth = WIDTH;

export default class Livestream extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      animation: new Animated.Value(0),
    };
  }
  componentDidMount() {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Longitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        //getting the Latitude from the location json
        this.setState({
          latitude: currentLatitude,
          longitude: currentLongitude,
          error: null,
        });
      },
      error => alert(error.message),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      },
    );
  }

  distanceBetween = () => {
    //dist=√((y2-y1)^2 + (x2-x1)^2);
    //from current position
    ltd = this.state.latitude;
    lng = this.state.longitude;

    distMtrs = geolib.getDistanceSimple(
      {latitude: -1.216929, longitude: 36.894342},
      {latitude: ltd, longitude: lng},
    );

    distKm = geolib.convertUnit('km', distMtrs, 2);

    alert(
      'selected location is about ' +
        distKm +
        ' Km' +
        ' from your current location',
    );
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
        <View style={styles.container}>
          {this.state.latitude && this.state.longitude ? (
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              region={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}>
              <MapView.Marker coordinate={this.state} />
              <MapView.Marker
                coordinate={{
                  latitude: -1.211507,
                  longitude: 36.903822,
                }}
                title="Party"
                description="party"
              />
            </MapView>
          ) : (
            <View style={styles.alert}>
              <Text style={styles.buttonText}>We can't find you</Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: mapHeight,
    width: maxWidth,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  containerMenu: {
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
  controlCont: {
    height: controlsContHeight,
    width: maxWidth,
    justifyContent: 'flex-end',
  },
  alert: {
    height: 50,
    width: 400,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lvmenu: {
    width: maxWidth,
  },
});
