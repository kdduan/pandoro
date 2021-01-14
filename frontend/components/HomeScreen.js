import React, { Component } from "react";
import { Text, View, Button } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Page</Text>
      <Button
        title="Join Room"
        onPress={() => navigation.navigate("JoinRoom")}
      />
      <Button
        title="Create Room"
        onPress={() => navigation.navigate("CreateRoom")}
      />
    </View>
  );
}
