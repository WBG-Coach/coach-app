import React, {useState} from 'react';
import {TeacherItemType} from '../../../../types/teacher';
import PathRoutes from '../../../../routers/paths';
import {useNavigate} from 'react-router-native';
import Page from '../../../../components/Page';
import {useTranslation} from 'react-i18next';
import {HStack, Text, VStack} from 'native-base';
import TeachersListWithSessions from './TeachersList';
import TabButton from '../../../../components/TabButton';
import {isTablet} from 'react-native-device-info';

const QuickStatsScreen: React.FC = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const IsTablet = isTablet();

  const tabs = [
    {
      label: t('home.stats.tabs.available' || 'Available statistics'),
      type: 'available',
    },
    {
      label: t('home.stats.tabs.unavailable' || 'Unavailable statistics'),
      type: 'unavailable',
    },
  ];

  const onSelectTeacher = (teacher: TeacherItemType) => {
    navigate(
      PathRoutes.teacher.details
        .replace(':id', teacher.id)
        .replace(':tabIndex?', '1'),
      {
        replace: true,
      },
    );
  };

  return (
    <Page back setting title={t('home.stats.page_title')} noPadding>
      <Text
        px={IsTablet ? '32px' : '16px'}
        fontSize={'HSM'}
        fontWeight={600}
        color={'gray.800'}>
        {t('home.stats.title')}
      </Text>

      <HStack
        mb={2}
        px={IsTablet ? '32px' : '16px'}
        borderBottomWidth={'2px'}
        borderBottomColor={'gray.200'}>
        {tabs.map((item, index) => (
          <TabButton
            key={index}
            label={item.label}
            onPress={() => setTab(index)}
            isActive={tab === index}
          />
        ))}
      </HStack>

      <VStack w={'full'} flex={1} px={IsTablet ? '32px' : '16px'}>
        <TeachersListWithSessions
          type={tabs[tab].type as any}
          onSelectTeacher={onSelectTeacher}
        />
      </VStack>
    </Page>
  );
};

export default QuickStatsScreen;
