import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Image
} from "react-native";

class Photo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={{ height: 400, flex: 1 }}>
        <Text>Photo</Text>
      </View>
    );
  }
}

export default Photo;
