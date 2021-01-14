import React, { Component } from "react";
import { View, Button, TextInput } from "react-native";

export default class JoinRoom extends Component {
  state = {
    roomId: "",
  };

  onTextChange = (text) => {
    this.setState({
      roomId: text,
    });
  };

  render() {
    return (
      <View>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={(text) => this.onTextChange(text)}
          value={this.state.roomId}
          placeholder="Enter Room Id"
        />
        <Button title="Submit" />
      </View>
    );
  }
}
