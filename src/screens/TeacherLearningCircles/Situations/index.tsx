import React from 'react';
import Page from '../../../components/Page';
import LoadingBar from '../LoadingBar';
import {useTranslation} from 'react-i18next';
import {Button, VStack} from 'native-base';
import {useNavigate} from 'react-router-native';
import PathRoutes from '../../../routers/paths';

const TLCSituations = () => {
  const navigate = useNavigate();
  const {t} = useTranslation();

  return (
    <Page
      setting
      back
      title={t('tlc.page_title')}
      beforePageEl={<LoadingBar />}>
      <VStack flex={1}></VStack>

      <Button
        pt={4}
        variant={'solid'}
        borderRadius={'8px'}
        color={'white'}
        background={'primary.200'}
        onPress={() => navigate(PathRoutes.teacherLearningCircles.explanation)}>
        {'tlc.situations.button'}
      </Button>
    </Page>
  );
};

export default TLCSituations;
