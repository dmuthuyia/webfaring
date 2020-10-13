/**
 developer: Dennis Muthuyia  
 email:  dmuthuyia@gmail.com
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatTextst,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ToastAndroid,
  Alert,
} from 'react-native';
//import { TopSum, BottomSum, TitleLedger } from '../common/text';
//import styles from './style'

const props = {
  cTextent_id: 1,
  cTextent_name: 'Moen, Hickle and Stehr',
  products: [
    {
      product_id: 1,
      product_name: 'Ergonomic Cotton Keyboard',
      product_asin: 'cfq35yoyh64i',
      product_image_url: 'https://unsplash.it/310/676',
      keywords: [
        {
          keyword_id: 1,
          keyword_name: 'nam',
          keyword_country: 'LV',
          ranks: [
            {
              rank_id: 1,
              rank_position: 214,
              rank_page: 2,
              rank_date: '2016-08-16',
            },
            {
              rank_id: 2,
              rank_position: 82,
              rank_page: 3,
              rank_date: '2016-11-12',
            },
          ],
        },
      ],
    },
  ],
};

export default class Details extends Component {
  state = {};
  render() {
    //const rows = this.props.data;
    const prods = props.products.map((item, index) => {
      const keywords = item.keywords.map(cur => {
        return (
          <View>
            <Text>{cur.keyword_name}</Text>
            <Text>{cur.keyword_country}</Text>
          </View>
        );
      });
      return (
        <View key={index}>
          <Text>{item.product_name}</Text>
          <Text>{item.product_image_url}</Text>
          {keywords}
        </View>
      );
    });
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
