import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {isTablet as Tablet} from 'react-native-device-info';
import {HStack, Text, useTheme, VStack} from 'native-base';
import Navigation from '../../services/navigation';
import Icon from '../../components/base/Icon';
import HorizontalMenu from './HorizontalMenu';
import {useTranslation} from 'react-i18next';
import TeachersList from './TeachersList';
import Routes from '../../routes/paths';
import HomeHeader from './HomeHeader';

const HomeScreen = () => {
  const {t} = useTranslation();
  const theme = useTheme();
  const isTablet = Tablet();

  return (
    <VStack
      safeAreaBottom
      mt={isTablet ? '64px' : 6}
      px={isTablet ? '64px' : 4}
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
