import React from 'react';
import Page from '../../../components/Page';
import LoadingBar from '../LoadingBar';
import {useTranslation} from 'react-i18next';
import {Button, Text, VStack} from 'native-base';
import {useNavigate} from 'react-router-native';
import PathRoutes from '../../../routers/paths';
import StarRating from '../../../components/StarRating';

const TLCFinish = () => {
  const navigate = useNavigate();
  const {t} = useTranslation();

  return (
    <Page
      setting
      back
      title={t('tlc.page_title')}
      beforePageEl={<LoadingBar />}>
      <VStack flex={1}>
        <Text fontSize={'HSM'} mb={6} fontWeight={600} color={'gray.700'}>
          Rate the activity
        </Text>
        <Text fontSize={'TMD'} fontWeight={400} color={'gray.700'}>
          How did it go?
        </Text>
        <Text mb={1} fontSize={'TSM'} fontWeight={400} color={'gray.600'}>
          Did they manage to answer correctly? Did they understood the correct
          use of positive language?
        </Text>

        <StarRating size={5} value={0} onPress={answerValue => {}} />
      </VStack>

      <Button
        pt={4}
        variant={'solid'}
        borderRadius={'8px'}
        color={'white'}
        background={'primary.200'}
        onPress={() => navigate(PathRoutes.main)}>
        {'tlc.finish.button'}
      </Button>
    </Page>
  );
};

export default TLCFinish;
