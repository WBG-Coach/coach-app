import {HStack, Text, useTheme} from 'native-base';
import React from 'react';
import {useTranslation} from 'react-i18next';
import Icon from '../base/Icon';
import {getTags} from './common';
import {Props} from './types';

const StarsTag: React.FC<Props> = ({value}) => {
  const theme = useTheme();
  const {t} = useTranslation();
  const tag = getTags(theme, t)[value];

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
