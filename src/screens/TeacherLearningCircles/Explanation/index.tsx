import React from 'react';
import Page from '../../../components/Page';
import LoadingBar from '../LoadingBar';
import {useTranslation} from 'react-i18next';
import {Button, Text, VStack} from 'native-base';
import {useNavigate} from 'react-router-native';
import PathRoutes from '../../../routers/paths';
import AvaliativeList from '../../../components/AvaliativeList';
import {AvaliativeItem} from '../../../components/AvaliativeList/types';

const TLCExplanation = () => {
  const navigate = useNavigate();
  const {t} = useTranslation();

  const items: AvaliativeItem[] = [
    {
      icon: 'badExample',
      title: t('tlc.explanation.steps.$1.title'),
      description: t('tlc.explanation.steps.$1.description'),
    },
    {
      icon: 'goodExample',
      title: t('tlc.explanation.steps.$2.title'),
      description: t('tlc.explanation.steps.$2.description'),
    },
  ];

  return (
    <Page
      setting
      back
      title={t('tlc.page_title')}
      beforePageEl={<LoadingBar />}>
      <VStack flex={1}>
        <Text fontSize={'HSM'} fontWeight={600} color={'gray.700'}>
          {t('tlc.explanation.title')}
        </Text>
        <Text mb={8} fontSize={'TMD'} fontWeight={400} color={'gray.700'}>
          {t('tlc.explanation.description')}
        </Text>

        <AvaliativeList items={items} />
      </VStack>

      <Button
        pt={4}
        variant={'solid'}
        borderRadius={'8px'}
        color={'white'}
        background={'primary.200'}
        onPress={() => navigate(PathRoutes.teacherLearningCircles.activities)}>
        {'tlc.explanation.button'}
      </Button>
    </Page>
  );
};

export default TLCExplanation;
