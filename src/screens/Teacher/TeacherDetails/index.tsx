import React, {useEffect, useState} from 'react';
import {Box, HStack} from 'native-base';
import {useNavigate, useParams} from 'react-router-native';
import Page from '../../../components/Page';
import TeacherHeader from './TeacherHeader';
import {TeacherDetailsType} from '../../../types/teacher';
import {TeacherService} from '../../../services/teacher.service';
import {useCoachContext} from '../../../providers/coach.provider';
import PathRoutes from '../../../routers/paths';
import TeacherStatsTab from './Tabs/TeacherStats';
import TabButton from '../../../components/TabButton';
import SessionList from './Tabs/SessionListTab';

type params = {
  id: string;
  tabIndex: string;
};

const TeacherDetailsScreen: React.FC = () => {
  const {id, tabIndex} = useParams<params>();
  const defaultTab = tabIndex === ':tabIndex' ? 0 : parseInt(tabIndex || '0');
  const [selectedTabIndex, setSelectedTabIndex] = useState(defaultTab);
  const [teacher, setTeacher] = useState<TeacherDetailsType>();
  const {currentSchool} = useCoachContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      TeacherService.getTeacherDetails(id).then(setTeacher);
    }
  }, [id]);

  const tabs = [
    {
      Component: <SessionList teacherId={id || ''} />,
      label: 'teacher.tabs.session.title',
    },
    {
      Component: <TeacherStatsTab teacherId={id || ''} />,
      label: 'teacher.tabs.stats.title',
    },
  ];

  return (
    <Page logo setting back>
      {teacher && currentSchool ? (
        <TeacherHeader
          name={teacher.name}
          image={teacher.image}
          subject={teacher.subject}
          school={currentSchool.name}
          onEditPress={() =>
            navigate(PathRoutes.teacher.form.replace(':id', teacher.id))
          }
        />
      ) : (
        <Box w="full" h="110px" bg="gray.100" />
      )}

      <HStack mb={2}>
        {tabs.map((item, index) => (
          <TabButton
            key={index}
            label={item.label}
            onPress={() => setSelectedTabIndex(index)}
            isActive={selectedTabIndex === index}
          />
        ))}
      </HStack>
      {tabs[selectedTabIndex].Component}
    </Page>
  );
};

export default TeacherDetailsScreen;
