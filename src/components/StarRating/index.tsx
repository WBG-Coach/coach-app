import React, {useCallback, useMemo} from 'react';
import {Center, HStack, VStack, useTheme, Text} from 'native-base';
import {TouchableOpacity} from 'react-native';
import {Props} from './types';
import Icon from '../Icon';

const StarsLabels = ['Low', 'Mid', 'High'];

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
          {starsLength.map((_, index) => (
            <VStack key={index} alignItems={'center'}>
              {renderStars(value, index + 1)}
              <Text fontSize={'TSM'} fontWeight={400} color={'gray.600'}>
                {size === StarsLabels.length ? StarsLabels[index] : index + 1}
              </Text>
            </VStack>
          ))}
        </HStack>
      </VStack>
    </Center>
  );
};

export default StarRating;
