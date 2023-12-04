import React from 'react';
import {Props} from './types';
import {HStack, Text, VStack, useTheme} from 'native-base';
import Icon from '../../../../components/Icon';
import {useTranslation} from 'react-i18next';

const CompetenceItem: React.FC<Props> = ({answersAverage, title}) => {
  const {t} = useTranslation();
  const theme = useTheme();

  return (
    <VStack
      py={3}
      px={4}
      borderWidth={1}
      borderColor={'gray.200'}
      borderRadius={8}
      space={2}>
      <HStack space={1} alignItems={'center'}>
        <Icon name={'favorite-solid'} color={theme.colors.gray['600']} />
        <Text fontSize={'TSM'} fontWeight={400} color={'gray.600'}>
          {answersAverage.toFixed(1)}
        </Text>
      </HStack>
      <Text fontSize={'LMD'} fontWeight={500} color={'gray.700'}>
        {t(title as any)}
      </Text>
    </VStack>
  );
};

export default CompetenceItem;
