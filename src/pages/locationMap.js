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
} from 'react-native';

import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import geolib from 'geolib';
import Geolocation from '@react-native-community/geolocation';
import Lsnavigator from '../components/lsnavigator';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const mapHeight = (100 * HEIGHT) / 100;
const controlsContHeight = (10 * HEIGHT) / 100;
const maxWidth = WIDTH;

export default class LocationMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      error: null,
    };
  }
  componentDidMount() {
    var ltdparam = this.props.navigation.getParam('ltd', 'Nothing');
    var lngparam = this.props.navigation.getParam('lng', 'Nothing');

    const coordinatesLtd = parseFloat(
      ltdparam.substring(0, ltdparam.length - 2),
    );

    const coordinatesLng = parseFloat(
      lngparam.substring(0, lngparam.length - 2),
    );

    //alert(coordinatesLtd + " " + coordinatesLng);
    //this.setState({
    //latitude: coordinatesLtd,
    //longitude: coordinatesLng,
    //error: null
    //});

    //dat = this.props.navigation.getParam("itemId", "NO-ID");
    //alert(dat);

    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        const currentLongitude = parseFloat(
          JSON.stringify(position.coords.longitude),
        );
        //getting the Longitude from the location json
        const currentLatitude = parseFloat(
          JSON.stringify(position.coords.latitude),
        );
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

  render() {
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
                latitudeDelta: 0.12,
                longitudeDelta: 0.12,
              }}>
              <MapView.Marker coordinate={this.state} />
            </MapView>
          ) : (
            <View style={styles.alert}>
              <Text style={styles.buttonText}>Locating...</Text>
            </View>
          )}
          <View style={styles.lvmenu} />
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
    width: 100,
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
