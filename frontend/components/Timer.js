import React, { Component } from "react";
import { View, Button } from "react-native";
import io from "socket.io-client";
import CountDown from "react-native-countdown-component";

export default class Timer extends Component {
  state = {
    paused: true,
  };

  componentDidMount() {
    this.socket = io("localhost:3000");
    this.socket.on("buttonPress", () => {
      this.setState({
        paused: !this.state.paused,
      });
      console.log("received button press from server");
    });
  }

  handleButtonPress = () => {
    this.socket.emit("buttonPress");
    console.log("original button press");
  };

  render() {
    return (
      <View>
        <CountDown until={500} running={!this.state.paused} />
        <Button
          onPress={this.handleButtonPress}
          title={this.state.paused ? "PLAY" : "PAUSE"}
        />
      </View>
    );
  }
}
