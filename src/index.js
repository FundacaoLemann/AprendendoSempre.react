import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {DefaultTheme} from '@react-navigation/native';
import Root from './navigation';
import {ThemeProvider} from './theme';

function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer
          theme={{
            ...DefaultTheme,
            colors: {
              ...DefaultTheme.colors,
              background: '#fff',
            },
          }}>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
