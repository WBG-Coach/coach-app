import React from 'react';
import {useCoachContext} from '../../../providers/coach.provider';
import {isTablet as Tablet} from 'react-native-device-info';
import {Center, HStack, Text, VStack} from 'native-base';
import {useTranslation} from 'react-i18next';
import Icon from '../../../components/Icon';

const HomeHeader: React.FC = () => {
  const {currentSchool} = useCoachContext();
  const {t} = useTranslation();
  const isTablet = Tablet();

  return (
    <HStack space={2} alignItems={'center'}>
      <Center
        w={isTablet ? '64px' : '56px'}
        h={isTablet ? '64px' : '56px'}
        borderRadius={'500px'}
        background={'primary.100'}>
        <Icon name={'university'} />
      </Center>

      <VStack space={1}>
        <Text fontSize={'TMD'} fontWeight={600} color={'gray.800'}>
          {currentSchool?.name}
        </Text>
        <Text fontSize={'TMD'} fontWeight={400} color={'gray.800'}>
          {t('home.teachersLength_interval', {
            postProcess: 'interval',
            count: currentSchool?.teachersCount,
          })}
        </Text>
      </VStack>
    </HStack>
  );
};

export default HomeHeader;
