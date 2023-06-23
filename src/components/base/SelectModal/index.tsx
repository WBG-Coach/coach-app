import React, {useEffect, useState} from 'react';
import {Props} from './types';
import {Box, FlatList, HStack, Text, VStack} from 'native-base';
import {useBottomSheetProvider} from '../../../providers/contexts/BottomSheetContext';
import {TouchableOpacity} from 'react-native-gesture-handler';

const SelectModal: React.FC<Props> = ({
  handleSelectValue,
  bottomTitle,
  placeholder,
  isInvalid,
  options,
  value,
}) => {
  const [{}, {setBottomSheetContent}] = useBottomSheetProvider();

  const BottomSheetContent: React.FC = () => {
    return (
      <VStack p={'16px'}>
        <Text fontSize={'HXS'} pb={6} fontWeight={600} color={'black'}>
          {bottomTitle}
        </Text>
        {options.map(item => (
          <Box px={2} w={'100%'} key={item.value}>
            <TouchableOpacity
              onPress={() => {
                handleSelectValue(item.value);
                setBottomSheetContent(undefined);
              }}>
              <HStack
                py={4}
                borderBottomWidth={'1px'}
                borderBottomColor={'gray.300'}>
                <Text fontSize={'LMD'} color={'gray.700'}>
                  {item.label}
                </Text>
              </HStack>
            </TouchableOpacity>
          </Box>
        ))}
      </VStack>
    );
  };

  return (
    <TouchableOpacity
      onPress={() => setBottomSheetContent(<BottomSheetContent />)}>
      <HStack
        borderWidth={'1px'}
        borderColor={isInvalid ? 'red.200' : 'gray.300'}
        borderRadius={'8px'}
        h={12}
        px={3}
        alignItems={'center'}>
        <Text fontSize={'LMD'} color={!!value ? 'gray.700' : 'gray.300'}>
          {options.find(opt => opt.value === value)?.label || placeholder}
        </Text>
      </HStack>
    </TouchableOpacity>
  );
};

export default SelectModal;
