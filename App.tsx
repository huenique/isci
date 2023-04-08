import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import FirstAid from './screens/FirsAid';
import Home from './screens/Home';
import NavigationBar from './components/NavigationBar';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            header: (props: any) => <NavigationBar {...props} />,
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="FirstAid" component={FirstAid} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
