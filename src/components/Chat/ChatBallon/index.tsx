import React from 'react';
import {Props} from './types';
import {Box, HStack, Text, VStack} from 'native-base';

const ChatBallon: React.FC<Props> = ({color, message, position, sender}) => {
  return (
    <HStack
      flex={1}
      position={'relative'}
      justifyContent={position === 'rigth' ? 'flex-end' : 'start'}
      overflow={'hidden'}
      {...(position === 'rigth' ? {pr: '15px'} : {pl: '15px'})}>
      <Box
        position={'absolute'}
        {...(position === 'rigth' ? {right: '-10px'} : {left: '-10px'})}
        top={0}
        bg={color}
        w={'50px'}
        h={'13px'}
        style={{
          transform: [{rotate: position === 'rigth' ? '-40deg' : '40deg'}],
        }}
      />

      <VStack bg={color} p={2} maxWidth={'272px'} borderRadius={'6px'}>
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
