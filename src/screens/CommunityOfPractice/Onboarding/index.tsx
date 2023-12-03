import React from 'react';
import Page from '../../../components/Page';
import {Box, Button, Text} from 'native-base';
import {useTranslation} from 'react-i18next';
import Timeline from '../../../components/Timeline';
import {useNavigate} from 'react-router-native';
import PathRoutes from '../../../routers/paths';

const COPOnboarding: React.FC = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();

  const process = [
    {
      icon: 'schedule',
      title: t('cop.onboarding.process.$1.title'),
      estimated: t('cop.onboarding.process.$1.subtitle'),
      description: t('cop.onboarding.process.$1.description'),
    },
    {
      icon: 'chart-line',
      title: t('cop.onboarding.process.$2.title'),
      estimated: t('cop.onboarding.process.$2.subtitle'),
      description: t('cop.onboarding.process.$2.description'),
    },
    {
      icon: 'comments',
      title: t('cop.onboarding.process.$3.title'),
      estimated: t('cop.onboarding.process.$3.subtitle'),
      description: t('cop.onboarding.process.$3.description'),
    },
    {
      icon: 'trophy',
      title: t('cop.onboarding.process.$4.title'),
      estimated: t('cop.onboarding.process.$4.subtitle'),
      description: t('cop.onboarding.process.$4.description'),
    },
    {
      icon: 'heart-medical',
      title: t('cop.onboarding.process.$5.title'),
      estimated: t('cop.onboarding.process.$5.subtitle'),
      description: t('cop.onboarding.process.$5.description'),
    },
    {
      icon: 'sign-alt',
      title: t('cop.onboarding.process.$5.title'),
      estimated: t('cop.onboarding.process.$5.subtitle'),
      description: t('cop.onboarding.process.$5.description'),
    },
  ];

  return (
    <Page setting back title={t('cop.onboarding.page_title')}>
      <Text fontSize={'HSM'} fontWeight={600} color={'gray.700'}>
        {t('cop.onboarding.title')}
      </Text>

      <Text fontSize={'TMD'} fontWeight={400} color={'gray.600'}>
        {t('cop.onboarding.subtitle')}
      </Text>

      <Text fontSize={'TMD'} fontWeight={400} color={'gray.700'} mt={6}>
        {t('cop.onboarding.description')}
      </Text>

      <Timeline items={process} />

      <Box pt={3} bg={'white'}>
        <Button
          variant={'solid'}
          borderRadius={'8px'}
          color={'white'}
          background={'primary.200'}
          onPress={() =>
            navigate(PathRoutes.communityOfPractice.checkingStats)
          }>
          {t('cop.onboarding.button')}
        </Button>
      </Box>
    </Page>
  );
};

export default COPOnboarding;
