import React, {useContext, useEffect, useState} from 'react';
import {Center, HStack, Text, VStack} from 'native-base';
import Icon from '../../../components/base/Icon';
import {useTranslation} from 'react-i18next';
import {isTablet as Tablet} from 'react-native-device-info';
import {UserContext} from '../../../providers/contexts/UserContext';
import TeacherService from '../../../services/teacher';

const HomeHeader: React.FC = () => {
  const [teacherCount, setTeacherCount] = useState(0);
  const {user} = useContext(UserContext);
  const {t} = useTranslation();
  const isTablet = Tablet();

  useEffect(() => {
    if (user?.school?.id) {
      TeacherService.getTeachersBySchoolCount(user?.school.id).then(
        setTeacherCount,
      );
    }
  }, [user]);

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
          {user?.school?.name}
        </Text>
        <Text fontSize={'TMD'} fontWeight={400} color={'gray.800'}>
          {t('home.teachersLength_interval', {
            postProcess: 'interval',
            count: teacherCount,
          })}
        </Text>
      </VStack>
    </HStack>
  );
};

export default HomeHeader;
