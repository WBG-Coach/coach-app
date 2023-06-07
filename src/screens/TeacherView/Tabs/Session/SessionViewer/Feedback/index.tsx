import {isTablet as Tablet} from 'react-native-device-info';
import React, {useEffect, useState} from 'react';
import Feedback from '../../../../../../database/models/Feedback';
import {getWatermelon} from '../../../../../../database';
import {Center, Spinner, Text, VStack} from 'native-base';
import Image from '../../../../../../database/models/Image';
import ImageCard from '../../../../../../components/ImageCard';
import {useTranslation} from 'react-i18next';

type Props = {
  route: {
    params: {
      feedback_id: Feedback['id'];
    };
  };
};

const FeedbackViewScreen: React.FC<any> = ({route: {params}}: Props) => {
  const isTablet = Tablet();
  const {t} = useTranslation();
  const [feedback, setFeedback] = useState({
    isLoading: false,
    data: {} as Omit<Feedback, 'images'> & {images: Image[]},
  });

  useEffect(() => {
    (async () => {
      const db = await getWatermelon();
      const feedbackInDb = await db.collections
        .get<Feedback>('feedback')
        .find(params.feedback_id);

      setFeedback({
        isLoading: false,
        data: {
          ...(feedbackInDb._raw as any),
          competence: (await feedbackInDb.competence.fetch())._raw,
          images: (await feedbackInDb.images.fetch())?.map(
            image => image?._raw,
          ),
        } as typeof feedback.data,
      });
    })();
  }, []);

  return (
    <VStack flex={1} px={isTablet ? '64px' : 4} py={4} background={'white'}>
      {feedback.isLoading ? (
        <Center flex={1}>
          <Spinner size={'lg'} />
        </Center>
      ) : (
        <VStack flex={1}>
          <Text fontSize={'HXS'} fontWeight={600} color={'gray.700'}>
            {t('teacher.tabs.session.feedback.title') ||
              'Feedback session summary'}
          </Text>
          <Text mt={1} fontSize={'TMD'} fontWeight={400} color={'gray.700'}>
            {t('teacher.tabs.session.feedback.subtitle') ||
              'Check how was the conversation with the teacher'}
          </Text>

          <VStack mt={6}>
            <Text fontSize={'LMD'} fontWeight={500} color={'gray.700'}>
              {feedback?.data?.competence?.title}
            </Text>
            <Text mt={1} fontSize={'TMD'} fontWeight={400} color={'gray.600'}>
              {t('teacher.tabs.session.feedback.actions') ||
                "Those are the actions you and the teacher agreed they're going to take to improve in this teaching practice"}
            </Text>

            <VStack
              p={3}
              mt={2}
              w={'100%'}
              borderColor={'gray.200'}
              borderWidth={'1px'}
              borderRadius={'8px'}>
              <Text fontSize={'TMD'} fontWeight={400} color={'gray.600'}>
                {feedback.data.value}
              </Text>
            </VStack>
          </VStack>
          <VStack mt={6} flex={1}>
            <Text fontSize={'LMD'} fontWeight={500} color={'gray.700'}>
              {t('teacher.tabs.session.feedback.image') || 'Image uploaded'}
            </Text>
            <Text mt={1} fontSize={'TMD'} fontWeight={400} color={'gray.600'}>
              {t('teacher.tabs.session.feedback.imageDescription') ||
                "You can check the image you've sent of you annotations"}
            </Text>
            <VStack flex={1} space={2} mt={6}>
              {feedback.data?.images?.map((image, index) => (
                <ImageCard {...(image as any)} key={index} />
              ))}
            </VStack>
          </VStack>
        </VStack>
      )}
    </VStack>
  );
};

export default FeedbackViewScreen;
