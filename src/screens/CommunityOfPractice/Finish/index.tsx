import React, {useState} from 'react';
import Page from '../../../components/Page';
import {useTranslation} from 'react-i18next';
import {Image, Text, VStack} from 'native-base';
import {COPFinishImg} from '../../../assets/images/cop/finish';
import Button from '../../../components/Button';
import {useLocation, useNavigate} from 'react-router-native';
import {COPService} from '../../../services/cop.service';
import {useCoachContext} from '../../../providers/coach.provider';
import {ImageService} from '../../../services/image.service';
import PathRoutes from '../../../routers/paths';

const COPFinish = () => {
  const {t} = useTranslation();
  const {state} = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {currentCoach, currentSchool} = useCoachContext();

  const handleSubmitCOP = async () => {
    setIsLoading(true);
    try {
      await Promise.all(
        Object.keys(state).map(async type => {
          const external_id = await COPService.create(
            type,
            state[type].value,
            currentSchool?.id as string,
            currentCoach?.id as string,
          );

          await Promise.all(
            state[type].images.map(
              async (image_id: string) =>
                await ImageService.updateImage(image_id, '', '', external_id),
            ),
          );
        }),
      );

      navigate(PathRoutes.home.main, {replace: true});
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  return (
    <Page setting title={t('cop.finish.page_title')}>
      <VStack flex={1} alignItems={'center'}>
        <Image
          alignSelf={'center'}
          mb={6}
          source={COPFinishImg}
          alt={'A teacher in classroom'}
        />
        <Text
          fontSize={'HSM'}
          fontWeight={600}
          color={'gray.800'}
          textAlign={'center'}>
          {t('cop.finish.title')}
        </Text>

        <Text
          mt={2}
          fontSize={'TMD'}
          fontWeight={400}
          color={'gray.600'}
          textAlign={'center'}>
          {t('cop.finish.description')}
        </Text>
      </VStack>

      <Button
        pt={4}
        variant={'solid'}
        borderRadius={'8px'}
        color={'white'}
        background={'primary.200'}
        isLoading={isLoading}
        onPress={handleSubmitCOP}>
        {t('cop.finish.button')}
      </Button>
    </Page>
  );
};

export default COPFinish;
