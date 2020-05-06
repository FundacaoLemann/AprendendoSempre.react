import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LiveScreen from '../../container/live/Screen';

const HomeStack = createStackNavigator();

function HomeStackNavigation() {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen name="Home" component={LiveScreen} options={{ headerShown: false }} />
    </HomeStack.Navigator>
  );
}

export default HomeStackNavigation;
