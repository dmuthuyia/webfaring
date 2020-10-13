import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ToastAndroid,
  Button,
} from 'react-native';

import DisplayModal from './DisplayModal';
import Assets from '../assets/assets';

var REQUEST_URL = 'https://facebook.github.io/react-native/movies.json';
//var REQUEST_URL = "https://boukd.com/apps/boukd/whipup.php";

export default class WPReact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
      isLoading: true,
      display: false,
    };
    //Using ES6 we need to bind methods to access 'this'
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const url = 'https://boukd.com/apps/boukd/whipup.php';
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          dataSource: responseJson,
          isLoading: false,
          display: false,
          userId: '',
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  triggerModal = UserName => {
    this.setState(prevState => {
      return {
        display: true,
        userId: UserName,
      };
    });
  };

  render() {
    //this.state.dataSource.movies is the array you have to iterate
    contents = this.state.dataSource.map(item => {
      //We need to return the corresponding mapping for each item too.
      return (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            borderRadius: 20,
            margin: 4,
            backgroundColor: '#eeedf9',
          }}
          //onPress={() => ToastAndroid.show(item.UserName, ToastAndroid.SHORT)}
        >
          <View style={{justifyContent: 'center', alignItems: 'stretch'}}>
            <Image
              style={{
                width: 60,
                height: 60,
                margin: 5,
                borderRadius: 30,
              }}
              source={{
                uri: 'https://boukd.com/apps/boukd/images/avatar/' + item.mypic,
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <View
              style={{
                backgroundColor: '#e2e2f7',
                borderTopRightRadius: 50,
                alignSelf: 'flex-start',
                paddingLeft: 5,
                paddingRight: 20,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#05087f',
                  marginBottom: 1,
                }}>
                {item.UserName}
              </Text>
            </View>
            <Text style={{fontSize: 16, color: 'black', padding: 2}}>
              {item.description}
            </Text>
            <View style={styles.comReactWrapper}>
              <View style={styles.comReactButton}>
                <Image
                  source={Assets.connectliftlove1}
                  style={styles.drawerico}
                />
                <Text>10</Text>
              </View>
              <View style={styles.comReactButton}>
                <Image
                  source={Assets.connectlifthate1}
                  style={styles.drawerico}
                />
                <Text>1</Text>
              </View>
              <TouchableOpacity
                style={styles.comReactButton}
                onPress={this.triggerModal.bind(this, item.UserName)}>
                <Image
                  source={Assets.connectliftcomment1}
                  style={styles.drawerico}
                />
                <Text>23</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    });
    return (
      <View style={styles.container}>
        {contents}
        <DisplayModal data={this.state.userId} display={this.state.display} />
      </View>
    );
  }
}

var Dimensions = require('Dimensions');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#020202',
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
  comReactWrapper: {
    width: 500,
    flexDirection: 'row',
    borderColor: '#fff',
    borderTopWidth: 2,
    borderLeftWidth: 2,
  },
  comReactButton: {
    color: 'green',
    fontSize: 12,
    width: 60,
    flexDirection: 'row',
  },
  drawerico: {
    width: 15,
    height: 15,
    margin: 5,
    opacity: 0.6,
  },
});
