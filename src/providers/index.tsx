import React from 'react';
import {NativeBaseProvider} from 'native-base';

type Props = {
  children: React.ReactNode;
};

const RootProvider: React.FC<Props> = ({children}) => {
  return <NativeBaseProvider>{children}</NativeBaseProvider>;
};

export default RootProvider;
