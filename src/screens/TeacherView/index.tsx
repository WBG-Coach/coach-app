import {Box, Center, HStack, Image, Text, useTheme, VStack} from 'native-base';
import React, {useContext, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from '../../components/base/Icon';
import {UserContext} from '../../providers/contexts/UserContext';
import SessionTab from './Tabs/Session';
import {isTablet as Tablet} from 'react-native-device-info';
import {useTranslation} from 'react-i18next';
import Navigation from '../../services/navigation';
import Routes from '../../routes/paths';

const TeacherView: React.FC<any> = () => {
  const {teacher} = useContext(UserContext);
  const {t} = useTranslation();
  const tabs = [
    {
      Component: <SessionTab />,
      label: t('teacher.tabs.session.title'),
    },
    {
      Component: <></>,
      label: t('teacher.tabs.stats.title'),
    },
  ];

  const [tabSelected, setTabSelected] = useState(tabs[0]);
  const {user} = useContext(UserContext);
  const isTablet = Tablet();
  const theme = useTheme();

  return (
    <VStack flex={1} mt={6}>
      <VStack px={isTablet ? '64px' : 4}>
        <Image
          src={teacher?.image.value}
          alt={'Teacher image'}
          w={'48px'}
          h={'48px'}
          borderRadius={'500px'}
        />

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

          <TouchableOpacity
            onPress={() =>
              Navigation.navigate(Routes.teacher.create, {
                teacher_id: teacher?.id,
              })
            }>
            <Center
              w={'40px'}
              h={'40px'}
              borderRadius={'500px'}
              borderWidth={'1px'}
              borderColor={'primary.200'}>
              <Icon name={'pen'} color={theme.colors.primary['200']} />
            </Center>
          </TouchableOpacity>
        </HStack>
      </VStack>

      <HStack
        mt={4}
        pb={2}
        borderBottomWidth={'2px'}
        px={isTablet ? '64px' : 4}
        w={'100%'}
        borderBottomColor={'gray.200'}>
        {tabs.map((item, index) => (
          <VStack position={'relative'} key={index} flex={1} py={2}>
            <Center>
              <TouchableOpacity onPress={() => setTabSelected(item)}>
                <Text
                  fontSize={'TSM'}
                  fontWeight={tabSelected.label === item.label ? 700 : 500}
                  color={
                    tabSelected.label === item.label
                      ? 'primary.200'
                      : 'gray.700'
                  }>
                  {item.label}
                </Text>
              </TouchableOpacity>
            </Center>

            {tabSelected.label === item.label && (
              <Box
                w={'100%'}
                position={'absolute'}
                bottom={'-10px'}
                height={'2px'}
                background={'primary.200'}
              />
            )}
          </VStack>
        ))}
      </HStack>

      {tabSelected.Component}
    </VStack>
  );
};

export default TeacherView;
