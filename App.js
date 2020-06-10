import React from "react";
import Homepage from "./app/pages/HomePage.js";
import SinglePost from "./app/pages/SinglePost";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Reactspot">
        <Stack.Screen name="Reactspot" component={Homepage} />
        <Stack.Screen name="Post" component={SinglePost} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
