import {HStack, Text, VStack, useTheme} from 'native-base';
import React from 'react';
import Icon from '../../../../../components/Icon';
import {useTranslation} from 'react-i18next';

const turnItems = [
  'Why using positive language is important in a classroom',
  'How positive language can be used in the classroom to encourage students',
];

const FirstStepAfter = () => {
  const {t} = useTranslation();
  const theme = useTheme();

  return (
    <VStack>
      <Text
        mt={6}
        mb={3}
        alignSelf={'center'}
        fontSize={'LLG'}
        fontWeight={500}
        color={'gray.700'}>
        In this unit you'll learn:
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
