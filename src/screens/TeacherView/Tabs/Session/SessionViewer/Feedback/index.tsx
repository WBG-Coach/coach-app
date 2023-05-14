import {isTablet as Tablet} from 'react-native-device-info';
import React, {useEffect, useState} from 'react';
import Feedback from '../../../../../../database/models/Feedback';
import {getWatermelon} from '../../../../../../database';
import {Center, Spinner, Text, VStack} from 'native-base';

type Props = {
  route: {
    params: {
      feedback_id: Feedback['id'];
    };
  };
};

const FeedbackViewScreen: React.FC<any> = ({route: {params}}: Props) => {
  const isTablet = Tablet();
  const [feedback, setFeedback] = useState({
    isLoading: false,
    data: {} as Feedback,
  });

  useEffect(() => {
    (async () => {
      const db = await getWatermelon();
      const feedback = await db.collections
        .get<Feedback>('feedback')
        .find(params.feedback_id);

      setFeedback({
        isLoading: false,
        data: {
          ...(feedback._raw as any),
          competence: (await feedback.competence.fetch())._raw,
        } as Feedback,
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
            Feedback session summary
          </Text>
          <Text mt={1} fontSize={'TMD'} fontWeight={400} color={'gray.700'}>
            Check how was the conversation with the teacher
          </Text>

          <VStack mt={6}>
            <Text fontSize={'LMD'} fontWeight={500} color={'gray.700'}>
              {feedback?.data?.competence?.title}
            </Text>
            <Text mt={1} fontSize={'TMD'} fontWeight={400} color={'gray.600'}>
              Those are the actions you and the teacher agreed they're going to
              take to improve in this teaching practice
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
        </VStack>
      )}
    </VStack>
  );
};

export default FeedbackViewScreen;
