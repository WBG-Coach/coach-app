import {
  Button,
  Center,
  HStack,
  Image,
  Text,
  useTheme,
  VStack,
} from 'native-base';
import React from 'react';
import {BestPractices} from '../../../assets/images/mentoring';
import Icon from '../../../components/Icon';
import {useTranslation} from 'react-i18next';
import {useNavigate, useParams} from 'react-router-native';
import {isTablet as Tablet} from 'react-native-device-info';
import PathRoutes from '../../../routers/paths';
import Header from '../../../components/Header';

const FeedbackSessionAbout: React.FC = () => {
  const {t} = useTranslation();
  const theme = useTheme();
  const params = useParams<{sessionId: string}>();
  const isTablet = Tablet();
  const navigate = useNavigate();

  return (
    <>
      <Header back title={t('feedbackSession.title')} bg="primary.0" />
      <VStack flex={1} py={6} background={'primary.0'} safeAreaBottom>
        <Center flex={1} px={isTablet ? '32px' : 4}>
          <VStack alignItems={'center'} {...(isTablet && {maxWidth: '500px'})}>
            <Image
              alignSelf={'center'}
              source={BestPractices}
              alt={'A guy looking into you phone'}
            />

            <Text
              fontSize={'HSM'}
              fontWeight={600}
              color={'gray.800'}
              mb={'16px'}
              textAlign={'center'}>
              {t('feedback.mentoringSection.title') || 'Best practices'}
            </Text>
            <Text
              fontSize={'TMD'}
              fontWeight={400}
              color={'gray.800'}
              textAlign={'center'}>
              {t('feedback.mentoringSection.subtitle') ||
                'Remember the good practices from your training and put them in practice.'}
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
              <Text
                flex={1}
                fontSize={'TXS'}
                fontWeight={400}
                color={'gray.700'}
                textAlign="center">
                {t('feedback.mentoringSection.bestPratices')}
              </Text>
            </HStack>
          </VStack>
        </Center>

        <VStack
          w={'100%'}
          px={isTablet ? '32px' : 4}
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
              navigate(PathRoutes.feedbackSession.chooseCompetence, {
                replace: true,
                state: params,
              })
            }>
            {t('feedback.mentoringSection.continueButton')}
          </Button>

          <Button
            marginTop={'auto'}
            variant={'outline'}
            borderRadius={'8px'}
            borderColor={'transparent'}
            onPress={() => navigate(PathRoutes.coachScripts)}>
            <Text color={'primary.200'}>
              {t('feedback.mentoringSection.trainingButton')}
            </Text>
          </Button>
        </VStack>
      </VStack>
    </>
  );
};

export default FeedbackSessionAbout;
