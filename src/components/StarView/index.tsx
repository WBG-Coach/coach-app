import {Box, HStack, Text, VStack, useTheme} from 'native-base';
import React from 'react';
import Icon from '../Icon';
import {Props} from './types';
import {useTranslation} from 'react-i18next';
import {getTags} from '../StarsTag/common';

const StarView: React.FC<Props> = ({maxLength, value, showLabel}) => {
  const starsLength = Array(maxLength).fill({});
  const {t} = useTranslation();
  const theme = useTheme();

  return (
    <VStack alignItems={'flex-end'}>
      <HStack space={1}>
        {starsLength.map((_, index) => (
          <Box key={index}>
            {value >= index + 1 ? (
              <Icon
                name={'star-solid'}
                size={20}
                color={theme.colors.yellow['200']}
              />
            ) : (
              <Icon name={'star'} color={theme.colors.gray['500']} size={20} />
            )}
          </Box>
        ))}
      </HStack>
      {showLabel && (
        <Text
          textAlign={'center'}
          fontSize={'TMD'}
          fontWeight={400}
          color={'gray.600'}>
          {getTags(t)[parseInt(value.toFixed(0), 10)]?.label}
        </Text>
      )}
    </VStack>
  );
};

export default StarView;
