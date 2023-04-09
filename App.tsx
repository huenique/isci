import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppContainer from './screens';

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContainer />
    </SafeAreaProvider>
  );
}
