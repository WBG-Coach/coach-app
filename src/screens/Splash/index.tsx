import {Center, Spinner} from 'native-base';
import React from 'react';

const SplashScreen = () => {
  return (
    <Center flex={1} bg={'white'}>
      <Spinner size={'lg'} />
    </Center>
  );
};

export default SplashScreen;
