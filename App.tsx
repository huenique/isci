import React from "react";
import { BottomNavigation } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CommonActions, NavigationContainer } from "@react-navigation/native";

import FirstAid from "./screens/FirsAid";
import Home from "./screens/Home";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          tabBar={({ navigation, state, descriptors, insets }) => (
            <BottomNavigation.Bar
              navigationState={state}
              safeAreaInsets={insets}
              onTabPress={({ route, preventDefault }) => {
                const event = navigation.emit({
                  type: "tabPress",
                  target: route.key,
                  canPreventDefault: true,
                });

                if (event.defaultPrevented) {
                  preventDefault();
                } else {
                  navigation.dispatch({
                    ...CommonActions.navigate(route.name, route.params),
                    target: state.key,
                  });
                }
              }}
              renderIcon={({ route, focused, color }) => {
                const { options } = descriptors[route.key];
                if (options.tabBarIcon) {
                  return options.tabBarIcon({ focused, color, size: 24 });
                }

                return null;
              }}
              getLabelText={({ route }: { route: any }) => {
                const { options } = descriptors[route.key];
                const label =
                  options.tabBarLabel !== undefined
                    ? options.tabBarLabel
                    : options.title !== undefined
                    ? options.title
                    : route.title;

                return label;
              }}
            />
          )}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color, size }) => {
                return (
                  <MaterialCommunityIcons
                    name="home"
                    size={size}
                    color={color}
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name="First Aid"
            component={FirstAid}
            options={{
              tabBarLabel: "Settings",
              tabBarIcon: ({ color, size }) => {
                return (
                  <MaterialCommunityIcons
                    name="cog"
                    size={size}
                    color={color}
                  />
                );
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
