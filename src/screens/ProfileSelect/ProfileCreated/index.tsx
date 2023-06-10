import { isTablet as Tablet } from 'react-native-device-info';

import React from 'react';

import { useTranslation } from 'react-i18next';
import { VStack } from 'native-base';




const ProfileCreatedScreen: React.FC = () => {
  const isTablet = Tablet();
  const { t } = useTranslation()
 

  return (
    <VStack
      flex={1}
      w={'100%'}
      alignItems={'flex-start'}
      px={isTablet ? '64px' : '16px'}
      mt={isTablet ? '64px' : '24px'}>
      
    </VStack>
  )
};

export default ProfileCreatedScreen;
