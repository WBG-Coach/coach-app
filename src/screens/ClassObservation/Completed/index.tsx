import React, {useEffect} from 'react';
import {Button, Center, HStack, Text, useTheme, VStack} from 'native-base';
import {isTablet as Tablet} from 'react-native-device-info';
import {useNavigate, useParams} from 'react-router-native';
import {useNetInfo} from '@react-native-community/netinfo';
import SyncService from '../../../services/sync.service';
import PathRoutes from '../../../routers/paths';
import {useTranslation} from 'react-i18next';
import Icon from '../../../components/Icon';
import Page from '../../../components/Page';

const ClassObservationCompleted: React.FC = () => {
  const params = useParams<{sessionId: string}>();
  const starsLength = Array(5).fill({});
  const {isConnected} = useNetInfo();
  const navigate = useNavigate();
  const {t} = useTranslation();
  const isTablet = Tablet();
  const theme = useTheme();

  useEffect(() => {
    if (isConnected) {
      SyncService.trySyncData();
    }
  }, [isConnected]);

  const startFeedbackSession = () => {
    navigate(
      PathRoutes.feedbackSession.about.replace(
        ':sessionId',
        params.sessionId || '',
      ),
      {replace: true},
    );
  };

  return (
    <Page>
      <Center flex={1} flexDirection={'column'}>
        <Center
          w={'48px'}
          h={'48px'}
          borderRadius={'24px'}
          background={'green.100'}>
          <Icon name={'check'} color={theme.colors.green['300']} size={30} />
        </Center>

        <HStack mt={2} space={3}>
          {starsLength.map((_, index) => (
            <Icon
              size={30}
              key={index}
              name={'star-solid'}
              color={theme.colors.yellow['200']}
            />
          ))}
        </HStack>

        <Text mt={8} fontSize={'HSM'} fontWeight={600} color={'gray.700'}>
          {t('classObservation.observationCompleted.title')}
        </Text>
        <Text mt={2} fontSize={'TMD'} fontWeight={400} color={'gray.600'}>
          {t('classObservation.observationCompleted.subtitle')}
        </Text>

        <HStack
          p={3}
          mt={8}
          width={'100%'}
          borderRadius={'8px'}
          background={'violet.0'}
          space={2}
          alignItems={'center'}>
          <Icon
            size={20}
            name={'info-circle-solid'}
            color={theme.colors.violet['200']}
          />
          <VStack flex={1}>
            <Text fontSize={'LSM'} fontWeight={500} color={'gray.700'}>
              {t('classObservation.observationCompleted.whatsNext')}
            </Text>
            <Text mt={1} fontSize={'TXS'} fontWeight={400} color={'gray.700'}>
              {t('classObservation.observationCompleted.startFeedback')}
            </Text>
          </VStack>
        </HStack>
      </Center>

      <VStack
        w={'100%'}
        px={isTablet ? '32px' : 4}
        background={'white'}
        pt={3}
        space={4}
        borderRadius={'8px 8px 0px 0px'}>
        <Button
          color={'white'}
          variant={'solid'}
          marginTop={'auto'}
          borderRadius={'8px'}
          background={'primary.200'}
          onPress={startFeedbackSession}>
          {t('classObservation.observationCompleted.button')}
        </Button>

        <Button
          marginTop={'auto'}
          variant={'outline'}
          borderRadius={'8px'}
          borderColor={'white'}
          onPress={() => navigate(-999)}>
          <Text color={'primary.200'}>
            {t('classObservation.observationCompleted.buttonBack')}
          </Text>
        </Button>
      </VStack>
    </Page>
  );
};

export default ClassObservationCompleted;
