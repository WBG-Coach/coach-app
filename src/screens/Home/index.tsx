import React, {useEffect, useState} from 'react';
import {TeacherItemType} from '../../types/teacher';
import {useNavigate} from 'react-router-native';
import HorizontalMenu from './HorizontalMenu';
import PathRoutes from '../../routers/paths';
import TeachersList from './TeachersList';
import {Spinner, VStack} from 'native-base';
import Page from '../../components/Page';
import HomeHeader from './HomeHeader';
import {isTablet} from 'react-native-device-info';
import BottomNavigator from './BottomNavigator';
import {StorageService} from '../../services/storage.service';
import SyncService from '../../services/sync.service';

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const asyncFunction = async () => {
      const lastSync = await StorageService.getLastSync();
      const ONE_HOUR = 60 * 60 * 1000;

      if (
        !lastSync ||
        new Date().getTime() - new Date(lastSync).getTime() > ONE_HOUR
      ) {
        console.log('START SYNC');
        setIsLoading(true);
        await SyncService.trySyncData();
        setIsLoading(false);
      }
    };

    asyncFunction();
  }, []);

  const onSelectTeacher = (teacher: TeacherItemType) => {
    navigate(PathRoutes.teacher.details.replace(':id', teacher.id));
  };

  return (
    <Page setting logo noPadding>
      <VStack w="full" flex={1} p={isTablet() ? '32px 64px' : '16px 24px'}>
        <HomeHeader />

        <HorizontalMenu />

        <VStack flex={1} pb={4}>
          {isLoading ? (
            <Spinner size="lg" />
          ) : (
            <TeachersList onSelectTeacher={onSelectTeacher} />
          )}
        </VStack>
      </VStack>

      <BottomNavigator />
    </Page>
  );
};

export default HomeScreen;
