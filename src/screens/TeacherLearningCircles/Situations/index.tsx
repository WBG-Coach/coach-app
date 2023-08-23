import React from 'react';
import Page from '../../../components/Page';
import LoadingBar from '../LoadingBar';
import {useTranslation} from 'react-i18next';
import {Button, Text, VStack} from 'native-base';
import {useNavigate} from 'react-router-native';
import PathRoutes from '../../../routers/paths';
import AvaliativeList from '../../../components/AvaliativeList';
import {AvaliativeItem} from '../../../components/AvaliativeList/types';

const TLCSituations = () => {
  const navigate = useNavigate();
  const {t} = useTranslation();

  const items: AvaliativeItem[] = [
    {
      icon: 'badExample',
      title: t('tlc.situations.steps.$1.title'),
      description: t('tlc.situations.steps.$1.description'),
      box: {
        title: t('tlc.situations.steps.$1.box.title'),
        description: t('tlc.situations.steps.$1.box.description'),
      },
    },
    {
      icon: 'goodExample',
      title: t('tlc.situations.steps.$2.title'),
      description: t('tlc.situations.steps.$2.description'),
      box: {
        title: t('tlc.situations.steps.$2.box.title'),
        description: t('tlc.situations.steps.$2.box.description'),
      },
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
          {t('tlc.situations.title')}
        </Text>
        <Text mb={8} fontSize={'TMD'} fontWeight={400} color={'gray.700'}>
          {t('tlc.situations.description')}
        </Text>

        <AvaliativeList items={items} />
      </VStack>

      <Button
        pt={4}
        variant={'solid'}
        borderRadius={'8px'}
        color={'white'}
        background={'primary.200'}
        onPress={() => navigate(PathRoutes.teacherLearningCircles.explanation)}>
        {t('tlc.situations.button')}
      </Button>
    </Page>
  );
};

export default TLCSituations;
