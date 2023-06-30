import React, {useMemo} from 'react';
import {Center, HStack, VStack, useTheme, Text} from 'native-base';
import {TouchableOpacity} from 'react-native';
import {Props} from './types';
import Icon from '../Icon';

const StarRating: React.FC<Props> = ({onPress, size, value}) => {
  const starsLength = Array(size).fill({});
  const theme = useTheme();

  const renderStars = useMemo(
    () => (
      <HStack space={3} justifyContent="space-around">
        {starsLength.map((_, index) => (
          <TouchableOpacity key={index} onPress={() => onPress(index + 1)}>
            {value >= index + 1 ? (
              <Icon
                size={32}
                name={'star-solid'}
                color={theme.colors.yellow['200']}
              />
            ) : (
              <Icon size={32} name={'star'} color={theme.colors.gray['500']} />
            )}
          </TouchableOpacity>
        ))}
      </HStack>
    ),
    [onPress, starsLength, theme.colors.gray, theme.colors.yellow, value],
  );

  return (
    <Center>
      <VStack>
        {renderStars}

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
