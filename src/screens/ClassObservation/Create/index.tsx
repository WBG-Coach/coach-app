import {Button, Text, VStack} from 'native-base';
import React from 'react';

const ClassObservationCreate: React.FC<any> = () => {
  return (
    <VStack flex={1} px={4} safeAreaBottom>
      <VStack flex={1}>
        <Text mt={6} fontSize={'HSM'} fontWeight={600} color={'gray.800'}>
          Mentoring process
        </Text>
      </VStack>
      <Button
        mb={6}
        w={'100%'}
        py={3}
        borderRadius={'8px'}
        background={'primary.200'}>
        Start preparation
      </Button>
    </VStack>
  );
};

export default ClassObservationCreate;
