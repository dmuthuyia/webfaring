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
import AsyncStorage from '@react-native-community/async-storage';
import {CommonActions, useNavigation} from '@react-navigation/native';

import DisplayModal from './DisplayModal';
import Assets from '../assets/assets';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const mains = (56 * WIDTH) / 100;
const sidebars = (22 * WIDTH) / 100;
const sidebarsinner = (20 * WIDTH) / 100;
const mainsinner1 = (25 * WIDTH) / 100;
const mainsinner2 = (15 * WIDTH) / 100;
const sidebars1 = (33 * WIDTH) / 100;

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      isLoading: true,
      display: false,
      whipId: '',
      userID: '',

      appPrice: '',
      menuItemId: '',
      aToken: '',
      amount: '',
      count: 0,
      deleteArray: [],
    };
  }

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
            <TouchableOpacity>
              <Text style={styles.detail2}>{item.price}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Booking', {
                  categoryId: 'hey',
                  CategoryMeals: 'there',
                })
              }>
              <Text style={styles.detail2}>{item.special_price}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'stretch',
            width: sidebars,
          }}>
          <TouchableOpacity
            onPress={this.deleteCart.bind(
              this,
              item.price,
              item.id,
              item.special_price,
            )}>
            <Image
              style={{
                width: sidebarsinner,
                height: sidebarsinner,
                margin: 0,
                borderRadius: 30,
              }}
              source={Assets.deletePlate}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderSeparator = () => {
    return <View style={{height: 1, width: '100%', backgroundColor: 'gray'}} />;
  };

  deleteCart = (appPriceA, menuItemIdA, appPriceSpecialA) => {
    count = this.state.count;
    deleteArray = this.state.deleteArray;
    count += 1;
    const addObj = {
      id: menuItemIdA,
      cost: appPriceA,
      specialPrice: appPriceSpecialA,
    };
    deleteArray.push(addObj);

    aToken = this.state.aToken;
    user_id = this.state.userID;

    if (!user_id) {
      user_id = 'UNAVAILABLE';
    }

    if (appPriceSpecialA) {
      appPriceC = appPriceSpecialA;
    } else {
      appPriceC = appPriceA;
    }
    //alert(JSON.stringify(deleteArray));
    //alert(aToken);

    this.setState(prevState => {
      return {
        appPrice: appPriceC,
        menuItemId: menuItemIdA,
        count: count,
        appPriceOriginal: appPriceA,
        deleteArray: deleteArray,
        specialPrice: appPriceSpecialA,
        /*deleteArray: [
          ...prevState.deleteArray,
          {id: menuItemIdA, cost: appPriceA},
        ],*/
      };
    });

    fetch('https://www.infohtechict.co.ke/apps/kuismenu/delete-cart.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        menuitem_idAPI: menuItemIdA,
        access_tokenAPI: aToken,
        user_idAPI: user_id,
        amountAPI: 1,
        priceAPI: appPriceC,
        totalAPI: appPriceC,
      }),
    })
      .then(response => response.json())
      .then(responseJsonFromServer => {
        if (responseJsonFromServer == 'deleted from cart') {
          alert(responseJsonFromServer);
          this.props.navigation.navigate('Cart');
        } else {
          alert('Something went wrong');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  componentDidMount() {
    this.checkAccess();
  }

  fetchCart() {
    aToken = this.state.aToken;
    user_id = this.state.userID;
    //alert(aToken);

    fetch('https://www.infohtechict.co.ke/apps/kuismenu/cart.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        //we will pass our input data to server
        access_tokenAPI: aToken,
        user_idAPI: user_id,
      }),
    })
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

  render() {
    const {navigate} = this.props.navigation;
    return this.state.isLoading ? (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#330066" animating />
      </View>
    ) : (
      <View style={styles.container}>
        <View
          style={{
            width: WIDTH,
            flexDirection: 'row',

            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            backgroundColor: 'lightblue',
            borderBottomColor: 'purple',
            borderBottomWidth: 2,
          }}>
          <View style={{width: sidebars1, flexDirection: 'row'}}>
            <Text style={styles.detail3}>In your your order</Text>
          </View>
          <View style={{width: sidebars1, flexDirection: 'row'}}>
            <Text style={styles.detail3}>(4) items</Text>
          </View>
          <TouchableOpacity
            style={{width: sidebars1, flexDirection: 'row'}}
            onPress={() => this.props.navigation.navigate('Featured')}>
            <Text style={styles.detail3}>Add more items</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
          //keyExtractor={(item, index) => "list-item-${index}"}
          keyExtractor={(item, index) => index.toString()}
          //ItemSeparatorComponent={this.renderSeparator}
        />

        <View
          style={{
            width: WIDTH,
            flexDirection: 'row',

            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            backgroundColor: 'lightblue',
            borderBottomColor: 'purple',
            borderBottomWidth: 2,
          }}>
          <View style={{width: sidebars1, flexDirection: 'row'}}>
            <Text style={styles.detail3}>items</Text>
          </View>
          <View style={{width: sidebars1, flexDirection: 'row'}}>
            <Text style={styles.detail3}>Total</Text>
          </View>
          <View style={{width: sidebars1, flexDirection: 'row'}}>
            <Text style={styles.detail3}>445</Text>
          </View>
        </View>

        <View
          style={{
            width: WIDTH,
            flexDirection: 'row',

            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            backgroundColor: '#020202',
            borderBottomColor: 'purple',
            borderBottomWidth: 2,
          }}>
          <View style={{width: sidebars1, flexDirection: 'row'}}>
            <Text style={styles.detail3} />
          </View>
          <View style={{width: sidebars1, flexDirection: 'row'}}>
            <Text style={styles.detail3} />
          </View>
          <TouchableOpacity
            style={{
              width: sidebars1,
              flexDirection: 'row',
              backgroundColor: 'lightblue',
            }}
            onPress={() => this.props.navigation.navigate('Featured')}>
            <Text style={styles.detail3b}>Complete order</Text>
          </TouchableOpacity>
        </View>

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
  headerText: {
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
  detail3: {
    width: '100%',
    color: '#8e0606',
    fontSize: 12,
    padding: 5,
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  detail3b: {
    width: '100%',
    color: '#8e0606',
    fontSize: 14,
    padding: 5,
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
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
