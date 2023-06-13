import React, {useMemo} from 'react';
import {Center, HStack, VStack, useTheme, Text, Image} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Props} from './types';
import Icon from '../Icon';

const StarRating: React.FC<Props> = ({onPress, size, value}) => {
  const starsLength = Array(size).fill({});
  const theme = useTheme();

  const renderStars = useMemo(
    () => (
      <HStack space={3}>
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
    [value],
  );

  return (
    <Center>
      <VStack>
        {renderStars}

        <HStack justifyContent={'space-between'}>
          <Text color={'gray.600'} left={0} bottom={0}>
            Needs work
          </Text>

          <Text color={'gray.600'} left={0} bottom={0}>
            Great work
          </Text>
        </HStack>
      </VStack>
    </Center>
  );
};

export default StarRating;
