import React from 'react';
import {Props} from './types';
import {HStack, Text, VStack, useTheme} from 'native-base';
import Icon from '../Icon';
import {itemIcon} from './common';

const EvaluativeList: React.FC<Props> = ({item}) => {
  const theme = useTheme();
  return (
    <VStack>
      <HStack space={1} alignItems={'center'}>
        <Icon
          name={itemIcon[item.icon].icon as any}
          color={itemIcon[item.icon].color(theme)}
          size={14}
        />

        <Text fontSize={'LMD'} fontWeight={500} color={'gray.700'}>
          {item.title}
        </Text>
      </HStack>
      <HStack
        mt={2}
        ml={1}
        pl={3}
        borderLeftWidth={'1px'}
        borderLeftColor={'gray.300'}>
        <Text fontSize={'TMD'} fontWeight={400} color={'gray.700'}>
          {item.description}
        </Text>
      </HStack>
    </VStack>
  );
};

export default EvaluativeList;
