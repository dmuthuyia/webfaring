import React, { Component } from "react";
import { View, Button, StyleSheet } from "react-native";
import DisplayModal from "./DisplayModal";

export default class App extends Component {
  state = {
    display: false
  };

  triggerModal() {
    this.setState(prevState => {
      return {
        display: true
      };
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={() => this.triggerModal()}
          title="Open Modal"
          color="orange"
        />
        <DisplayModal
          data="Krunal"
          display={this.state.display}
          parentMethod={this.triggerModal}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 300
  }
});
