import {HStack, Text, VStack} from 'native-base';
import React from 'react';
import Icon from '../../../../components/base/Icon';
import {Props} from './types';

const BottomSheetTooltip: React.FC<Props> = ({content}) => {
  const data: {
    title: string;
    subtitle: string;
    items: {icon: string; label: string; description: string}[];
  } = JSON.parse(content);

  return (
    <VStack p={4}>
      <Text fontSize={'HXS'} fontWeight={600} color={'gray.700'}>
        {data.title}
      </Text>
      <Text fontSize={'TSM'} mt={1} fontWeight={400} color={'gray.600'}>
        {data.subtitle}
      </Text>
      <VStack>
        {data.items.map((item, index) => (
          <HStack alignItems={'center'} key={index} space={2} py={3} px={4}>
            <Icon name={item.icon} />
            <VStack space={1}>
              <Text fontSize={'LMD'} mt={1} fontWeight={500} color={'gray.700'}>
                {item.label}
              </Text>
              <Text fontSize={'TSM'} mt={1} fontWeight={400} color={'gray.600'}>
                {item.description}
              </Text>
            </VStack>
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
};

export default BottomSheetTooltip;
