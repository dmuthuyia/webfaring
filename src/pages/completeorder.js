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

export default class completeOrder extends Component {
  constructor(props) {
    super(props);

    // STATE
    this.state = {
      // from props
      userName: '',
      dp: '',
      currentUserName: '',
      // To be passed to server

      userPassword: '',
      acceptedTerms: false,

      signedUser: '',
      firstName: '',
      lastName: '',
      description: 'order',
      buildingNo: '',
      latitude: '',
      longitude: '',
      expectedDeliveryDate: '',
      expectedDeliveryTime: '',
      invNo: '',
      subTotal: '',
      shippingCost: '',
      totalCost: '',

      Phone1: '',
      Phone2: '',

      aToken: '',
      userID: '',

      //time picker
      isDateTimePickerVisibleSD: false,
      isDateTimePickerVisibleED: false,
      isDateTimePickerVisibleST: false,
      isDateTimePickerVisibleET: false,

      // react-native-country-list
      //country: "", //->reverse geocode

      // react-native-country-list modal
      countryModalVisible: false,

      //device location
      location: null,
      lat: null,
      lng: null,

      // reverse geocode

      googleApiLocation: null,
      country: null,
      county: '',
      city: null,
      location: null,
      street: null,

      //picker dropdown
      eventType: '',
    };
  }
  componentDidMount() {
    var dp = this.props.navigation.getParam('dp', 'Nothing');
    var userName = this.props.navigation.getParam('userName', 'Nothing');
    //var pId = this.props.navigation.getParam('pId', 'Nothing');

    this.setState({
      userName: userName,
      dp: dp,
      //actId: pId,
    });

    this.checkAccess();

    Geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);
        var myApiKey = 'AIzaSyAb1PAAzq8TyNB-VVf3q_woxYnr-q3W8G8';
        myLat = position.coords.latitude;
        myLng = position.coords.longitude;

        fetch(
          'https://maps.googleapis.com/maps/api/geocode/json?address=' +
            myLat +
            ',' +
            myLng +
            '&key=' +
            myApiKey,
        )
          .then(response => response.json())
          .then(responseJson => {
            this.setState({
              //googleApiLocation: JSON.stringify(responseJson)
              country: JSON.stringify(
                responseJson.results[0].address_components[4].long_name,
              ).replace(/\"/g, ''), //mystring.replace('/r','/');
              county: JSON.stringify(
                responseJson.results[0].address_components[3].long_name,
              ).replace(/\"/g, ''),
              city: JSON.stringify(
                responseJson.results[0].address_components[2].long_name,
              ).replace(/\"/g, ''),
              location: JSON.stringify(
                responseJson.results[0].address_components[1].long_name,
              ).replace(/\"/g, ''),
              address: JSON.stringify(
                responseJson.results[0].address_components[0].long_name,
              ).replace(/\"/g, ''),
            });
          });

        this.setState({
          location: location,
          latitude: myLat,
          longitude: myLng,
        });
      },
      error => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 30000, maximumAge: 2000},
    );
  }

  checkAccess = async () => {
    const chkToken = await AsyncStorage.getItem('ticket');
    const chkCurrentUserId = await AsyncStorage.getItem('currentUserId');
    //alert(chkToken);
    this.setState(prevState => {
      return {
        aToken: chkToken,
        userID: chkCurrentUserId,
      };
    });

    this.fetchCart();
  };

  //Date picker functions
  showExpectedDeliveryDate = () => {
    this.setState({isDateTimePickerVisibleSD: true});
  };

  showExpectedDeliveryTime = () => {
    this.setState({isDateTimePickerVisibleST: true});
  };

  hideDateTimePicker = () => {
    this.setState({isDateTimePickerVisibleSD: false});
    this.setState({isDateTimePickerVisibleED: false});
    this.setState({isDateTimePickerVisibleST: false});
    this.setState({isDateTimePickerVisibleET: false});
  };

  handleDatePickedEDD = sDate => {
    //var newDate = moment(sDate).format('DD/MM/YYYY');
    var newDate = moment(sDate).format('YYYY-MM-DD');
    //newDate = format(date, "DD/MM/YYYY"); // using date-fns
    this.setState({expectedDeliveryDate: newDate});
    //alert(newDate);
    this.hideDateTimePicker();
  };

  handleDatePickedEDT = sTime => {
    //newTime = time.toLocaleTimeString("en-US");
    var newTime = moment(sTime).format('HH:mm');
    this.setState({expectedDeliveryTime: newTime});
    //alert(newTime);
    this.hideDateTimePicker();
  };

  // send data to booking table
  newOrder = () => {
    //alert("yo");

    const {userID} = this.state;
    const {aToken} = this.state;
    const {firstName} = this.state;
    const {lastName} = this.state;
    const {description} = this.state;
    const {buildingNo} = this.state;
    const {latitude} = this.state;
    const {longitude} = this.state;
    const {expectedDeliveryDate} = this.state;
    const {expectedDeliveryTime} = this.state;
    const {invNo} = this.state;
    const {subTotal} = this.state;
    const {shippingCost} = this.state;
    const {totalCost} = this.state;

    const {country} = this.state;
    const {county} = this.state;
    const {city} = this.state;
    const {location} = this.state;
    const {street} = this.state;
    const {Phone1} = this.state;
    const {Phone2} = this.state;

    fetch('https://www.infohtechict.co.ke/apps/kuismenu/new-order.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        //send data to API

        signedUserAPI: userID,
        currentTokenAPI: aToken,
        firstNameAPI: firstName,
        lastNameAPI: lastName,
        descriptionAPI: description,
        buildingNoAPI: buildingNo,
        latitudeAPI: latitude,
        longitudeAPI: longitude,
        expectedDeliveryDateAPI: expectedDeliveryDate,
        expectedDeliveryTimeAPI: expectedDeliveryTime,
        invNoAPI: invNo,
        subTotalAPI: subTotal,
        shippingCostAPI: shippingCost,
        totalCostAPI: totalCost,
        countryAPI: country,
        countyAPI: county,
        cityAPI: city,
        locationAPI: location,
        streetAPI: street,
        Phone1API: Phone1,
        Phone2API: Phone2,
      }),
    })
      .then(response => response.json())
      .then(responseJsonFromServer => {
        if (responseJsonFromServer == 'order submitted') {
          alert(responseJsonFromServer);
          this.props.navigation.navigate('Pay');
        } else {
          alert('Something went wrong');
          //alert(JSON.stringify(responseJsonFromServer));
        }
      })
      .catch(error => {
        console.error(error);
      });

    //onButtonPress = () => this.props.navigation.navigate("Login");
  };

  render() {
    const {country} = this.state;
    const curUser = async () => {
      const userNm = await AsyncStorage.getItem('currentUserName');
      return userNm;
    };

    const curUserId = async () => {
      const userId = await AsyncStorage.getItem('currentUserId');
      return userId;
    };

    (async () => {
      const usrName = await curUser();
      const usrId = await curUserId();
      this.setState({
        currentUserName: usrName,
        signedUser: usrId,
      });
    })();

    return (
      <View style={styles.container}>
        <ImageBackground style={{width: '100%', height: '100%'}}>
          <ScrollView>
            <View style={styles.section3}>
              <View style={styles.col1}>
                <Text>UserName</Text>
                <TextInput
                  style={styles.inputBox}
                  placeholder="invoice Number"
                  placeholderTextColor="gray"
                  returnKeyType="next"
                  autoCorrect={false}
                  onChangeText={signedUser => this.setState({signedUser})}>
                  {this.state.signedUser}
                </TextInput>
              </View>

              <View style={styles.col1}>
                <Text>current token</Text>
                <TextInput
                  style={styles.inputBox}
                  placeholder="token"
                  placeholderTextColor="gray"
                  returnKeyType="next"
                  autoCorrect={false}
                  onChangeText={aToken => this.setState({aToken})}>
                  {this.state.aToken}
                </TextInput>
              </View>
            </View>

            <View style={styles.section3}>
              <View style={styles.col1}>
                <Text>First Name</Text>
                <TextInput
                  style={styles.inputBox}
                  placeholder="First Name"
                  placeholderTextColor="gray"
                  returnKeyType="next"
                  autoCorrect={false}
                  onChangeText={firstName => this.setState({firstName})}>
                  {this.state.firstName}
                </TextInput>
              </View>

              <View style={styles.col1}>
                <Text>Last Name</Text>
                <TextInput
                  style={styles.inputBox}
                  placeholder="Last Name"
                  placeholderTextColor="gray"
                  returnKeyType="next"
                  autoCorrect={false}
                  onChangeText={lastName => this.setState({lastName})}>
                  {this.state.lastName}
                </TextInput>
              </View>
            </View>

            <View style={styles.section3}>
              <View style={styles.col1}>
                <Text>County</Text>
                <TextInput
                  style={styles.inputBox}
                  placeholder="county"
                  placeholderTextColor="gray"
                  returnKeyType="next"
                  autoCorrect={false}
                  onChangeText={county => this.setState({county})}>
                  {this.state.county}
                </TextInput>
              </View>

              <View style={styles.col1}>
                <Text>City</Text>
                <TextInput
                  style={styles.inputBox}
                  placeholder="City"
                  placeholderTextColor="gray"
                  returnKeyType="next"
                  autoCorrect={false}
                  onChangeText={city => this.setState({city})}>
                  {this.state.city}
                </TextInput>
              </View>
            </View>

            <View style={styles.section3}>
              <View style={styles.col1}>
                <Text>Location / Street</Text>
                <TextInput
                  style={styles.inputBox}
                  placeholder="Location/street/address"
                  placeholderTextColor="gray"
                  returnKeyType="next"
                  autoCorrect={false}
                  onChangeText={address => this.setState({address})}>
                  {this.state.address}
                </TextInput>
              </View>

              <View style={styles.col1}>
                <Text>Building name</Text>
                <TextInput
                  style={styles.inputBox}
                  placeholder="Building name"
                  placeholderTextColor="gray"
                  returnKeyType="next"
                  autoCorrect={false}
                  onChangeText={buildingNo => this.setState({buildingNo})}>
                  {this.state.buildingNo}
                </TextInput>
              </View>
            </View>

            <View style={styles.section3}>
              <View style={styles.col1}>
                <Text>Latitude</Text>
                <TextInput
                  style={styles.inputBox}
                  placeholder="Latitude"
                  placeholderTextColor="gray"
                  returnKeyType="next"
                  autoCorrect={false}
                  onChangeText={latitude => this.setState({latitude})}>
                  {this.state.latitude}
                </TextInput>
              </View>

              <View style={styles.col1}>
                <Text>Longitude</Text>
                <TextInput
                  style={styles.inputBox}
                  placeholder="Longitude"
                  placeholderTextColor="gray"
                  returnKeyType="next"
                  autoCorrect={false}
                  onChangeText={longitude => this.setState({longitude})}>
                  {this.state.longitude}
                </TextInput>
              </View>
            </View>
            <View style={styles.section3}>
              <View style={styles.col1}>
                <Text>Expected date</Text>
                <TouchableOpacity
                  style={styles.selectBtn}
                  onPress={this.showExpectedDeliveryDate}>
                  <Text style={styles.text1}>
                    Date: {this.state.expectedDeliveryDate}
                  </Text>
                </TouchableOpacity>
                <DateTimePicker
                  isVisible={this.state.isDateTimePickerVisibleSD}
                  onConfirm={this.handleDatePickedEDD}
                  onCancel={this.hideDateTimePicker}
                />
              </View>

              <View style={styles.col1}>
                <Text>Expected time</Text>
                <TouchableOpacity
                  style={styles.selectBtn}
                  onPress={this.showExpectedDeliveryTime}>
                  <Text style={styles.text1}>
                    Time: {this.state.expectedDeliveryTime}
                  </Text>
                </TouchableOpacity>
                <DateTimePicker
                  isVisible={this.state.isDateTimePickerVisibleST}
                  onConfirm={this.handleDatePickedEDT}
                  onCancel={this.hideDateTimePicker}
                  mode="time"
                />
              </View>
            </View>

            <View style={styles.section3}>
              <View style={styles.col1}>
                <Text>Invoice Number</Text>
                <TextInput
                  style={styles.inputBox}
                  placeholder="invoice Number"
                  placeholderTextColor="gray"
                  returnKeyType="next"
                  autoCorrect={false}
                  onChangeText={invNo => this.setState({invNo})}>
                  {this.state.invNo}
                </TextInput>
              </View>

              <View style={styles.col1}>
                <Text>Sub Total</Text>
                <TextInput
                  style={styles.inputBox}
                  placeholder=""
                  placeholderTextColor="gray"
                  returnKeyType="next"
                  autoCorrect={false}
                  onChangeText={subTotal => this.setState({subTotal})}>
                  {this.state.subTotal}
                </TextInput>
              </View>
            </View>
            <View style={styles.section3}>
              <View style={styles.col1}>
                <Text>Shipping Cost</Text>
                <TextInput
                  style={styles.inputBox}
                  placeholder="Shipping Cost"
                  placeholderTextColor="gray"
                  returnKeyType="next"
                  autoCorrect={false}
                  onChangeText={shippingCost => this.setState({shippingCost})}>
                  {this.state.shippingCost}
                </TextInput>
              </View>

              <View style={styles.col1}>
                <Text>Total Amount</Text>
                <TextInput
                  style={styles.inputBox}
                  placeholder="Total Amount"
                  placeholderTextColor="gray"
                  returnKeyType="next"
                  autoCorrect={false}
                  onChangeText={totalCost => this.setState({totalCost})}>
                  {this.state.totalCost}
                </TextInput>
              </View>
            </View>
            <View style={styles.section3}>
              <View style={styles.col1} />

              <View style={styles.col1}>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={this.newOrder}>
                  <Text style={styles.buttonText}>Complete order</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
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
