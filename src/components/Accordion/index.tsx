import React from 'react';
import {Box, HStack, Text} from 'native-base';
import {TouchableOpacity} from 'react-native';
import Icon from '../base/Icon';

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
            fontSize="20px"
            fontWeight="700">
            {title}
          </Text>
          {check && (
            <Icon name={'check-circle-solid'} color={'green'} size={24} />
          )}
        </HStack>
      </TouchableOpacity>
      {isOpen && children}
      <Box h="8px" bg="gray.100" />
    </>
  );
};

export default Accordion;
