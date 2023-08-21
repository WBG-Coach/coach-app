import React from 'react';
import {Props} from './types';
import {VStack} from 'native-base';
import ChatBallon from './ChatBallon';

const Chat: React.FC<Props> = ({messages}) => {
  return (
    <VStack flex={1} bg={'gray.100'} py={2} px={4} space={3}>
      {messages.map((message, index) => (
        <ChatBallon
          {...message}
          key={index}
          position={index % 2 == 0 ? 'rigth' : 'left'}
        />
      ))}
    </VStack>
  );
};

export default Chat;
