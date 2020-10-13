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
//import { TopSum, BottomSum, TitleLedger } from '../common/text';
//import styles from './style'

const data = [
  {
    date: 'Jul 1, 2016',
    sum: '$2,577.51',
    source: 'Earnings',
    total: '$0.14',
  },
  {
    date: 'Jul 1, 2016',
    sum: '$2,577.51',
    source: 'Earnings',
    total: '$0.14',
  },
];

export default class Details extends Component {
  state = {};
  render() {
    //const rows = this.props.data;
    const rows = data;
    const dataRow = rows.map(row => {
      return (
        <View style={styles.operation}>
          <View style={styles.topSum}>
            <Text>{row.date} </Text>
            <Text>{row.sum} </Text>
          </View>
          <View style={{backgroundColor: 'red'}}>
            <Text>{row.source} </Text>
            <Text>{row.total} </Text>
          </View>
        </View>
      );
    });
    return (
      <View title="BALANCE" style={styles.content}>
        {dataRow}
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
