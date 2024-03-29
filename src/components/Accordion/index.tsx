import React from 'react';
import {Box, HStack, Text, VStack} from 'native-base';
import {TouchableOpacity} from 'react-native';
import Icon from '../Icon';

type Props = {
  title: string;
  isOpen: boolean;
  check: boolean;
  onClickHeader: () => void;
  children: React.ReactNode;
};

const Accordion: React.FC<Props> = ({
  check,
  title,
  isOpen,
  children,
  onClickHeader,
}) => {
  return (
    <>
      <TouchableOpacity onPress={onClickHeader}>
        <HStack justifyContent="space-between" alignItems="center">
          <Text
            mt="12px"
            mb="16px"
            color="#111417"
            fontSize="HXS"
            fontWeight="700">
            {title}
          </Text>
          {check && (
            <Icon name={'check-circle-solid'} color={'green'} size={24} />
          )}
        </HStack>
      </TouchableOpacity>
      <VStack h={isOpen ? 'auto' : 0} overflow="hidden">
        {children}
      </VStack>
      <Box mt="24px" h="8px" bg="gray.100" />
    </>
  );
};

export default Accordion;
