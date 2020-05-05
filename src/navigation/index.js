import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import Icon from "../components/Icon";
import Typography from "../components/Typography";
import { useTheme } from "../theme";
import useBottomTabHeight from "./hooks/useBottomTabHeight";
import AboutStack from "./stacks/AboutStack";
import ClassRoom from "./stacks/ClassRoomStack";
import HomeStack from "./stacks/HomeStack";
import LiveStack from "./stacks/LiveStack";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const config = {
    Home: {
      icon: "home",
      title: "Início",
    },
    Live: {
      icon: "live",
      title: "Live",
    },
    Classroom: {
      icon: "classroom",
      title: "Classroom",
    },
    About: {
      icon: "list",
      title: "Sobre",
    },
  };

  const {
    palette: { primary, secondary },
  } = useTheme();

  const activeTintColor = secondary;
  const inactiveTintColor = primary;

  return (
    <Tab.Navigator
      tabBarOptions={{
        style: { height: useBottomTabHeight() },
        allowFontScaling: false,
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          return (
            <Icon
              color={focused ? activeTintColor : inactiveTintColor}
              name={config[route.name].icon}
            />
          );
        },
        tabBarLabel: ({ focused }) =>
          focused ? (
            <Typography
              color={focused ? "secondary" : "primary"}
              variant="caption"
            >
              {config[route.name].title}
            </Typography>
          ) : null,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          title: "Início",
        }}
      />
      <Tab.Screen
        name="Live"
        component={LiveStack}
        options={{
          title: "Live",
        }}
      />
      <Tab.Screen
        name="Classroom"
        component={ClassRoom}
        options={{
          title: "Classroom",
        }}
      />
      <Tab.Screen
        name="About"
        component={AboutStack}
        options={{
          title: "Sobre",
        }}
      />
    </Tab.Navigator>
  );
}
