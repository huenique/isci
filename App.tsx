import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider
} from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppContainer from './screens';
import { scheduleUserNotification } from './utils/notification';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#9384D1',
    secondary: '#9F9FB7'
  }
};

export default function App() {
  React.useEffect(() => {
    scheduleUserNotification();
  }, []);

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <StatusBar
          style="light"
          backgroundColor={theme.colors.primary}
          translucent={true}
        />
        <AppContainer />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
