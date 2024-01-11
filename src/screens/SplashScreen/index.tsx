import React, {useCallback, useEffect, useState} from 'react';
import {Center, Image, Spinner} from 'native-base';
import {LoginLogo} from '../../assets/images/logos';
import {PermissionsAndroid} from 'react-native';
import {runMigrationsSL} from '../../database/migrations/sl';
import SyncService from '../../services/sync.service';
import {useNetInfo} from '@react-native-community/netinfo';
import {useNavigate} from 'react-router-native';
import PathRoutes from '../../routers/paths';
import {StorageService} from '../../services/storage.service';
import {useCoachContext} from '../../providers/coach.provider';
import {COUNTRY} from '@env';
import {runMigrationsNP} from '../../database/migrations/np';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  const {isConnected} = useNetInfo();
  const [isLoading, setIsLoading] = useState(false);
  const {selectCoach, selectSchool} = useCoachContext();

  const setupApp = useCallback(async () => {
    setIsLoading(true);
    try {
      if (!isLoading) {
        console.log('CURRENT COUNTRY ->', COUNTRY);
        if (COUNTRY === 'sl') await runMigrationsSL();
        if (COUNTRY === 'np') await runMigrationsNP();

        await requestPermission();

        const currentCoach = await StorageService.getCurrentCoach();
        const currentSchool = await StorageService.getCurrentSchool();

        if (isConnected && currentSchool) {
          await SyncService.trySyncData();
        }

        selectCoach(currentCoach);
        selectSchool(currentSchool);

        if (!currentSchool) {
          navigate(PathRoutes.selectSchool, {replace: true});
        } else if (!currentCoach) {
          navigate(PathRoutes.selectAccount, {replace: true});
        } else {
          navigate(PathRoutes.home.main, {replace: true});
        }
      }
    } catch {}
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

  useEffect(() => {
    setupApp();
  }, [setupApp]);

  return (
    <Center flex={1}>
      <Image source={LoginLogo} alt={'User icon'} />
      <Spinner size="lg" mt="32px" />
    </Center>
  );
};

export default SplashScreen;
