import React, {Component} from 'react';

import {
  Text,
  View,
  Platform,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  Item,
  Button,
  ImageBackground,
} from 'react-native';

import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from './requests';
import Webfle from './payments';
import Signexternal from './pendingpayments';

import Assets from '../assets/assets';

import Profile from './profile';
import Places from './places';
import Calendar from './calendar';
import Settings from './settings';
import AboutUs from './about';
import Tickets from './ticket';

import MenuDrawer from './MenuDrawer';
import LocationMap from './locationMap';
import Page from './page';
import Booking from './booking';
import NoticeBoard from './noticeboard';

import Cart from './cart';
import Completeorder from './completeorder';

class Dashboad extends Component {
  render() {
    return (
      <View>
        <AppContainer />
      </View>
    );
  }
}

const DashboardTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({tintColor}) => (
          <Image source={Assets.homeIcon} style={{height: 20, width: 20}} />
        ),
        tabBarOptions: {
          activeTintColor: '#ffffff',
          inactiveTintColor: 'orange',
          style: {
            backgroundColor: '#020202',
            borderTopWidth: 3,
            borderTopColor: 'orange',
          },
          indicatorStyle: {
            backgroundColor: 'red',
          },
        },
      },
    },
    Webfle: {
      screen: Webfle,
      navigationOptions: {
        tabBarLabel: 'Webfle',
        tabBarIcon: ({tintColor}) => (
          <Image source={Assets.webfle} style={{height: 20, width: 20}} />
        ),
        tabBarOptions: {
          activeTintColor: '#ffffff',
          inactiveTintColor: 'orange',
          style: {
            backgroundColor: '#020202',
            borderTopWidth: 3,
            borderTopColor: '#020202',
          },
          indicatorStyle: {
            backgroundColor: 'red',
          },
        },
      },
    },

    Signexternal: {
      screen: Signexternal,
      navigationOptions: {
        tabBarLabel: 'Sign external',
        tabBarIcon: ({tintColor}) => (
          <Image source={Assets.signEternal} style={{height: 20, width: 20}} />
        ),
        tabBarOptions: {
          activeTintColor: '#ffffff',
          inactiveTintColor: 'orange',
          style: {
            backgroundColor: '#020202',
            borderTopWidth: 3,
            borderTopColor: 'orange',
          },
          indicatorStyle: {
            backgroundColor: 'red',
          },
        },
      },
    },
  },
  {
    navigationOptions: ({navigation}) => {
      const {routeName} = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: '' + '  ',
        headerStyle: {
          backgroundColor: '#020202',
        },

        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      };
    },
  },
);

//--------STACK NAVIGATOR 1 ---------------------------------------------------

const DashboardStackNavigator = createStackNavigator(
  {
    DashboardTabNavigator: {screen: DashboardTabNavigator},
    LocationMap: {
      screen: LocationMap,
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#020202',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    },
    Page: {
      screen: Page,
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#020202',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    },
    Cart: {
      screen: Cart,
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#020202',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    },
    Completeorder: {
      screen: Completeorder,
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#020202',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    },

    NoticeBoard: {
      screen: NoticeBoard,
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#020202',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    },
    Booking: {
      screen: Booking,
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#020202',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    },
  },

  {
    defaultNavigationOptions: ({navigation}) => {
      return {
        headerTitle: '',
        headerLeft: () => (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                style={{width: 40, height: 40, marginHorizontal: 10}}
                source={Assets.bkdmenu3}
                name="bkdmenu3"
                size={30}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Dashboard')}>
              <Image
                style={{width: 100, height: 40}}
                source={Assets.logo2}
                name="logo2"
                size={30}
              />
            </TouchableOpacity>
          </View>
        ),
        headerRight: () => (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                style={{width: 40, height: 40, marginHorizontal: 10}}
                source={Assets.bkdsearch1}
                name="ios-list"
                size={30}
              />
            </TouchableOpacity>
          </View>
        ),
      };
    },
  },
);

//--------DRAWER NAVIGATOR 2 ---------------------------------------------------

const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
  drawerWidth: WIDTH * 0.83,
  contentComponent: ({navigation}) => {
    return <MenuDrawer navigation={navigation} />;
  },
};

const DrawerNavigator = createDrawerNavigator(
  {
    Dashboard: {
      //screen: DashboardTabNavigator
      screen: DashboardStackNavigator,
    },
    Profile: {
      screen: Profile,
    },
    Places: {
      screen: Places,
    },
    Tickets: {
      screen: Tickets,
    },
    Calendar: {
      screen: Calendar,
    },
    Settings: {
      screen: Settings,
    },
    AboutUs: {
      screen: AboutUs,
    },
  },
  DrawerConfig,
);

//--------SWITCH NAVIGATOR 1 ---------------------------------------------------

const connectliftwitchNavigator = createSwitchNavigator({
  DrawerNav: {screen: DrawerNavigator},
});

//--------NAVIGATOR CONTAINER 1 ---------------------------------------------------

const AppContainer = createAppContainer(connectliftwitchNavigator);

export default AppContainer;

//--------STYLES ----------------------------------------------------------------

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
  },

  TextStyle: {
    fontSize: 23,
    textAlign: 'center',
    color: '#000',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  btmtab: {
    backgroundColor: 'red',
  },
});
