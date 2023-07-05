import React, {useState} from 'react';
import {Box, HStack, Modal, Text, VStack} from 'native-base';
import {TouchableOpacity} from 'react-native';
import Icon from '../Icon';

type Props = {
  value?: string;
  isInvalid?: boolean;
  bottomTitle: string;
  placeholder?: string;
  options: {value: string; label: string}[];
  handleSelectValue: (value: string) => void;
};

const SelectModal: React.FC<Props> = ({
  handleSelectValue,
  bottomTitle,
  placeholder,
  isInvalid,
  options,
  value,
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <TouchableOpacity onPress={() => setShowModal(true)}>
        <HStack
          borderWidth={'1px'}
          borderColor={isInvalid ? 'red.200' : 'gray.300'}
          borderRadius={'8px'}
          h={12}
          px={3}
          alignItems={'center'}>
          <Text
            flex={1}
            fontSize={'LMD'}
            color={value ? 'gray.700' : 'gray.300'}>
            {options.find(opt => opt.value === value)?.label || placeholder}
          </Text>

          <Icon name={'angle-down'} />
        </HStack>
      </TouchableOpacity>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <VStack
          bg="white"
          w="full"
          mt="auto"
          p={'16px'}
          borderTopRadius={'20px'}>
          <Text fontSize={'HXS'} pb={6} fontWeight={600} color={'black'}>
            {bottomTitle}
          </Text>
          {options.map(item => (
            <Box px={2} w={'100%'} key={item.value}>
              <TouchableOpacity
                onPress={() => {
                  handleSelectValue(item.value);
                  setShowModal(false);
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
      </Modal>
    </>
  );
};

export default SelectModal;
