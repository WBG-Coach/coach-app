import React, {useEffect, useState} from 'react';
import RootProvider from './providers';
import AppRoutes from './routes';
import {useNetInfo} from '@react-native-community/netinfo';
import './i18n';
import {syncWatermelon} from './database';
import {PermissionsAndroid} from 'react-native';
import NoGeolocation from './components/NoGeolocation';
import {Spinner} from 'native-base';
import SplashScreen from './screens/Splash';

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
