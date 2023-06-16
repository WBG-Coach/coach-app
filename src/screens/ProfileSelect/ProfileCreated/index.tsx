import {isTablet as Tablet} from 'react-native-device-info';
import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {Button, Center, Image, Text, VStack} from 'native-base';
import {TeacherCreatedIcon} from '../../../assets/images/teacher';
import User from '../../../database/models/User';
import {UserContext} from '../../../providers/contexts/UserContext';

type Props = {
  route: {
    params: {
      user: User;
    };
  };
};

const ProfileCreatedScreen: React.FC<any> = ({route: {params}}: Props) => {
  const isTablet = Tablet();
  const {t} = useTranslation();
  const {handleSelectProfile} = useContext(UserContext);

  return (
    <VStack
      safeAreaBottom
      py={6}
      my={isTablet ? '64px' : 6}
      px={isTablet ? '32px' : 4}
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
            {t('setupUserData.profileSelect.created.title') ||
              'Profile created'}
          </Text>
          <Text mt={2} fontSize={'TMD'} fontWeight={400} color={'gray.600'}>
            {t('setupUserData.profileSelect.created.subtitle') ||
              'Now you can select your profile and start coaching the teachers'}
          </Text>
        </VStack>
      </Center>

      <Button
        variant={'solid'}
        borderRadius={'8px'}
        color={'white'}
        background={'primary.200'}
        onPress={() => handleSelectProfile(params.user)}>
        {t('setupUserData.profileSelect.created.button') ||
          'Go to profile selection'}
      </Button>
    </VStack>
  );
};

export default ProfileCreatedScreen;
