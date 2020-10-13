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
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  CheckBox,
  Button,
  PixelRatio,
  Modal,
  Alert,
  TouchableHighlight,
  Picker,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Geolocation from '@react-native-community/geolocation';
import DateTimePicker from 'react-native-modal-datetime-picker';
//import Moment from "react-moment";
//import "moment-timezone";
import moment from 'moment';
//import { format } from "date-fns";

import {CountrySelection} from 'react-native-country-list';
import Select from 'react-select';
import Assets from '../assets/assets';

import Logo from '../components/logo';
import {latitude, longitude} from 'geolib';
import assets from '../assets/assets';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const point3H = (40 * HEIGHT) / 100;
const controlsContHeight = (10 * HEIGHT) / 100;
const point3W = (50 * WIDTH) / 100;
const point3W2 = (33.3 * WIDTH) / 100;
const section1H = (25 * HEIGHT) / 100;
const section2H = (30 * HEIGHT) / 100;
const section3H = (30 * HEIGHT) / 100;
const section4H = (8 * HEIGHT) / 100;

export default class Invoices extends Component {
  constructor(props: $1Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text>$1</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,

    alignItems: 'center',
  },

  inputBox: {
    width: '85%',
    height: 35,
    backgroundColor: '#fff',
    color: 'black',
    borderColor: '#020202',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 10,
  },
  inputBoxDes: {
    width: '98%',
    height: 80,
    backgroundColor: '#fff',
    color: 'black',
    borderColor: '#020202',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 16,
    paddingRight: 10,

    textAlignVertical: 'top',
  },

  bookBtnContainer: {
    width: 100,
    backgroundColor: '#020202',
    paddingVertical: 5,
    borderColor: '#4c1037',
    borderWidth: 1,
    justifyContent: 'center',
    textAlign: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: 'rgb(32, 53, 70)',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
    paddingVertical: 5,
  },
  signupTextCont: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row',
  },
  pTextMajor: {
    color: '#4c1037',
    fontSize: 12,
    fontFamily: 'sans-serif',
  },
  pTextMinor: {
    color: '#020202',
    fontSize: 12,
    fontFamily: 'sans-serif-condensed',
  },
  signupButton: {
    color: 'yellow',
    fontSize: 16,
    fontWeight: '500',
  },

  section1: {
    width: WIDTH,
    flexDirection: 'row',

    padding: 2,
  },
  col1: {
    width: point3W,
  },
  section2: {
    marginBottom: 20,
    width: WIDTH,

    padding: 4,
  },
  section3: {
    width: WIDTH,
    flexDirection: 'row',

    padding: 4,
  },
  section4: {
    width: WIDTH,
    flexDirection: 'row',
    //height: section4H,
    justifyContent: 'center',
    padding: 2,
  },
  avatar: {
    width: 80,
    height: 80,
    //alignSelf: "flex-end",
    padding: 2,
    borderRadius: 10,
  },
  buttonContainer: {
    width: '85%',
    height: 40,
    backgroundColor: '#92ca2c',

    borderRadius: 10,
    borderColor: '#020202',
    borderWidth: 2,
  },
  instructions: {
    fontSize: 12,
    textAlign: 'center',
    color: '#888',
    marginBottom: 5,
  },
  data: {
    padding: 15,
    marginTop: 10,
    backgroundColor: '#ddd',
    borderColor: '#888',
    borderWidth: 1 / PixelRatio.get(),
    color: '#777',
  },
  modal: {
    flex: 1,

    backgroundColor: 'white',
  },
  text: {
    color: '#3f2949',
    marginTop: 10,
  },
  picker1: {
    width: '90%',
    height: 35,
  },
  itemsPicker: {
    height: 35,
    backgroundColor: 'red',
    color: '#020202',
    fontFamily: 'Ebrima',
    fontSize: 8,
  },
  text1: {
    color: 'black',
    //paddingTop: 10,
    lineHeight: 32,
    fontSize: 10,
    width: '100%',
  },
  selectBtn: {
    width: '85%',
    height: 35,
    backgroundColor: '#776af1',
    color: 'black',
    borderColor: '#020202',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
});
