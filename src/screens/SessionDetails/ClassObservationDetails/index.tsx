import React, {useEffect, useState} from 'react';
import Page from '../../../components/Page';
import CompetenceView from '../../ClassObservation/Confirmation/CompetenceView';
import {useLocation} from 'react-router-native';
import {useTranslation} from 'react-i18next';
import {Center, Spinner} from 'native-base';

const ClassObservationDetailsScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const {t} = useTranslation();
  const {
    state: {competences},
  } = useLocation();

  useEffect(() => {
    setTimeout(() => setLoading(false));
  }, []);

  return (
    <Page back title={t('sessionDetails.title')}>
      {loading ? (
        <Center flex={1}>
          <Spinner size="lg" />
        </Center>
      ) : (
        <CompetenceView competences={competences} />
      )}
    </Page>
  );
};

export default ClassObservationDetailsScreen;
