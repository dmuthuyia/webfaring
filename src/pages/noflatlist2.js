import React, {Component} from 'react';
import {
  AppRegistry,
  ListView,
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

var REQUEST_URL = 'https://facebook.github.io/react-native/movies.json';
//var REQUEST_URL = "https://boukd.com/apps/boukd/whipup.php";

export default class WPReact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //Lets initialize results with the same struct we expect to receive from the api
      results: {
        title: '',
        description: '',
        movies: [],
      },
    };
    //Using ES6 we need to bind methods to access 'this'
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          results: responseData,
        });
      })
      .done();
  }

  render() {
    //this.state.results.movies is the array you have to iterate
    contents = this.state.results.movies.map(item => {
      //We need to return the corresponding mapping for each item too.
      return (
        <View key={item.title} style={styles.container}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      );
    });
    return <View style={styles.container}>{contents}</View>;
  }
}

var Dimensions = require('Dimensions');

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#020202',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  text: {
    fontSize: 18,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
