import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppContainer from './screens';
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider
} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#C0C4FF'
  }
};

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <AppContainer />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
