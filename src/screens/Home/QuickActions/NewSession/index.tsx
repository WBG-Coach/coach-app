import React from 'react';
import {TeacherItemType} from '../../../../types/teacher';
import PathRoutes from '../../../../routers/paths';
import {useNavigate} from 'react-router-native';
import Page from '../../../../components/Page';
import TeachersList from '../../TeachersList';
import {useTranslation} from 'react-i18next';
import {Text} from 'native-base';

const QuickNewSessionScreen: React.FC = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();

  const onSelectTeacher = (teacher: TeacherItemType) => {
    navigate(
      PathRoutes.classObservation.about.replace(':teacherId', teacher.id),
      {replace: true},
    );
  };

  return (
    <Page back setting logo>
      <Text fontSize={'HSM'} fontWeight={600} color={'gray.800'}>
        {t('quickAccess.newSession.title')}
      </Text>
      <Text fontSize={'TMD'} fontWeight={400} color={'gray.800'} mt={2} mb={4}>
        {t('quickAccess.newSession.subtitle')}
      </Text>
      <TeachersList
        showSearchFilter
        hideNewTeacherButton
        onSelectTeacher={onSelectTeacher}
      />
    </Page>
  );
};

export default QuickNewSessionScreen;
