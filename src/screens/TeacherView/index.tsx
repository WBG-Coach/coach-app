import React, {useContext, useState} from 'react';
import {Center, HStack, Image, Text, useTheme, VStack} from 'native-base';
import Icon from '../../components/base/Icon';
import {UserContext} from '../../providers/contexts/UserContext';
import SessionTab from './Tabs/Session';
import {isTablet as Tablet} from 'react-native-device-info';
import {useTranslation} from 'react-i18next';
import Navigation from '../../services/navigation';
import Routes from '../../routes/paths';
import TeacherStatsTab from './Tabs/TeacherStats';
import TabButton from './TabButton';
import {TouchableOpacity} from 'react-native';

type Props = {
  route: {
    params: {
      tabIn: number;
    };
  };
};

const tabs = [
  {
    Component: <SessionTab />,
    label: 'teacher.tabs.session.title',
  },
  {
    Component: <TeacherStatsTab />,
    label: 'teacher.tabs.stats.title',
  },
];

const TeacherView: React.FC<any> = ({route: {params}}: Props) => {
  const [tabSelected, setTabSelected] = useState(tabs[params.tabIn || 0]);

  const {teacher} = useContext(UserContext);
  const {user} = useContext(UserContext);
  const {t} = useTranslation();
  const isTablet = Tablet();
  const theme = useTheme();

  return (
    <VStack flex={1} mt={6}>
      <VStack px={isTablet ? '64px' : 4}>
        <HStack
          alignItems={'center'}
          w={'100%'}
          justifyContent={'space-between'}>
          <Center
            w={isTablet ? '48px' : '40px'}
            h={isTablet ? '48px' : '40px'}
            borderRadius={'500px'}
            background={'primary.100'}>
            {teacher?.image?.value ? (
              <Image
                source={{uri: teacher.image.value}}
                alt={'Teacher image'}
                w={'100%'}
                h={'100%'}
                borderRadius={'500px'}
              />
            ) : (
              <Icon name={'user'} />
            )}
          </Center>

          <TouchableOpacity
            onPress={() =>
              Navigation.navigate(Routes.teacher.create, {
                teacher_id: teacher?.id,
              })
            }>
            <HStack
              alignItems={'center'}
              space={2}
              borderRadius={'8px'}
              borderWidth={'1px'}
              borderColor={'primary.200'}
              p={3}>
              <Icon name={'pen'} color={theme.colors.primary['200']} />
              <Text fontSize={'LMD'} fontWeight={500} color={'primary.200'}>
                {t('teacher.tabs.stats.editTeacher') || 'Edit teacher'}
              </Text>
            </HStack>
          </TouchableOpacity>
        </HStack>

        <HStack mt={2} alignItems={'center'}>
          <VStack flex={1} space={2}>
            <Text fontSize={'HXS'} fontWeight={600} color={'gray.800'}>
              {teacher?.name}
            </Text>

            <Text fontSize={'TMD'} fontWeight={400} color={'gray.800'}>
              {t('teacher.description')
                .replace('$name', teacher?.name)
                .replace('$school', user?.school?.name as string)}
            </Text>
          </VStack>
        </HStack>
      </VStack>

      <HStack
        mt={4}
        pb={2}
        w={'100%'}
        borderBottomWidth={'2px'}
        px={isTablet ? '64px' : 4}
        borderBottomColor={'gray.200'}>
        {tabs.map((item, index) => (
          <TabButton
            tab={item}
            index={index}
            onPress={() => setTabSelected(item)}
            isActive={item.label === tabSelected.label}
          />
        ))}
      </HStack>

      {tabSelected.Component}
    </VStack>
  );
};

export default TeacherView;
