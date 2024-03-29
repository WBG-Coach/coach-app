import React from 'react';
import Page from '../../../components/Page';
import {Box, Button, Text} from 'native-base';
import {useTranslation} from 'react-i18next';
import Timeline from '../../../components/Timeline';
import {useNavigate} from 'react-router-native';
import PathRoutes from '../../../routers/paths';

const TLCOnboarding: React.FC = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();

  const process = [
    {
      icon: 'chart-line',
      title: t('tlc.onboarding.process.step1.title'),
      estimated: t('tlc.onboarding.process.step1.subtitle'),
      description: t('tlc.onboarding.process.step1.description'),
    },
    {
      icon: 'award',
      title: t('tlc.onboarding.process.step2.title'),
      estimated: t('tlc.onboarding.process.step2.subtitle'),
      description: t('tlc.onboarding.process.step2.description'),
    },
    {
      icon: 'play-circle',
      title: t('tlc.onboarding.process.step3.title'),
      estimated: t('tlc.onboarding.process.step3.subtitle'),
      description: t('tlc.onboarding.process.step3.description'),
    },
    {
      icon: 'comments',
      title: t('tlc.onboarding.process.step4.title'),
      estimated: t('tlc.onboarding.process.step4.subtitle'),
      description: t('tlc.onboarding.process.step4.description'),
    },
    {
      icon: 'comment-verify',
      title: t('tlc.onboarding.process.step5.title'),
      estimated: t('tlc.onboarding.process.step5.subtitle'),
      description: t('tlc.onboarding.process.step5.description'),
    },
    {
      icon: 'clipboard-notes',
      title: t('tlc.onboarding.process.step5.title'),
      estimated: t('tlc.onboarding.process.step5.subtitle'),
      description: t('tlc.onboarding.process.step5.description'),
    },
  ];

  return (
    <Page setting back title={t('tlc.page_title')}>
      <Text fontSize={'HSM'} fontWeight={600} color={'gray.800'}>
        {t('tlc.onboarding.title')}
      </Text>

      <Text fontSize={'TMD'} fontWeight={400} color={'gray.800'}>
        {t('tlc.onboarding.subtitle')}
      </Text>

      <Timeline items={process} />

      <Box pt={3} bg={'white'}>
        <Button
          variant={'solid'}
          borderRadius={'8px'}
          color={'white'}
          background={'primary.200'}
          onPress={() =>
            navigate(PathRoutes.teacherLearningCircles.checkingStats)
          }>
          {t('tlc.onboarding.button')}
        </Button>
      </Box>
    </Page>
  );
};

export default TLCOnboarding;
