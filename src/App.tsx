import React from 'react';
import {CoachProvider} from './providers/coach.provider';
import {NativeBaseProvider, Spinner} from 'native-base';
import {NativeRouter} from 'react-router-native';
import RouterProvider from './routers';
import theme from './theme';
import './i18n';

const App = () => {
  return (
    <NativeBaseProvider theme={theme}>
      <CoachProvider>
        <NativeRouter>
          <RouterProvider />
        </NativeRouter>
      </CoachProvider>
    </NativeBaseProvider>
  );
};

export default App;
