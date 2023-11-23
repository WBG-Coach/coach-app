import React from 'react';
import {CoachProvider} from './providers/coach.provider';
import {NativeBaseProvider} from 'native-base';
import {NativeRouter} from 'react-router-native';
import RouterProvider from './routers';
import theme from './theme';
import 'moment/locale/ne';
import './i18n';
import i18n from './i18n';
import moment from 'moment';
import {useTranslation} from 'react-i18next';

const App = () => {
  const currentLanguage = i18n.languages[0];
  moment.locale(currentLanguage);
  //only to rebuild moment when translation changes
  const {t} = useTranslation();

  return (
    <NativeBaseProvider theme={theme}>
      <CoachProvider>
        <NativeRouter>
          <RouterProvider />
        </NativeRouter>
      </CoachProvider>
    </NativeBaseProvider>
  );
};

export default App;
