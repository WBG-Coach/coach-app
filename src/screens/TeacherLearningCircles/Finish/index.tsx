import React, {useContext, useState} from 'react';
import Page from '../../../components/Page';
import LoadingBar from '../LoadingBar';
import {useTranslation} from 'react-i18next';
import {Button, Text, VStack} from 'native-base';
import {useNavigate, useParams} from 'react-router-native';
import PathRoutes from '../../../routers/paths';
import StarRating from '../../../components/StarRating';
import {TLCService} from '../../../services/tlc.service';
import {useCoachContext} from '../../../providers/coach.provider';

const TLCFinish = () => {
  const [starRatingValue, setStarRatingValue] = useState(0);
  const {unitId} = useParams<{unitId: string}>();
  const {currentCoach} = useCoachContext();
  const navigate = useNavigate();
  const {t} = useTranslation();

  const handleFinishTLC = async () => {
    if (currentCoach) {
      await TLCService.create({
        evaluation: starRatingValue.toString(),
        unit_id: unitId,
        coach_id: currentCoach.id,
      });
      navigate(PathRoutes.main);
    }
  };

  return (
    <Page
      setting
      back
      title={t('tlc.page_title')}
      beforePageEl={<LoadingBar />}>
      <VStack flex={1}>
        <Text fontSize={'HSM'} mb={6} fontWeight={600} color={'gray.700'}>
          {t('tlc.finish.title')}
        </Text>
        <Text fontSize={'TMD'} fontWeight={400} color={'gray.700'}>
          {t('tlc.finish.description')}
        </Text>
        <Text mb={1} fontSize={'TSM'} fontWeight={400} color={'gray.600'}>
          {t('tlc.finish.question')}
        </Text>

        <StarRating
          size={5}
          value={starRatingValue}
          onPress={setStarRatingValue}
        />
      </VStack>

      <Button
        pt={4}
        color={'white'}
        variant={'solid'}
        borderRadius={'8px'}
        background={'primary.200'}
        onPress={handleFinishTLC}>
        {t('tlc.finish.button')}
      </Button>
    </Page>
  );
};

export default TLCFinish;
