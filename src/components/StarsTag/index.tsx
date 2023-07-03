import React from 'react';
import {HStack, Text, useTheme} from 'native-base';
import {useTranslation} from 'react-i18next';
import {getTags} from './common';
import {Props} from './types';
import Icon from '../Icon';

const StarsTag: React.FC<Props> = ({value}) => {
  const theme = useTheme();
  const {t} = useTranslation();
  const tag = getTags(t, theme)[value];

  return (
    <HStack alignItems={'center'} bg={tag?.background} space={1} py={1} px={2}>
      <Icon name={tag?.icon as any} size={16} />
      <Text fontSize={'TXS'} fontWeight={400} color={'gray.600'}>
        {tag?.label}
      </Text>
    </HStack>
  );
};

export default StarsTag;
