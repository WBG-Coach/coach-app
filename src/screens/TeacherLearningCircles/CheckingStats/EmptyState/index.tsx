import {Image, Text, VStack} from 'native-base';
import React from 'react';
import {EmptyStateImage} from '../../../../assets/images/tlc/check';
import {useTranslation} from 'react-i18next';

const EmptyState = () => {
  const {t} = useTranslation();

  return (
    <VStack alignItems={'center'}>
      <Image source={EmptyStateImage} alt={'Empty state image'} />

      <Text mt={6} fontSize={'TXL'} fontWeight={700} color={'gray.700'}>
        {t('tlc.checkingStats.empty.title')}
      </Text>
      <Text
        mt={1}
        textAlign={'center'}
        fontSize={'TMD'}
        fontWeight={400}
        color={'gray.600'}>
        {t('tlc.checkingStats.empty.description')}
      </Text>
    </VStack>
  );
};

export default EmptyState;
