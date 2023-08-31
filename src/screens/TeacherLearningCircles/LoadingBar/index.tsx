import {Box, FlatList, HStack, Text, VStack} from 'native-base';
import React, {useEffect, useRef} from 'react';
import loadingBarItems from './common';
import {useLocation} from 'react-router-native';
import PathRoutes from '../../../routers/paths';
import {useTranslation} from 'react-i18next';

const LoadingBar = () => {
  const location = useLocation();
  const flatRef = useRef<any>();
  const {t} = useTranslation();
  const currentIn =
    Object.keys(PathRoutes.teacherLearningCircles).findIndex(key =>
      location.pathname.includes(
        (PathRoutes.teacherLearningCircles as any)[key].replace('/:unitId', ''),
      ),
    ) - 1;

  useEffect(() => {
    if (flatRef.current) {
      flatRef.current.scrollToIndex({index: currentIn, animated: true});
    }
  }, []);

  const ITEM_WIDTH = 40; // size of you element

  return (
    <FlatList
      ref={flatRef}
      data={loadingBarItems}
      horizontal
      getItemLayout={(_, index) => ({
        length: ITEM_WIDTH,
        offset: ITEM_WIDTH * index,
        index,
      })}
      style={{flexGrow: 0}}
      showsHorizontalScrollIndicator={false}
      renderItem={({item, index}) => {
        const isLower = index < currentIn;
        const isEqual = index === currentIn;
        const isLowerOrEqual = index <= currentIn;
        const isLast = loadingBarItems.length - 1 === index;

        return (
          <VStack alignItems={'flex-start'} ml={index === 0 ? 6 : ''}>
            <HStack alignItems={'center'}>
              <Box
                w={'8px'}
                h={'8px'}
                background={isLowerOrEqual ? 'primary.200' : 'gray.300'}
                borderRadius={'4px'}
              />

              {!isLast && (
                <Box
                  h={'2px'}
                  flex={1}
                  background={isLower ? 'primary.200' : 'gray.300'}>
                  <Box
                    h={'2px'}
                    w={'10px'}
                    background={isEqual || isLower ? 'primary.200' : 'gray.300'}
                  />
                </Box>
              )}
            </HStack>

            <Text
              mt={1}
              color={isLowerOrEqual ? 'primary.200' : 'gray.300'}
              fontSize={'TXS'}
              fontWeight={isEqual ? 700 : 400}
              mr={6}>
              {t(`tlc.loadingBar.${item}`)}
            </Text>
          </VStack>
        );
      }}
    />
  );
};

export default LoadingBar;
