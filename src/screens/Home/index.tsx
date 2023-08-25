import React, {useEffect} from 'react';
import {TeacherItemType} from '../../types/teacher';
import {useNavigate} from 'react-router-native';
import HorizontalMenu from './HorizontalMenu';
import {useTranslation} from 'react-i18next';
import PathRoutes from '../../routers/paths';
import TeachersList from './TeachersList';
import {Text, VStack} from 'native-base';
import Page from '../../components/Page';
import HomeHeader from './HomeHeader';
import {useCoachContext} from '../../providers/coach.provider';
import {isTablet} from 'react-native-device-info';
import BottomNavigator from './BottomNavigator';
import SyncService from '../../services/sync.service';
import {useNetInfo} from '@react-native-community/netinfo';

const HomeScreen: React.FC = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {selectSchool} = useCoachContext();
  const {isConnected} = useNetInfo();

  const onSelectTeacher = (teacher: TeacherItemType) => {
    navigate(PathRoutes.teacher.details.replace(':id', teacher.id));
  };

  useEffect(() => {
    if (isConnected) {
      SyncService.trySyncData();
    }
  }, [isConnected]);

  return (
    <Page setting logo noPadding>
      <VStack w="full" flex={1} p={isTablet() ? '32px 64px' : '16px 24px'}>
        <HomeHeader />

        <HorizontalMenu />

        <Text mt={6} fontSize={'HSM'} fontWeight={600} color={'gray.800'}>
          {t('home.teachers.title')}
        </Text>

        <VStack flex={1} pb={4}>
          <TeachersList onSelectTeacher={onSelectTeacher} />
        </VStack>
      </VStack>

      <BottomNavigator />
    </Page>
  );
};

export default HomeScreen;
