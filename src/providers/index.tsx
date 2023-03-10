import React from 'react';
import {NativeBaseProvider} from 'native-base';
import theme from '../theme';
import UserContextProvider from './contexts/UserContext';

type Props = {
  children: React.ReactNode;
};

const RootProvider: React.FC<Props> = ({children}) => {
  return (
    <NativeBaseProvider theme={theme}>
      <UserContextProvider>{children}</UserContextProvider>
    </NativeBaseProvider>
  );
};

export default RootProvider;
