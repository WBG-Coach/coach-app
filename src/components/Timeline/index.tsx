import {
  Box,
  Center,
  FlatList,
  HStack,
  Text,
  VStack,
  useTheme,
} from 'native-base';
import React from 'react';
import Icon from '../Icon';
import {Props} from './types';
import {useTranslation} from 'react-i18next';

const Timeline: React.FC<Props> = ({items}) => {
  const theme = useTheme();
  const {t} = useTranslation();

  return (
    <VStack flex={1}>
      <HStack mt={6} position={'relative'}>
        <Box
          w={'4px'}
          left={'18px'}
          h={'85%'}
          background={'primary.100'}
          position={'absolute'}
        />

        <FlatList
          data={items}
          renderItem={({item}) => (
            <>
              <Center
                top={0}
                w={'40px'}
                h={'40px'}
                zIndex={2}
                left={'-0px'}
                position={'absolute'}
                borderRadius={'500px'}
                background={'primary.0'}>
                <Icon
                  name={item.icon as any}
                  color={theme.colors.primary['200']}
                />
              </Center>

              <VStack space={1} ml={'50px'} pb={6}>
                <Text fontSize={'TMD'} fontWeight={700} color={'gray.800'}>
                  {item.title}
                </Text>

                {item.estimated && (
                  <Text fontSize={'TXS'} fontWeight={400} color={'gray.700'}>
                    {item.estimated}
                  </Text>
                )}

                <Text fontSize={'TSM'} fontWeight={400} color={'gray.700'}>
                  {item.description}
                </Text>
              </VStack>
            </>
          )}
        />
      </HStack>
    </VStack>
  );
};

export default Timeline;
