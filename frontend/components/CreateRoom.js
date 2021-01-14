import React, { Component } from "react";
import { View, Button, TextInput } from "react-native";
import { create } from "react-test-renderer";

import { createRoom } from "../utils/firebase";

export default class JoinRoom extends Component {
  state = {
    roomId: "",
  };

  onTextChange = (text) => {
    this.setState({
      roomId: text,
    });
  };

  createRoomHandler = () => {
    createRoom(this.state.roomId);
    this.props.navigation.navigate("Timer");
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
        <Button title="Submit" onPress={this.createRoomHandler} />
      </View>
    );
  }
}
