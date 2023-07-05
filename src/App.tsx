import React, {useCallback, useEffect, useState} from 'react';
import {useNetInfo} from '@react-native-community/netinfo';
import {CoachProvider} from './providers/coach.provider';
import {NativeBaseProvider, Spinner} from 'native-base';
import {runMigrations} from './database/migrations';
import SyncService from './services/sync.service';
import {NativeRouter} from 'react-router-native';
import {PermissionsAndroid} from 'react-native';
import RouterProvider from './routers';
import theme from './theme';
import './i18n';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {isConnected} = useNetInfo();

  const setupApp = useCallback(async () => {
    await runMigrations();
    await requestPermission();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setupApp();
  }, [setupApp]);

  useEffect(() => {
    if (!isLoading && isConnected) {
      SyncService.trySyncData();
    }
  }, [isLoading, isConnected]);

  const requestPermission = async () => {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NativeBaseProvider theme={theme}>
      <CoachProvider>
        <NativeRouter>
          {isLoading ? <Spinner /> : <RouterProvider />}
        </NativeRouter>
      </CoachProvider>
    </NativeBaseProvider>
  );
};

export default App;
