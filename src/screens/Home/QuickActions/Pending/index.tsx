import React from 'react';
import Page from '../../../../components/Page';
import {Text} from 'native-base';
import {useTranslation} from 'react-i18next';
import {TeacherItemType} from '../../../../types/teacher';
import {useNavigate} from 'react-router-native';
import PathRoutes from '../../../../routers/paths';
import TeachersList from '../../TeachersList';
import {TeacherService} from '../../../../services/teacher.service';
import TeacherItem from './TeacherItem';

const PendingSessionsScreen: React.FC = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();

  const onSelectTeacher = (teacher: TeacherItemType) => {
    navigate(PathRoutes.teacher.details.replace(':id', teacher.id), {
      replace: true,
    });
  };

  return (
    <Page back setting title={t('home.pending.page_title')}>
      <Text fontSize={'HSM'} fontWeight={600} color={'gray.800'}>
        {t('home.pending.title')}
      </Text>

      <Text fontSize={'TMD'} fontWeight={400} color={'gray.800'}>
        {t('home.pending.subtitle')}
      </Text>

      <TeachersList
        onSelectTeacher={onSelectTeacher}
        hideNewTeacherButton
        customProps={{
          service: TeacherService.getTeachersWithPendingSessions,
          TeacherItem,
        }}
      />
    </Page>
  );
};

export default PendingSessionsScreen;
