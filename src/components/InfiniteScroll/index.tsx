import React from 'react';
import {Center, Flex, Spinner, Text} from 'native-base';
import {FlatList, ListRenderItem} from 'react-native';
import Button from '../Button';
import {useTranslation} from 'react-i18next';

type InfiniteScrollProps<T> = {
  data: T[];
  isEnd?: boolean;
  isLoading: boolean;
  emptyMessage?: string | null;
  emptyComponent?: React.ReactNode;
  renderItem: ListRenderItem<T> | null | undefined;
  loadNextPage: () => Promise<void>;
};

const InfiniteScroll = <T extends any>({
  data,
  isEnd,
  isLoading,
  renderItem,
  loadNextPage,
  emptyMessage,
  emptyComponent,
}: InfiniteScrollProps<T>) => {
  const {t} = useTranslation();

  return (
    <Flex flex={1} w="full">
      {!isLoading &&
        data.length === 0 &&
        (emptyComponent || (
          <Center mx="20px">
            <Text fontWeight={600} color={'gray.700'}>
              {emptyMessage}
            </Text>
          </Center>
        ))}
      <FlatList
        data={data}
        renderItem={renderItem}
        initialNumToRender={20}
        maxToRenderPerBatch={20}
        removeClippedSubviews={true}
        keyExtractor={(_, index) => index.toString()}
        ListFooterComponent={
          <Center w="full" h="60px">
            {isLoading ? (
              <Spinner color="blue" size="lg" />
            ) : (
              !isEnd && (
                <Button variant="outlined" onPress={loadNextPage}>
                  {t('common.load-more')}
                </Button>
              )
            )}
          </Center>
        }
      />
    </Flex>
  );
};

export default InfiniteScroll;
