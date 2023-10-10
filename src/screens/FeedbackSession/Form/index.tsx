import React, {useEffect, useState} from 'react';
import {
  Text,
  VStack,
  HStack,
  TextArea,
  useTheme,
  ScrollView,
  Center,
  Spinner,
} from 'native-base';
import ImagePickerModal from '../../../components/ImagePickerModal';
import {SessionService} from '../../../services/session.service';
import {useLocation, useNavigate} from 'react-router-native';
import {ImageService} from '../../../services/image.service';
import ImageCard from '../../../components/ImageCard';
import PathRoutes from '../../../routers/paths';
import Button from '../../../components/Button';
import {useTranslation} from 'react-i18next';
import Icon from '../../../components/Icon';
import Page from '../../../components/Page';
import {Question} from '../../../types/question';
import {QuestionService} from '../../../services/question.service';

const FeedbackSessionForm: React.FC = () => {
  const [images, setImages] = useState<
    {name: string; value: string; created_at: number}[]
  >([]);
  const {t} = useTranslation();
  const {
    state: {sessionId, answerId},
  } = useLocation();
  const navigate = useNavigate();
  const [question, setQuestion] = useState<Question>();
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [actions, setActions] = useState('');
  const [submittedWithError, setSubmittedWithError] = useState(false);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();

  useEffect(() => {
    QuestionService.findQuestionByAnswerId(answerId).then(setQuestion);
  }, [answerId]);

  const finishCoachSession = async () => {
    setLoading(true);
    if (actions) {
      const feedbackId = await SessionService.createFeedback(
        {
          answer_id: answerId,
          value: actions,
        },
        sessionId,
      );

      await Promise.all(
        images.map(
          async image =>
            await ImageService.saveNewImage(
              image.name,
              image.value,
              feedbackId,
            ),
        ),
      );

      navigate(PathRoutes.feedbackSession.completed, {replace: true});
    } else {
      setSubmittedWithError(true);
    }
    setLoading(false);
  };

  if (!question) {
    return (
      <Center bg="white" w="full" h="full">
        <Spinner size="lg" />
      </Center>
    );
  }

  return (
    <Page back title={t('feedbackSession.title')}>
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
              {question.title}
            </Text>
            <Text fontSize={'LMD'} fontWeight={500} color={'gray.700'}>
              {t('feedback.form.actionsToImprove')}
            </Text>
            <Text fontSize={'TXS'} fontWeight={400} color={'gray.600'}>
              {t('feedback.form.describeActions')}
            </Text>

            <TextArea
              mt={2}
              value={actions}
              isInvalid={submittedWithError}
              autoCompleteType=""
              placeholder={t('feedback.form.textAreaPlaceholder')}
              onChangeText={setActions}
            />
          </VStack>

          <VStack>
            <HStack alignItems={'center'} mt={6}>
              <Text
                fontSize={'TXL'}
                flex={1}
                fontWeight={700}
                color={'gray.700'}>
                {t('feedback.form.uploadImage')}
              </Text>
              <Text fontSize={'TXS'} fontWeight={400} color={'gray.600'}>
                {t('feedback.form.optional')}
              </Text>
            </HStack>

            <Text mt={1} fontSize={'TXS'} fontWeight={400} color={'gray.600'}>
              {t('feedback.form.sendPicture')}
            </Text>

            <Button
              mt={2}
              variant={'outlined'}
              onPress={() => setShowImagePicker(true)}>
              <HStack>
                <Icon name={'image'} color={theme.colors.primary['200']} />
                <Text
                  ml={2}
                  fontSize={'LMD'}
                  fontWeight={500}
                  color={'primary.200'}>
                  {t('feedback.form.uploadPhoto')}
                </Text>
              </HStack>
            </Button>

            <VStack flex={1} space={2} mt={6}>
              {images.map((image: any, index) => (
                <ImageCard
                  {...image}
                  key={index}
                  transformBase
                  handleDelete={() => {
                    const imageCopy = images;
                    imageCopy.splice(index, 1);
                    setImages(JSON.parse(JSON.stringify(imageCopy)));
                  }}
                />
              ))}
            </VStack>
          </VStack>
        </ScrollView>
      </VStack>

      <VStack pt={3} background={'white'} borderRadius={'8px 8px 0px 0px'}>
        <Button onPress={finishCoachSession} isLoading={loading}>
          {t('feedback.form.button')}
        </Button>
      </VStack>

      <ImagePickerModal
        isOpen={showImagePicker}
        onClose={() => setShowImagePicker(false)}
        handleSelectImage={asset =>
          setImages([...images, {...asset, created_at: Date.now()}])
        }
      />
    </Page>
  );
};

export default FeedbackSessionForm;
