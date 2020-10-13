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
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

import DisplayModal from './DisplayModal';
import Assets from '../assets/assets';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const mains = (56 * WIDTH) / 100;
const sidebars = (22 * WIDTH) / 100;
const sidebarsinner = (20 * WIDTH) / 100;
const mainsinner1 = (25 * WIDTH) / 100;
const mainsinner2 = (15 * WIDTH) / 100;
const pagePadding2 = (2 * WIDTH) / 100;
const containerWidth = (96 * WIDTH) / 100;

export default class Featured extends Component {
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
      basketArray: [],
    };
  }

  cart = (appPriceA, menuItemIdA, appPriceSpecialA) => {
    count = this.state.count;
    basketArray = this.state.basketArray;
    count += 1;
    const addObj = {
      id: menuItemIdA,
      cost: appPriceA,
      specialPrice: appPriceSpecialA,
    };
    basketArray.push(addObj);

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
    //alert(JSON.stringify(basketArray));
    //alert(aToken);

    this.setState(prevState => {
      return {
        appPrice: appPriceC,
        menuItemId: menuItemIdA,
        count: count,
        appPriceOriginal: appPriceA,
        basketArray: basketArray,
        specialPrice: appPriceSpecialA,
        /*basketArray: [
          ...prevState.basketArray,
          {id: menuItemIdA, cost: appPriceA},
        ],*/
      };
    });

    fetch('https://www.infohtechict.co.ke/apps/kuismenu/add-cart.php', {
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
        if (responseJsonFromServer == 'added to cart') {
          alert(responseJsonFromServer);
          //this.props.navigation.navigate('Login');
        } else {
          alert('Something went wrong');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  postCart = () => {
    //alert("yo");
    //onButtonPress = () => this.props.navigation.navigate("Login");
  };

  componentDidMount() {
    const url = 'https://www.infohtechict.co.ke/apps/kuismenu/featured';
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
    this.checkAccess();
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
  };

  render() {
    const {navigate} = this.props.navigation;
    const linedata = {
      labels: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      datasets: [
        {
          data: [20, 45, 28, 80, 99, 43, 50],
          strokeWidth: 2, // optional
        },
      ],
    };

    const barData = {
      labels: ['May', 'June', 'July', 'August', 'September', 'October'],
      datasets: [
        {
          data: [20, 45, 28, 80, 99, 43],
        },
      ],
    };

    const pieData = [
      {
        name: 'Nairobi',
        population: 21500000,
        color: 'rgba(131, 167, 234, 1)',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'Nakuru',
        population: 2800000,
        color: '#F00',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'Kiambu',
        population: 527612,
        color: 'red',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'Kisumu',
        population: 8538000,
        color: '#ffffff',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'Mombasa',
        population: 11920000,
        color: 'rgb(0, 0, 255)',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
    ];

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.detail2}>Hit trends</Text>
          <LineChart
            data={linedata}
            width={containerWidth} // from react-native
            height={220}
            yAxisLabel={''}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />

          <PieChart
            data={pieData}
            width={containerWidth}
            height={220}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />

          <BarChart
            // style={graphStyle}
            data={barData}
            width={containerWidth}
            height={220}
            borderRadius={50}
            yAxisLabel={'$'}
            chartConfig={{
              backgroundColor: 'pink',
              backgroundGradientFrom: 'pink',
              backgroundGradientTo: 'green',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 50,
              },
            }}
          />
        </View>
        <DisplayModal WhipId="1" display={this.state.display} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    padding: pagePadding2,
  },
  chartConfig: {
    backgroundColor: '#e26a00',
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
    fontSize: 12,
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
