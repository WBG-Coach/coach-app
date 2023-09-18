import React, {useEffect, useState} from 'react';
import Page from '../../components/Page';
import Button from '../../components/Button';
import PathRoutes from '../../routers/paths';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-native';
import SyncService from '../../services/sync.service';
import {useNetInfo} from '@react-native-community/netinfo';
import {Center, Image, Spinner, Text, VStack} from 'native-base';
import {AccountCreatedImg} from '../../assets/images/accountCreated';

const CoachCreatedScreen: React.FC = () => {
  const {t} = useTranslation();
  const navigation = useNavigate();
  const {isConnected} = useNetInfo();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isConnected) {
      setIsLoading(true);
      SyncService.trySyncData()
        .then(() => setIsLoading(false))
        .catch(err => {
          setIsLoading(false);
          console.log(err);
        });
    }
  }, [isConnected]);

  return isLoading ? (
    <Center flex={1}>
      <Spinner size="lg" />
    </Center>
  ) : (
    <Page>
      <Center flex={1}>
        <VStack alignItems={'center'}>
          <Image source={AccountCreatedImg} alt={'User icon'} />
          <Text
            textAlign={'center'}
            fontWeight={600}
            fontSize={'HXS'}
            color={'gray.700'}>
            {t('login.accountCreated.title')}
          </Text>
          <Text
            mt={2}
            textAlign={'center'}
            fontWeight={400}
            fontSize={'TMD'}
            color={'gray.600'}>
            {t('login.accountCreated.subtitle')}
          </Text>
        </VStack>
      </Center>

      <Button onPress={() => navigation(PathRoutes.splash, {replace: true})}>
        Go to profile selection
      </Button>
    </Page>
  );
};

export default CoachCreatedScreen;
