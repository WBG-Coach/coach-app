import {Text} from 'native-base';
import React from 'react';
import RootProvider from './providers';

const App = () => {
  return (
    <RootProvider>
      <Text>Hello world!</Text>
    </RootProvider>
  );
};

export default App;
