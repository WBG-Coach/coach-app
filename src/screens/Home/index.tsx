import React from 'react';
import {TeacherItemType} from '../../types/teacher';
import {useNavigate} from 'react-router-native';
import HorizontalMenu from './HorizontalMenu';
import {useTranslation} from 'react-i18next';
import PathRoutes from '../../routers/paths';
import TeachersList from './TeachersList';
import {Text, VStack} from 'native-base';
import Page from '../../components/Page';
import HomeHeader from './HomeHeader';
import {isTablet} from 'react-native-device-info';
import BottomNavigator from './BottomNavigator';

const HomeScreen: React.FC = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();

  const onSelectTeacher = (teacher: TeacherItemType) => {
    navigate(PathRoutes.teacher.details.replace(':id', teacher.id));
  };

  return (
    <Page setting logo noPadding>
      <VStack w="full" flex={1} p={isTablet() ? '32px 64px' : '16px 24px'}>
        <HomeHeader />

        <HorizontalMenu />

        <VStack flex={1} pb={4}>
          <TeachersList onSelectTeacher={onSelectTeacher} />
        </VStack>
      </VStack>

      <BottomNavigator />
    </Page>
  );
};

export default HomeScreen;
