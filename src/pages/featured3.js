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
  ScrollView,
  ImageBackground,
} from 'react-native';

import Assets from '../assets/assets';

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);
  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;

  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({key: `blank-${numColumns}`, empty: true});
    numberOfElementsLastRow = numberOfElementsLastRow + 1;
  }

  return data;
};
const numColumns = 2;

export default class Featured extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      isLoading: true,
    };
  }

  renderItem = ({item}) => {
    //if (item.empty === true) {
    //return <View style={styles.invisibleItem} />;
    //}
    return (
      <TouchableOpacity
        style={{flex: 1, marginBottom: 3}}
        //onPress={() => ToastAndroid.show(item.UserName, ToastAndroid.SHORT)}
        onPress={() =>
          this.props.navigation.navigate('Page', {
            pId: item.id,
            dp: item.skillprofile_img,
            userName: item.UserName,
            birthName: item.FirstName + ' ' + item.LastName,
            country: item.Country,
            city: item.City,
            dob: item.dobday + '/' + item.dobmonth + '/' + item.dobyear,
          })
        }>
        <View
          style={{
            margin: 3,
            height: 200,
            backgroundColor: '#FFEFD5',
            opacity: 0.9,
            borderRadius: 10,
          }}>
          <View style={{flex: 1, padding: 3}}>
            <Image
              style={{flex: 1}}
              resizeMode="cover"
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
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 14,
                color: 'blue',
                marginBottom: 1,
              }}>
              {item.item_name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderSeparator = () => {
    return <View style={{height: 1, width: '100%', backgroundColor: 'gray'}} />;
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
  }
  render() {
    return this.state.isLoading ? (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#330066" animating />
      </View>
    ) : (
      <View style={[styles.container]}>
        <FlatList
          data={formatData(this.state.dataSource, numColumns)}
          renderItem={this.renderItem}
          //keyExtractor={(item, index) => "list-item-${index}"}
          keyExtractor={(item, index) => index.toString()}
          //ItemSeparatorComponent={this.renderSeparator}
          numColumns={numColumns}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d6adee',
    flex: 1,
    paddingTop: 5,
  },
  invisibleItem: {
    backgroundColor: 'transparent',
  },
});
