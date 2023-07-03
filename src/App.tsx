import React, {useCallback, useEffect, useState} from 'react';
import {NativeBaseProvider, Spinner} from 'native-base';
import {runMigrations} from './database/migrations';
import {PermissionsAndroid} from 'react-native';
import RouterProvider from './routers';
import theme from './theme';
import './i18n';
import {NativeRouter} from 'react-router-native';
import {CoachProvider} from './providers/coach.provider';
import {useNetInfo} from '@react-native-community/netinfo';
import SyncService from './services/sync.service';

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
    if (isConnected) {
      SyncService.trySyncData();
    }
  }, [isConnected]);

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
