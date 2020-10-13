/**
 developer: Dennis Muthuyia  
 email:  dmuthuyia@gmail.com
 */

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
  Dimensions,
} from 'react-native';

import DisplayModal from './DisplayModal';
import Assets from '../assets/assets';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const mains = (56 * WIDTH) / 100;
const sidebars = (22 * WIDTH) / 100;
const sidebarsinner = (20 * WIDTH) / 100;
const mainsinner1 = (25 * WIDTH) / 100;
const mainsinner2 = (15 * WIDTH) / 100;

export default class Drinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      isLoading: true,
      display: false,
      whipId: '',
      userName: '',
    };
  }

  triggerModal = (UserName, WhipId) => {
    this.setState(prevState => {
      return {
        display: true,
        whipId: WhipId,
        userName: UserName,
      };
    });
  };

  renderItem = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          borderRadius: 2,
          margin: 4,
          backgroundColor: '#eeedf9',
        }}
        //onPress={() => ToastAndroid.show(item.UserName, ToastAndroid.SHORT)}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'stretch',
            width: sidebars,
          }}>
          <Image
            style={{
              width: sidebarsinner,
              height: sidebarsinner,
              margin: 0,
              borderRadius: 30,
            }}
            source={{
              uri:
                'https://www.infohtechict.co.ke/apps/kuismenu/images/' +
                item.item_img,
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            width: mains,
          }}>
          <Text
            style={{fontSize: 12, color: 'black', padding: 2, width: mains}}>
            {item.item_name}
          </Text>
          <View style={styles.comReactWrapper}>
            <View>
              <Text style={styles.detail1}>{item.description}</Text>
            </View>
            <TouchableOpacity
              onPress={this.triggerModal.bind(this, item.UserName, item.id)}>
              <Text style={styles.detail2}>{item.price}</Text>
            </TouchableOpacity>

            <View>
              <Text style={styles.detail2}>{item.special_price}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'stretch',
            width: sidebars,
          }}>
          <TouchableOpacity>
            <Image
              style={{
                width: sidebarsinner,
                height: sidebarsinner,
                margin: 0,
                borderRadius: 30,
              }}
              source={Assets.addToList}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderSeparator = () => {
    return <View style={{height: 1, width: '100%', backgroundColor: 'gray'}} />;
  };

  componentDidMount() {
    const url = 'https://www.infohtechict.co.ke/apps/kuismenu/drinks';
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          dataSource: responseJson,
          isLoading: false,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    return this.state.isLoading ? (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#330066" animating />
      </View>
    ) : (
      <View style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
          //keyExtractor={(item, index) => "list-item-${index}"}
          keyExtractor={(item, index) => index.toString()}
          //ItemSeparatorComponent={this.renderSeparator}
        />
        <DisplayModal WhipId="1" display={this.state.display} />
      </View>
    );
  }
}

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
    width: mains,
    flexDirection: 'row',
    borderColor: '#fff',
    borderTopWidth: 2,
    borderLeftWidth: 2,
  },
  comReactButton: {
    fontSize: 8,
    width: 45,
    flexDirection: 'row',
  },
  comReactButtonExt: {
    fontSize: 8,
    width: 50,
    flexDirection: 'row',
  },
  detail1: {
    color: 'red',
    fontSize: 10,
    width: mainsinner1,
  },
  detail2: {
    color: '#8e0606',
    fontSize: 10,
    width: mainsinner2,
  },
  bookingDetail2: {
    color: 'green',
    fontSize: 8,
  },
  bookingDetail3: {
    //color: 'green',
    fontSize: 10,
  },
  drawerico: {
    width: 40,
    height: 30,
    margin: 5,
    opacity: 0.6,
  },
});
