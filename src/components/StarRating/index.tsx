import React, {useCallback, useMemo} from 'react';
import {Center, HStack, VStack, useTheme, Text} from 'native-base';
import {TouchableOpacity} from 'react-native';
import {Props} from './types';
import Icon from '../Icon';

const StarRating: React.FC<Props> = ({onPress, size, value}) => {
  const starsLength = Array(size).fill({});
  const theme = useTheme();

  const starFull = useMemo(
    () => (
      <Icon size={32} name={'star-solid'} color={theme.colors.yellow['200']} />
    ),
    [theme.colors.yellow],
  );

  const star = useMemo(
    () => <Icon size={32} name={'star'} color={theme.colors.gray['500']} />,
    [theme.colors.gray],
  );

  const renderStars = useCallback(
    (currentValue: number, newValue: number) => (
      <TouchableOpacity
        key={newValue}
        onPress={() => currentValue !== newValue && onPress(newValue)}>
        {currentValue >= newValue ? starFull : star}
      </TouchableOpacity>
    ),
    [onPress, star, starFull],
  );

  return (
    <Center>
      <VStack>
        <HStack space={3} justifyContent="space-around">
          {starsLength.map((_, index) => renderStars(value, index + 1))}
        </HStack>

        <HStack justifyContent={'space-between'}>
          <Text color={'gray.600'} left={0} bottom={0} mr="24px">
            Needs work
          </Text>

          <Text color={'gray.600'} left={0} bottom={0} ml="24px">
            Great work
          </Text>
        </HStack>
      </VStack>
    </Center>
  );
};

export default StarRating;
