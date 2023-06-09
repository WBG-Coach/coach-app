import React from 'react';
import {NativeBaseProvider} from 'native-base';
import theme from '../theme';
import UserContextProvider from './contexts/UserContext';
import {BottomSheetProvider} from './contexts/BottomSheetContext';
import {ClickOutsideProvider} from 'react-native-click-outside';

type Props = {
  children: React.ReactNode;
};

const RootProvider: React.FC<Props> = ({children}) => {
  return (
    <NativeBaseProvider theme={theme}>
      <ClickOutsideProvider>
        <BottomSheetProvider>
          <UserContextProvider>{children}</UserContextProvider>
        </BottomSheetProvider>
      </ClickOutsideProvider>
    </NativeBaseProvider>
  );
};

export default RootProvider;
