import React from 'react';
import {NativeBaseProvider} from 'native-base';
import theme from '../theme';

type Props = {
  children: React.ReactNode;
};

const RootProvider: React.FC<Props> = ({children}) => {
  return <NativeBaseProvider theme={theme}>{children}</NativeBaseProvider>;
};

export default RootProvider;
