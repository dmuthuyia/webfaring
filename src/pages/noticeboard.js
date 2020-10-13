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
  Alert,
} from 'react-native';

//import console = require("console");

export default class noticeBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      isLoading: true,
    };
  }

  ticketNow = (venue, event, fee, currency) => {
    if (fee > 0) {
      Alert.alert(
        'Ticket details',
        'Buy ' + venue + "'s " + event + '- ticket at ' + fee + ' ' + currency,
        [
          {text: 'No, go back', style: 'cancel'},
          {text: 'Yes', onPress: this.toBuyTicket},
        ],
        {cancelable: false},
      );
      return true;
    } else {
      alert(
        'This event is either free or they are not selling tickets on this platform',
      );
    }
  };

  toBuyTicket = async () => {
    try {
      this.props.navigation.navigate('Login');
    } catch (error) {
      alert('error');
    }
  };

  renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={{flex: 1, flexDirection: 'row', marginBottom: 3}}
        //onPress={() => ToastAndroid.show(item.UserName, ToastAndroid.SHORT)}
        //onPress={() =>this.props.navigation.navigate("LocationMap", { itemId: 86 })}
        onPress={() =>
          this.props.navigation.navigate('LocationMap', {
            ltd: item.latitude,
            lng: item.longitude,
          })
        }>
        <Image
          style={{width: 60, height: 60, margin: 5}}
          source={{
            uri:
              'https://boukd.com/apps/boukd/images/places/' +
              item.noticeBoard_img,
          }}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            borderBottomEndRadius: 20,
            marginRight: 5,
            backgroundColor: '#ded9d9',
          }}>
          <Text style={{fontSize: 18, color: '#020202', marginBottom: 1}}>
            {item.venue_name}
          </Text>
          <Text>
            Main Acts: ({item.headliner1_name} . {item.headliner2_name} .
            {item.headliner3_name})
          </Text>
          <Text style={{fontSize: 14, color: 'green'}}>{item.description}</Text>
          <TouchableOpacity style={{width: 400}}>
            <View
              style={{
                fontSize: 18,
                color: '#020202',
                marginBottom: 1,
                backgroundColor: '#e3bfe2',
                width: 100,
                height: 20,
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                onPress={this.ticketNow.bind(
                  this,
                  item.venue_name,
                  item.event_name,
                  item.ticket,
                  item.currency,
                )}
                style={{
                  fontSize: 12,
                  color: 'black',
                }}>
                Ticket
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  renderSeparator = () => {
    return <View style={{height: 1, width: '100%', backgroundColor: 'gray'}} />;
  };

  componentDidMount() {
    const url = 'https://boukd.com/apps/boukd/noticeBoard.php';
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
          keyExtractor={(item, index) => index.toString()}
          //ItemSeparatorComponent={this.renderSeparator}
        />
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
});
