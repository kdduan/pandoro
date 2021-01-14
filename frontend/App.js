import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Timer from "./components/Timer";
import HomeScreen from "./components/HomeScreen";
import JoinRoom from "./components/JoinRoom";
import CreateRoom from "./components/CreateRoom";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Timer" component={Timer} />
        <Stack.Screen name="JoinRoom" component={JoinRoom} />
        <Stack.Screen name="CreateRoom" component={CreateRoom} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
