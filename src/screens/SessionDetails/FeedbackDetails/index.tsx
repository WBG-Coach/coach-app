import React, {useEffect, useState} from 'react';
import Page from '../../../components/Page';
import {useLocation} from 'react-router-native';
import {
  Center,
  HStack,
  ScrollView,
  Spinner,
  Text,
  TextArea,
  VStack,
} from 'native-base';
import {useTranslation} from 'react-i18next';
import {Session} from '../../../types/session';
import {Feedback} from '../../../types/feedback';
import ImageCard from '../../../components/ImageCard';
import {SessionService} from '../../../services/session.service';

const FeedbackDetailScreen: React.FC = () => {
  const {state} = useLocation();
  const {t} = useTranslation();
  const session: Session = state.session;
  const [feedback, setFeedback] = useState<
    Feedback & {competence_title: string}
  >();

  useEffect(() => {
    SessionService.getFeedbackById(session.feedback_id).then(setFeedback);
  }, [session]);

  return (
    <Page back title={t('sessionDetails.title')}>
      {!feedback ? (
        <Center flex={1}>
          <Spinner size="lg" />
        </Center>
      ) : (
        <VStack flex={1}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text fontSize={'HSM'} fontWeight={600} color={'gray.700'}>
              {t('feedback.form.title')}
            </Text>
            <Text mt={2} fontSize={'TMD'} fontWeight={400} color={'gray.700'}>
              {t('feedback.form.subtitle')}
            </Text>

            <VStack mt={7} space={5}>
              <Text fontSize={'18px'} fontWeight={700} color={'gray.700'}>
                {feedback.competence_title}
              </Text>
              <Text fontSize={'LMD'} fontWeight={500} color={'gray.700'}>
                {t('feedback.form.actionsToImprove')}
              </Text>
              <Text fontSize={'TXS'} fontWeight={400} color={'gray.600'}>
                {t('feedback.form.describeActions')}
              </Text>

              <TextArea
                mt={2}
                isReadOnly
                autoCompleteType=""
                value={feedback.value}
              />
            </VStack>

            {feedback?.images && feedback?.images?.length >= 1 && (
              <VStack>
                <HStack alignItems={'center'} mt={6}>
                  <Text
                    fontSize={'TXL'}
                    flex={1}
                    fontWeight={700}
                    color={'gray.700'}>
                    {t('feedback.form.uploadImage')}
                  </Text>
                </HStack>

                <Text
                  mt={1}
                  fontSize={'TXS'}
                  fontWeight={400}
                  color={'gray.600'}>
                  {t('feedback.form.sendPicture')}
                </Text>

                <VStack flex={1} space={2} mt={6}>
                  {feedback.images?.map((image: any, index) => (
                    <ImageCard {...image} key={index} />
                  ))}
                </VStack>
              </VStack>
            )}
          </ScrollView>
        </VStack>
      )}
    </Page>
  );
};

export default FeedbackDetailScreen;
