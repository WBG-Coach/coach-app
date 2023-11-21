import React from 'react';
import {useCoachContext} from '../../../providers/coach.provider';
import {isTablet as Tablet} from 'react-native-device-info';
import {Center, HStack, Text, VStack} from 'native-base';
import {useTranslation} from 'react-i18next';
import Icon from '../../../components/Icon';

const HomeHeader: React.FC = () => {
  const {currentSchool, currentCoach} = useCoachContext();
  const {t} = useTranslation();
  const isTablet = Tablet();

  return (
    <HStack space={2} alignItems={'center'}>
      <Center
        w={isTablet ? '64px' : '56px'}
        h={isTablet ? '64px' : '56px'}
        borderRadius={'500px'}
        background={'primary.100'}>
        <Icon name={'user'} />
      </Center>

      <VStack space={1}>
        <Text fontSize={'TMD'} fontWeight={600} color={'gray.800'}>
          {t('home.salutation')}, {currentCoach?.name}
        </Text>
        <HStack>
          <Text fontSize={'TSM'} fontWeight={400} color={'gray.800'}>
            {t('home.teachersLength_interval')}
          </Text>

          <Text fontSize={'TSM'} fontWeight={600} color={'gray.800'}>
            {currentSchool?.name}
          </Text>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default HomeHeader;
