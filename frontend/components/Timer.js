import React, { Component } from "react";
import { View, Button } from "react-native";
import io from "socket.io-client";
import CountDown from "react-native-countdown-component";

export default class Timer extends Component {
  state = {
    paused: null,
    timeLeft: null, // in seconds
  };

  componentDidMount() {
    this.socket = io("localhost:3000");
    this.socket.emit("connectionStart");

    this.socket.on("connectionStart", (initialServerState) => {
      this.setState({
        paused: initialServerState.paused,
        timeLeft: initialServerState.timeLeft,
      });
      console.log("timer time left:", initialServerState.timeLeft);
      console.log("[client] connection initialized");
    });

    this.socket.on("buttonPress", (serverState) => {
      this.setState({
        paused: serverState.paused,
      });
    });
  }

  handleButtonPress = () => {
    this.socket.emit("buttonPress");
  };

  render() {
    const countdown = this.state.timeLeft ? (
      <CountDown
        until={this.state.timeLeft}
        running={!this.state.paused}
        timeToShow={["M", "S"]}
      />
    ) : null;

    return (
      <View>
        {countdown}
        <Button
          onPress={this.handleButtonPress}
          title={this.state.paused ? "PLAY" : "PAUSE"}
        />
      </View>
    );
  }
}
