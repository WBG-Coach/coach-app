import React, {useEffect} from 'react';
import RootProvider from './providers';
import AppRoutes from './routes';
import {useNetInfo} from '@react-native-community/netinfo';
import './i18n';
import {syncWatermelon} from './database';

const App = () => {
  const {isConnected} = useNetInfo();

  useEffect(() => {
    if (isConnected) {
      syncWatermelon();
    }
  }, [isConnected]);

  return (
    <RootProvider>
      <AppRoutes />
    </RootProvider>
  );
};

export default App;
