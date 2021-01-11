import React, { Component } from "react";
import { Text, View, Button } from "react-native";
import io from "socket.io-client";
import CountDown from "react-native-countdown-component";

export default class Timer extends Component {
  state = {
    paused: null,
    timeLeft: null, // in seconds
    roomId: null,
  };

  componentWillMount() {
    // randomly generate roomId
    const randNum = Math.floor(Math.random() * 2 + 1);
    console.log(randNum);
    this.setState({
      roomId: randNum,
    });
  }

  componentDidMount() {
    this.socket = io("localhost:3000");
    this.socket.emit("connectionStart", {
      roomId: this.state.roomId,
    });

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
    this.socket.emit("buttonPress", {
      roomId: this.state.roomId,
    });
  };

  render() {
    const countdown = this.state.timeLeft ? (
      <CountDown
        until={this.state.timeLeft}
        running={!this.state.paused}
        timeToShow={["M", "S"]}
      />
    ) : null;

    const title = this.state.roomId ? (
      <Text>{"Room " + this.state.roomId}</Text>
    ) : null;

    return (
      <View>
        {title}
        {countdown}
        <Button
          onPress={this.handleButtonPress}
          title={this.state.paused ? "PLAY" : "PAUSE"}
        />
      </View>
    );
  }
}
