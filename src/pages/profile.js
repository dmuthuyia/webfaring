import React from "react";
import { StyleSheet, Text, View } from "react-native";

import MenuButton from "./MenuButton";
import Gallery from "react-native-image-gallery";

export default class Profile extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MenuButton navigation={this.props.navigation} />
        <Text style={styles.text}>Profile</Text>
        <Gallery
          style={{ flex: 1, backgroundColor: "black" }}
          images={[
            { source: { uri: "http://i.imgur.com/XP2BE7q.jpg" } },
            { source: { uri: "http://i.imgur.com/5nltiUd.jpg" } },
            { source: { uri: "http://i.imgur.com/6vOahbP.jpg" } },
            { source: { uri: "http://i.imgur.com/kj5VXtG.jpg" } }
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 30
  }
});
