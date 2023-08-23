import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Center, HStack, Text, VStack} from 'native-base';
import Icon from '../../../components/Icon';
import {useTranslation} from 'react-i18next';
import {Coach} from '../../../types/coach';

type Props = {
  coach: Coach;
  index?: string | number;
  onPress: () => void;
};

const CoachItem: React.FC<Props> = ({coach, index, onPress}) => {
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
        borderColor={'gray.200'}
        borderBottomWidth={'1px'}>
        <Center
          w={'40px'}
          h={'40px'}
          borderRadius={'500px'}
          background={'primary.100'}>
          <Icon name={'user'} />
        </Center>

        <VStack flex={1} ml={'8px'} space={'4px'}>
          <Text color={'gray.700'}>{coach.name}</Text>
          <Text color={'gray.600'}>
            {t('coachSelect.item-description_interval', {
              postProcess: 'interval',
              count: coach?.sessionCount,
            })}
          </Text>
        </VStack>

        <Icon name={'angle-right'} />
      </HStack>
    </TouchableOpacity>
  );
};

export default CoachItem;
