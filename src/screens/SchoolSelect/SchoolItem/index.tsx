import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Center, HStack, Text, VStack} from 'native-base';
import Icon from '../../../components/Icon';
import {useTranslation} from 'react-i18next';
import {School} from '../../../types/school';

type Props = {
  school: School;
  index?: string | number;
  onPress: () => void;
};

const SchoolItem: React.FC<Props> = ({school, index, onPress}) => {
  const [loading, setLoading] = useState(true);
  const {t} = useTranslation();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <HStack
        w={'100%'}
        py={'18px'}
        alignItems={'center'}
        bg="gray.100"
        my="12px"
      />
    );
  }

  return (
    <TouchableOpacity key={index} onPress={onPress}>
      <HStack
        w={'100%'}
        py={'18px'}
        alignItems={'center'}
        borderBottomWidth={'1px'}
        borderColor={'gray.200'}>
        <Center
          w={'40px'}
          h={'40px'}
          borderRadius={'500px'}
          background={'primary.100'}>
          <Icon name={'university'} />
        </Center>

        <VStack flex={1} ml={'8px'} space={'4px'}>
          <Text color={'gray.700'}>{school.name}</Text>
          <Text color={'gray.600'}>
            {t('schoolSelect.item-description_interval', {
              postProcess: 'interval',
              count: school?.teachersCount,
            })}
          </Text>
        </VStack>

        <Icon name={'angle-right'} />
      </HStack>
    </TouchableOpacity>
  );
};

export default SchoolItem;
