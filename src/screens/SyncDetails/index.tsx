import {Box, Button, Image, Modal, Spinner, Text, VStack} from 'native-base';

import Page from '../../components/Page';
import {useTranslation} from 'react-i18next';
import {SetupCompleteImg} from '../../assets/images/scan';

import {useEffect, useState} from 'react';
import {useCoachContext} from '../../providers/coach.provider';
import PathRoutes from '../../routers/paths';
import {useNavigate} from 'react-router-native';
import SyncService from '../../services/sync.service';
import {useNetInfo} from '@react-native-community/netinfo';

const SyncDetails: React.FC = () => {
  const {t} = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const {currentSchool} = useCoachContext();
  const navigate = useNavigate();
  const {isConnected} = useNetInfo();

  useEffect(() => {
    if (isConnected) {
      setIsLoading(true);
      SyncService.trySyncData().then(() => setIsLoading(false));
    }
  }, [isConnected]);

  return (
    <Page setting>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <VStack my="auto">
            <Image
              w="172px"
              h="172px"
              mt="45px"
              source={SetupCompleteImg}
              mx="auto"
            />
            <Text
              mt="24px"
              textAlign="center"
              fontSize={20}
              color="#111417"
              fontWeight="600">
              {t('syncDetails.title')}
            </Text>
            <Text mt="4px" color="#576375" fontSize={16} textAlign="center">
              {t('syncDetails.description', {value: currentSchool?.name})}
            </Text>
            <Text>- Select Bayshore High in the school list</Text>
            <Text>- Create new teachers</Text>
            {isConnected && (
              <>
                <Text>- Select teachers created before</Text>
                <Text>- View previously created teacher's data</Text>
                <Text>- View Bayshore High's data</Text>
              </>
            )}
          </VStack>

          <Button
            bg="#3373CC"
            mt="auto"
            _text={{fontWeight: 500, fontSize: 16}}
            onPress={() => navigate(PathRoutes.main, {replace: true})}>
            {t('syncDetails.start')}
          </Button>
        </>
      )}
    </Page>
  );
};

export default SyncDetails;
