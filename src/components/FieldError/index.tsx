import {HStack, Text, useTheme} from 'native-base';
import React from 'react';
import Icon from '../Icon';
import {useTranslation} from 'react-i18next';

const FieldError = () => {
  const theme = useTheme();
  const {t} = useTranslation();

  return (
    <HStack alignItems={'center'} space={1}>
      <Icon
        size={16}
        name={'exclamation-circle-solid'}
        color={theme.colors.red['200']}
      />
      <Text color={'red.200'} fontSize={'TXS'} fontWeight={400}>
        {t('errors.requiredField')}
      </Text>
    </HStack>
  );
};

export default FieldError;
