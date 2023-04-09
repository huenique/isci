import React from 'react';
import { BottomNavigation } from 'react-native-paper';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CommonActions, NavigationContainer } from '@react-navigation/native';

import FirstAid from './FirsAid';
import Home from './Home';
import Information from './Information';
import Evacuation from './Evacuation';
import Contacts from './Contacts';
import NavigationBar from '../components/NavigationBar';

const Tab = createBottomTabNavigator();

export default function AppContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          header: (props) => <NavigationBar {...props} />
        }}
        initialRouteName="Home"
        tabBar={({ navigation, state, descriptors, insets }) => (
          <BottomNavigation.Bar
            navigationState={state}
            safeAreaInsets={insets}
            onTabPress={({ route, preventDefault }) => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true
              });

              if (event.defaultPrevented) {
                preventDefault();
              } else {
                navigation.dispatch({
                  ...CommonActions.navigate(route.name, route.params),
                  target: state.key
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
            style={{
              backgroundColor: '#ffffff'
            }}
          />
        )}
      >
        <Tab.Screen
          name="Contacts"
          component={Contacts}
          options={{
            tabBarLabel: 'Contacts',
            tabBarIcon: ({ color, size }) => {
              return (
                <MaterialCommunityIcons
                  name="contacts"
                  size={size}
                  color={color}
                />
              );
            }
          }}
        />
        <Tab.Screen
          name="Evacuation"
          component={Evacuation}
          options={{
            tabBarLabel: 'Evacuation',
            tabBarIcon: ({ color, size }) => {
              return (
                <MaterialCommunityIcons
                  name="exit-run"
                  size={size}
                  color={color}
                />
              );
            }
          }}
        />
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => {
              return (
                <MaterialCommunityIcons name="home" size={size} color={color} />
              );
            }
          }}
        />
        <Tab.Screen
          name="First Aid"
          component={FirstAid}
          options={{
            tabBarLabel: 'First Aid',
            tabBarIcon: ({ color, size }) => {
              return (
                <MaterialCommunityIcons
                  name="medical-bag"
                  size={size}
                  color={color}
                />
              );
            }
          }}
        />
        <Tab.Screen
          name="Information"
          component={Information}
          options={{
            tabBarLabel: 'Information',
            tabBarIcon: ({ color, size }) => {
              return (
                <MaterialCommunityIcons
                  name="information-outline"
                  size={size}
                  color={color}
                />
              );
            }
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
