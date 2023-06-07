import {
  Button,
  Center,
  HStack,
  Image,
  Text,
  useTheme,
  VStack,
} from 'native-base';
import React from 'react';
import Routes from '../../../../routes/paths';
import Navigation from '../../../../services/navigation';
import {isTablet as Tablet} from 'react-native-device-info';
import {TeacherCreatedIcon} from '../../../../assets/images/teacher';
import Icon from '../../../../components/base/Icon';
import {useTranslation} from 'react-i18next';

const TeacherCreatedScreen: React.FC = () => {
  const {t} = useTranslation();
  const isTablet = Tablet();
  const theme = useTheme();

  return (
    <VStack
      safeAreaBottom
      py={6}
      my={isTablet ? '64px' : 6}
      px={isTablet ? '64px' : 4}
      flex={1}>
      <Center flex={1}>
        <VStack alignItems={'center'}>
          <Image
            source={TeacherCreatedIcon}
            w={'80px'}
            h={'80px'}
            alt={'Ícon of user and plus icon'}
          />

          <Text mt={8} fontSize={'HSM'} fontWeight={600} color={'gray.700'}>
            {t('teacher.created.title') || 'New teacher added'}
          </Text>
          <Text mt={2} fontSize={'TMD'} fontWeight={400} color={'gray.600'}>
            {t('teacher.created.subtitle') ||
              'The teacher will be available in the list of teachers at the home of the app'}
          </Text>

          <HStack
            p={3}
            mt={8}
            width={'100%'}
            borderRadius={'8px'}
            background={'violet.0'}
            space={2}
            alignItems={'center'}>
            <Icon
              size={20}
              name={'info-circle-solid'}
              color={theme.colors.violet['200']}
            />
            <VStack flex={1}>
              <Text fontSize={'LSM'} fontWeight={500} color={'gray.700'}>
                {t('teacher.created.startCoaching') ||
                  'Start coaching this teacher'}
              </Text>
              <Text mt={1} fontSize={'TXS'} fontWeight={400} color={'gray.700'}>
                {t('teacher.created.selectProfile') ||
                  'Select their profile and click the ”New class observation” button to get started'}
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </Center>

      <Button
        variant={'solid'}
        borderRadius={'8px'}
        color={'white'}
        background={'primary.200'}
        onPress={() => Navigation.reset(Routes.home)}>
        {t('teacher.created.button') || 'Finish'}
      </Button>
    </VStack>
  );
};

export default TeacherCreatedScreen;
