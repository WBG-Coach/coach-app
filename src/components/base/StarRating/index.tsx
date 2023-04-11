import {Center, HStack, VStack, useTheme, Text} from 'native-base';
import React from 'react';
import Icon from '../Icon';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Props} from './types';

const StarRating: React.FC<Props> = ({onPress, value, isInvalid}) => {
  const starsLength = Array(5).fill({});
  const theme = useTheme();

  return (
    <Center>
      <VStack>
        <HStack space={3}>
          {starsLength.map((_, index) => (
            <TouchableOpacity key={index} onPress={() => onPress(index + 1)}>
              {value >= index + 1 ? (
                <Icon
                  name={'star-solid'}
                  size={32}
                  color={theme.colors.yellow['200']}
                />
              ) : (
                <Icon
                  name={'star'}
                  color={
                    isInvalid
                      ? theme.colors.red['200']
                      : theme.colors.gray['600']
                  }
                  size={32}
                />
              )}
            </TouchableOpacity>
          ))}
        </HStack>
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
