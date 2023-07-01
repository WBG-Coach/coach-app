import {
  HStack,
  Modal,
  ScrollView,
  Text,
  TextArea,
  useTheme,
  VStack,
} from 'native-base';
import React, {useState} from 'react';
import Icon from '../../../components/Icon';
import {useTranslation} from 'react-i18next';
import {useLocation, useNavigate} from 'react-router-native';
import Page from '../../../components/Page';
import PathRoutes from '../../../routers/paths';
import ImagePicker from '../../../components/ImagePicker';
import ImageCard from '../../../components/ImageCard';
import Button from '../../../components/Button';
import {SessionService} from '../../../services/session.service';
import {ImageService} from '../../../services/image.service';

const FeedbackSessionForm: React.FC = () => {
  const [images, setImages] = useState<
    {name: string; value: string; created_at: number}[]
  >([]);
  const {t} = useTranslation();
  const {
    state: {competence, sessionId},
  } = useLocation();
  const navigate = useNavigate();
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [actions, setActions] = useState('');
  const [submittedWithError, setSubmittedWithError] = useState(false);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();

  const finishCoachSession = async () => {
    setLoading(true);
    if (actions) {
      const feedbackId = await SessionService.createFeedback({
        value: actions,
        session_id: sessionId,
        competence_id: competence.id,
      });

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

  return (
    <Page back title={t('feedbackSession.title')}>
      <VStack flex={1}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text fontSize={'HSM'} fontWeight={600} color={'gray.700'}>
            {t('feedback.defineActions.title') || 'Define the actions'}
          </Text>
          <Text mt={2} fontSize={'TMD'} fontWeight={400} color={'gray.700'}>
            {t('feedback.defineActions.subtitle') ||
              'Define with the teacher what actions they will take to improve this teaching practice'}
          </Text>

          <VStack mt={7} space={5}>
            <Text fontSize={'18px'} fontWeight={700} color={'gray.700'}>
              {competence.title}
            </Text>
            <Text fontSize={'LMD'} fontWeight={500} color={'gray.700'}>
              {t('feedback.defineActions.actionsToImprove') ||
                'Actions to improve'}
            </Text>
            <Text fontSize={'TXS'} fontWeight={400} color={'gray.600'}>
              {t('feedback.defineActions.describeActions') ||
                "Describe the actions you and the teacher agreed they're going to take to improve in this teaching practice"}
            </Text>

            <TextArea
              mt={2}
              value={actions}
              isInvalid={submittedWithError}
              autoCompleteType=""
              placeholder={t('feedback.defineActions.textAreaPlaceholder')}
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
                {t('feedback.defineActions.uploadImage') || 'Upload a image'}
              </Text>
              <Text fontSize={'TXS'} fontWeight={400} color={'gray.600'}>
                {t('feedback.defineActions.optional') || 'Optional'}
              </Text>
            </HStack>

            <Text mt={1} fontSize={'TXS'} fontWeight={400} color={'gray.600'}>
              {t('feedback.defineActions.sendPicture') ||
                'You can also send a picture of the annotations you made during the class observation and mentoring session'}
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
                  {t('feedback.defineActions.uploadPhoto') || 'Upload a photo'}
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
          {t('feedback.defineActions.button')}
        </Button>
      </VStack>

      <Modal
        isOpen={showImagePicker}
        justifyContent="flex-end"
        onClose={() => setShowImagePicker(false)}>
        <VStack bg="white" w="full">
          <ImagePicker
            handleClose={() => setShowImagePicker(false)}
            handleSelectImage={asset =>
              setImages([...images, {...asset, created_at: Date.now()}])
            }
          />
        </VStack>
      </Modal>
    </Page>
  );
};

export default FeedbackSessionForm;
