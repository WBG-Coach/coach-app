import {HStack, Text, VStack, useTheme} from 'native-base';
import React from 'react';
import Icon from '../../../../../components/Icon';
import {useTranslation} from 'react-i18next';

const FirstStepAfter = () => {
  const {t} = useTranslation();
  const theme = useTheme();

  const turnItems = [
    t('tlc.introduction.$1.learn.$1.title'),
    t('tlc.introduction.$1.learn.$2.title'),
  ];

  return (
    <VStack>
      <Text
        mt={6}
        mb={3}
        alignSelf={'center'}
        fontSize={'LLG'}
        fontWeight={500}
        color={'gray.700'}>
        {t('tlc.introduction.$1.learn.title')}
      </Text>

      {turnItems.map((item, index) => (
        <HStack key={index} space={1}>
          <Icon name={'check'} color={theme.colors.green['200']} />
          <Text
            alignSelf={'center'}
            fontSize={'TSM'}
            fontWeight={400}
            color={'gray.700'}>
            {item}
          </Text>
        </HStack>
      ))}
    </VStack>
  );
};

export default FirstStepAfter;
