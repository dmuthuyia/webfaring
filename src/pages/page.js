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
  ImageBackground,
} from 'react-native';

import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import geolib from 'geolib';
import Lsnavigator from '../components/lsnavigator';
import Assets from '../assets/assets';
import Gallery from 'react-native-image-gallery';
import Bkdgallery from './bkdgallery/index';
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

export default class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileId: 0,
      pId: '',
      dp: '',
      userName: '',
      birthName: '',
      country: '',
      city: '',
      dob: '',

      images1: [
        {
          title: 'Beautiful and dramatic Antelope Canyon',
          subtitle: '',
          illustration:
            'https://boukd.com/apps/boukd/images/profile/' +
            props.navigation.getParam('dp', 'Nothing'),
        },
        {
          title: '',
          subtitle: 'Lorem ipsum dolor sit amet',
          illustration:
            'https://boukd.com/apps/boukd/images/profile/' +
            props.navigation.getParam('dp', 'Nothing'),
        },
        {
          title: 'White Pocket Sunset',
          subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
          illustration:
            'https://boukd.com/apps/boukd/images/profile/' +
            props.navigation.getParam('dp', 'Nothing'),
        },
        {
          title: 'Acrocorinth, Greece',
          subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
          illustration:
            'https://boukd.com/apps/boukd/images/profile/' +
            props.navigation.getParam('dp', 'Nothing'),
        },
        {
          title: 'The lone tree, majestic landscape of New Zealand',
          subtitle: 'Lorem ipsum dolor sit amet',
          illustration:
            'https://boukd.com/apps/boukd/images/profile/' +
            props.navigation.getParam('dp', 'Nothing'),
        },
        {
          title: 'Middle Earth, Germany',
          subtitle: 'Lorem ipsum dolor sit amet',
          illustration:
            'https://boukd.com/apps/boukd/images/profile/' +
            props.navigation.getParam('dp', 'Nothing'),
        },
      ],
    };
  }
  componentDidMount() {
    var pId = this.props.navigation.getParam('pId', 'Nothing');
    var dp = this.props.navigation.getParam('dp', 'Nothing');
    var userName = this.props.navigation.getParam('userName', 'Nothing');
    var birthName = this.props.navigation.getParam('birthName', 'Nothing');
    var country = this.props.navigation.getParam('country', 'Nothing');
    var city = this.props.navigation.getParam('city', 'Nothing');
    var dob = this.props.navigation.getParam('dob', 'Nothing');

    if (dob.includes('null')) {
      dob = '';
    }

    if (birthName.includes('null')) {
      birthName = '';
    }

    this.setState({
      pId: pId,
      dp: dp,
      userName: userName,
      birthName: birthName,
      country: country,
      city: city,
      dob: dob,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={assets.bg12}
          style={{width: '100%', height: '100%'}}>
          <View style={styles.container}>
            <View style={styles.section1}>
              <View style={styles.col1}>
                <Text style={styles.pTextMajor}>
                  Name:
                  <Text style={styles.pTextMinor}> {this.state.userName}</Text>
                </Text>
                <Text style={styles.pTextMajor}>
                  Born:
                  <Text style={styles.pTextMinor}> {this.state.birthName}</Text>
                </Text>
                <Text style={styles.pTextMajor}>
                  Country:{' '}
                  <Text style={styles.pTextMinor}>{this.state.country}</Text>{' '}
                </Text>
                <Text style={styles.pTextMajor}>
                  City: <Text style={styles.pTextMinor}>{this.state.city}</Text>
                </Text>
                <Text style={styles.pTextMajor}>
                  Birthday:{' '}
                  <Text style={styles.pTextMinor}>{this.state.dob}</Text>
                </Text>
                <Text style={styles.pTextMajor}>Performance</Text>
                <Text style={styles.pTextMajor}>Punctuality</Text>
                <Text style={styles.pTextMajor}>Professionalism</Text>
              </View>
              <View style={styles.col1}>
                <Image
                  style={{
                    flex: 1,
                    width: '98%',
                    height: 130,
                    padding: 5,
                    alignItems: 'flex-end',
                    alignContent: 'center',
                    borderRadius: 5,
                    borderWidth: 2,
                    borderColor: 'gray',
                  }}
                  source={{
                    uri:
                      'https://boukd.com/apps/boukd/images/profile/' +
                      this.state.dp,
                  }}
                />
              </View>
            </View>
            <View style={styles.section4}>
              <TouchableOpacity
                style={styles.bookBtnContainer}
                onPress={() =>
                  this.props.navigation.navigate('Booking', {
                    userName: this.state.userName,
                    dp: this.state.dp,
                    pId: this.state.pId,
                  })
                }>
                <Text style={styles.buttonText}>
                  Book {this.state.userName}{' '}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.section3}>
              <Bkdgallery images1x={this.state.images1} />
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  bookBtnContainer: {
    width: WIDTH,
    backgroundColor: '#4c1037',
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
    backgroundColor: 'gray',
    padding: 2,
  },
  col1: {
    width: point3W,
  },
  section2: {
    flex: 1,
    width: WIDTH,
    flexDirection: 'row',

    justifyContent: 'center',
    padding: 2,
  },
  section3: {
    flex: 1,
    width: WIDTH,
    flexDirection: 'row',

    justifyContent: 'center',
    padding: 2,
  },
  section4: {
    //width: WIDTH,
    flexDirection: 'row',

    justifyContent: 'center',
    padding: 2,
  },
});
