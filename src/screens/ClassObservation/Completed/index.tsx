import React from 'react';
import {Button, Center, HStack, Text, useTheme, VStack} from 'native-base';
import {isTablet as Tablet} from 'react-native-device-info';
import {useTranslation} from 'react-i18next';
import Icon from '../../../components/Icon';
import {useNavigate, useParams} from 'react-router-native';
import PathRoutes from '../../../routers/paths';
import Page from '../../../components/Page';

const ClassObservationCompleted: React.FC = () => {
  const starsLength = Array(5).fill({});
  const {t} = useTranslation();
  const isTablet = Tablet();
  const theme = useTheme();
  const navigate = useNavigate();
  const params = useParams<{sessionId: string}>();

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
          {t('classObservation.observationCompleted.title') ||
            'Class observation complete'}
        </Text>
        <Text mt={2} fontSize={'TMD'} fontWeight={400} color={'gray.600'}>
          {t('classObservation.observationCompleted.subtitle') ||
            'Congratulations, you just completed the class evaluation process!'}
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
              {t('classObservation.observationCompleted.whatsNext') ||
                "What's next?"}
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
          marginTop={'auto'}
          variant={'solid'}
          borderRadius={'8px'}
          color={'white'}
          background={'primary.200'}
          onPress={() =>
            navigate(
              PathRoutes.feedbackSession.about.replace(
                ':sessionId',
                params.sessionId || '',
              ),
              {replace: true},
            )
          }>
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
