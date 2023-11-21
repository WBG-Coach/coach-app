import React from 'react';
import Page from '../../components/Page';
import Pdf from 'react-native-pdf';
import {View} from 'native-base';
import {Dimensions} from 'react-native';
import {useTranslation} from 'react-i18next';

const CoachScriptsScreen: React.FC = () => {
  const {t} = useTranslation();
  return (
    <Page title={t('home.menu-items.coachScript')} back noPadding>
      <View flex={1}>
        <Pdf
          source={{uri: 'bundle-assets://Sierra_Leone_Coach_Manual.pdf'}}
          style={{
            flex: 1,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
          }}
        />
      </View>
    </Page>
  );
};

export default CoachScriptsScreen;
