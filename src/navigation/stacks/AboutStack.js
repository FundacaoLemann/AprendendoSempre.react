import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AboutScreen from '../../container/about/Screen';

const HomeStack = createStackNavigator();

function HomeStackNavigation() {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen name="Home" component={AboutScreen} options={{ headerShown: false }} />
    </HomeStack.Navigator>
  );
}

export default HomeStackNavigation;
