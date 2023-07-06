import React, {useEffect, useState} from 'react';
import {Box, HStack, VStack} from 'native-base';
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
import {isTablet} from 'react-native-device-info';

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
  const IsTablet = isTablet();

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
    <Page logo setting back noPadding>
      <VStack w="full" p={IsTablet ? '32px 64px' : '16px 24px'}>
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
      </VStack>

      <HStack
        mb={2}
        px={IsTablet ? '32px' : '16px'}
        borderBottomWidth={'2px'}
        borderBottomColor={'gray.200'}>
        {tabs.map((item, index) => (
          <TabButton
            key={index}
            label={item.label}
            onPress={() => setSelectedTabIndex(index)}
            isActive={selectedTabIndex === index}
          />
        ))}
      </HStack>

      <VStack
        flex={1}
        w="full"
        px={IsTablet ? '32px' : '16px'}
        pb={IsTablet ? '64px' : '24px'}>
        {tabs[selectedTabIndex].Component}
      </VStack>
    </Page>
  );
};

export default TeacherDetailsScreen;
