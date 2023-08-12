import {Box, FlatList, HStack, Text, VStack} from 'native-base';
import React from 'react';
import loadingBarItems from './common';
import {useLocation} from 'react-router-native';
import PathRoutes from '../../../routers/paths';

const LoadingBar = () => {
  const location = useLocation();
  const currentIn =
    Object.keys(PathRoutes.teacherLearningCircles).findIndex(
      key =>
        (PathRoutes.teacherLearningCircles as any)[key] === location.pathname,
    ) - 1;

  return (
    <FlatList
      data={loadingBarItems}
      horizontal
      style={{flexGrow: 0}}
      showsHorizontalScrollIndicator={false}
      renderItem={({item, index}) => (
        <VStack alignItems={'flex-start'} ml={index === 0 ? 6 : ''}>
          <HStack alignItems={'center'}>
            <Box
              w={'8px'}
              h={'8px'}
              background={index <= currentIn ? 'primary.200' : 'gray.300'}
              borderRadius={'4px'}
            />

            {loadingBarItems.length - 1 !== index && (
              <Box h={'2px'} flex={1} background={'gray.300'}>
                <Box
                  h={'2px'}
                  w={'10px'}
                  background={index === currentIn ? 'primary.200' : 'gray.300'}
                />
              </Box>
            )}
          </HStack>

          <Text
            mt={1}
            color={index <= currentIn ? 'primary.200' : 'gray.300'}
            fontSize={'TXS'}
            fontWeight={index === currentIn ? 700 : 400}
            mr={6}>
            {item.label}
          </Text>
        </VStack>
      )}
    />
  );
};

export default LoadingBar;
