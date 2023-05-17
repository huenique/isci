import * as React from 'react';
import { Easing } from 'react-native';
import { BottomNavigation, useTheme } from 'react-native-paper';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CommonActions, NavigationContainer } from '@react-navigation/native';

import NavigationBar from '../components/NavigationBar';
import EmergencyContacts from './EmergencyContacts';
import EvacuationCenter from './EvacuationCenter';
import FirstAid from './FirstAid';
import Home from './Home';
import InformationAssistance from './InformationAssistance';

const Tab = createBottomTabNavigator();

export default function AppContainer() {
  const theme = useTheme();

  return (
    <NavigationContainer>
      <Tab.Navigator
        backBehavior="history"
        screenOptions={{
          header: (props) => <NavigationBar {...props} />
        }}
        initialRouteName="Home"
        tabBar={({ navigation, state, descriptors, insets }) => (
          <BottomNavigation.Bar
            animationEasing={Easing.elastic(1)}
            shifting={true}
            theme={{ colors: { secondaryContainer: theme.colors.primary } }}
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
              backgroundColor: theme.colors.background
            }}
          />
        )}
      >
        <Tab.Screen
          name="Emergency Contacts"
          component={EmergencyContacts}
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
          name="Evacuation Center"
          component={EvacuationCenter}
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
          name="Information Assistance"
          component={InformationAssistance}
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
