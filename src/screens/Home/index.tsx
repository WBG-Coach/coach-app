import React, {useLayoutEffect} from 'react';
import {isTablet as Tablet} from 'react-native-device-info';
import {Text, VStack} from 'native-base';
import HorizontalMenu from './HorizontalMenu';
import {useTranslation} from 'react-i18next';
import TeachersList from './TeachersList';
import HomeHeader from './HomeHeader';
import {useNetInfo} from '@react-native-community/netinfo';
import {syncWatermelon} from '../../database';

const HomeScreen = () => {
  const isTablet = Tablet();
  const {t} = useTranslation();
  const {isConnected} = useNetInfo();

  useLayoutEffect(() => {
    if (isConnected) {
      syncWatermelon();
    }
  }, [isConnected]);

  return (
    <VStack
      safeAreaBottom
      mt={isTablet ? '64px' : 6}
      px={isTablet ? '32px' : 4}
      flex={1}>
      <HomeHeader />

      <HorizontalMenu />

      <Text mt={6} fontSize={'HSM'} fontWeight={600} color={'gray.800'}>
        {t('home.teachers.title')}
      </Text>

      <VStack flex={1} pb={4}>
        <TeachersList />
      </VStack>
    </VStack>
  );
};

export default HomeScreen;
