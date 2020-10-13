import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import Assets from "../assets/assets";

export default class MenuButton extends React.Component {
  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
          <Image
            style={{ width: 40, height: 40 }}
            source={Assets.bkdmenu3}
            name="ios-list"
            size={30}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menuIcon: {
    zIndex: 9,
    position: "absolute",
    top: 0,
    left: 20
  }
});
