import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, View} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';
import NoGeolocation from './components/NoGeolocation';
import SplashScreen from './screens/Splash';
import {syncWatermelon} from './database';
import RootProvider from './providers';
import AppRoutes from './routes';
import './i18n';

const App = () => {
  const [isGeolocationApproved, setIsGeolocationApproved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const {isConnected} = useNetInfo();

  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    if (isConnected && isGeolocationApproved) {
      syncWatermelon();
    }
  }, [isConnected, isGeolocationApproved]);

  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setIsGeolocationApproved(true);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <RootProvider>
      {isLoading ? (
        <SplashScreen />
      ) : isGeolocationApproved ? (
        <AppRoutes />
      ) : (
        <NoGeolocation requestPermission={requestPermission} />
      )}
    </RootProvider>
  );
};

export default App;
