import React from 'react';
import {Center, Flex, Spinner, Text} from 'native-base';
import {FlatList, ListRenderItem} from 'react-native';

type InfiniteScrollProps<T> = {
  data: T[];
  isLoading: boolean;
  emptyMessage?: string | null;
  renderItem: ListRenderItem<T> | null | undefined;
  loadNextPage: () => Promise<void>;
};

const InfiniteScroll = <T extends any>({
  data,
  isLoading,
  renderItem,
  loadNextPage,
  emptyMessage,
}: InfiniteScrollProps<T>) => {
  const handleLoadData = async () => {
    try {
      await loadNextPage();
    } catch (error) {
      console.log('Error loading data:', error);
    }
  };

  return (
    <Flex flex={1} w="full">
      {!isLoading && data.length === 0 && (
        <Center mx="20px">
          <Text fontWeight={600} color={'gray.700'}>
            {emptyMessage}
          </Text>
        </Center>
      )}
      <FlatList
        data={data}
        renderItem={renderItem}
        onEndReachedThreshold={0.5}
        onEndReached={handleLoadData}
        ListFooterComponent={
          <Center w="full" h="60px">
            {isLoading && <Spinner color="blue" size="lg" />}
          </Center>
        }
        keyExtractor={(_, index) => index.toString()}
      />
    </Flex>
  );
};

export default InfiniteScroll;
