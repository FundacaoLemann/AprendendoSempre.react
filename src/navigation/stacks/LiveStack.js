import LiveScreen from '../../container/live/Screen';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

const HomeStack = createStackNavigator();

function HomeStackNavigation() {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen name="Home" component={LiveScreen} />
    </HomeStack.Navigator>
  );
}

export default HomeStackNavigation;
