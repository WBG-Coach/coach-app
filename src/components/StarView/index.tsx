import {Box, HStack, useTheme} from 'native-base';
import React from 'react';
import Icon from '../base/Icon';
import {Props} from './types';

const StarView: React.FC<Props> = ({maxLength, value}) => {
  const starsLength = Array(maxLength).fill({});
  const theme = useTheme();

  return (
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
  );
};

export default StarView;
