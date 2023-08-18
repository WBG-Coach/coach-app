import React from 'react';
import {Props} from './types';
import {FlatList, HStack, Text, VStack, useTheme} from 'native-base';
import Icon from '../Icon';
import {itemIcon} from './common';

const AvaliativeList: React.FC<Props> = ({items}) => {
  const theme = useTheme();

  return (
    <FlatList
      data={items}
      ItemSeparatorComponent={() => <VStack h={'24px'} />}
      renderItem={({item}) => (
        <VStack>
          <HStack space={1} alignItems={'center'}>
            <Icon
              name={itemIcon[item.icon].icon as any}
              color={itemIcon[item.icon].color(theme)}
              size={14}
            />

            <Text fontSize={'LMD'} fontWeight={500} color={'gray.700'}>
              {item.title}
            </Text>
          </HStack>
          <HStack
            mt={2}
            ml={1}
            pl={3}
            borderLeftWidth={'1px'}
            borderLeftColor={'gray.300'}>
            <Text fontSize={'TMD'} fontWeight={400} color={'gray.700'}>
              {item.description}
            </Text>
          </HStack>

          {item.box && (
            <VStack
              mt={4}
              p={3}
              borderWidth={'1px'}
              borderColor={'primary.200'}
              borderRadius={'8px'}>
              <HStack space={2} alignItems={'center'}>
                <Icon
                  name={'question-circle-solid'}
                  color={theme.colors.primary['200']}
                  size={18}
                />
                <VStack>
                  <Text fontSize={'LSM'} fontWeight={500} color={'gray.700'}>
                    {item.box.title}
                  </Text>
                  <Text fontSize={'TXS'} fontWeight={400} color={'gray.600'}>
                    {item.box.description}
                  </Text>
                </VStack>
              </HStack>
            </VStack>
          )}
        </VStack>
      )}
    />
  );
};

export default AvaliativeList;
