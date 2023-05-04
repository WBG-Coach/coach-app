import {HStack, Text, useTheme} from 'native-base';
import React from 'react';
import Icon from '../base/Icon';
import {Props} from './types';

const StarsTag: React.FC<Props> = ({value}) => {
  const theme = useTheme();

  const tags = [
    {
      label: 'Not evaluated',
      background: 'primary.0',
      color: theme.colors.primary['300'],
      icon: 'award-solid',
    },
    {
      label: 'Needs work',
      background: 'yellow.0',
      color: theme.colors.yellow['300'],
      icon: 'star-solid',
    },
    {
      label: 'Needs attention',
      background: 'yellow.0',
      color: theme.colors.yellow['300'],
      icon: 'star-solid',
    },
    {
      label: 'Almost there',
      background: 'violet.0',
      color: theme.colors.violet['300'],
      icon: 'star-solid',
    },
    {
      label: 'Doing great',
      background: 'green.0',
      color: theme.colors.green['300'],
      icon: 'star-solid',
    },
  ];

  const tag = tags[value];

  return (
    <HStack alignItems={'center'} bg={tag.background} space={1} py={1} px={2}>
      <Icon name={tag.icon} size={16} />
      <Text fontSize={'TXS'} fontWeight={400} color={'gray.600'}>
        {tag.label}
      </Text>
    </HStack>
  );
};

export default StarsTag;
