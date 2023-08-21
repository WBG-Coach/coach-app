import React from 'react';
import {Props} from './types';
import {HStack, Text, VStack} from 'native-base';

const ChatBallon: React.FC<Props> = ({color, message, position, sender}) => {
  return (
    <HStack
      flex={1}
      justifyContent={position === 'rigth' ? 'flex-end' : 'start'}>
      <VStack bg={color} p={2} maxWidth={'272px'}>
        <Text fontSize={'TXS'} fontWeight={400} color={'gray.700'}>
          {sender}
        </Text>
        <Text fontSize={'TMD'} fontWeight={400} color={'gray.700'}>
          {message}
        </Text>
      </VStack>
    </HStack>
  );
};

export default ChatBallon;
