import ClassScreen from "../../container/classRoom/Screen";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

const HomeStack = createStackNavigator();

function HomeStackNavigation() {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen
        name="Home"
        options={{ headerShown: false }}
        component={ClassScreen}
      />
    </HomeStack.Navigator>
  );
}

export default HomeStackNavigation;
