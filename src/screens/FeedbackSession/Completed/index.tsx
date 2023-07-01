import {Center, HStack, Image, Text, useTheme, VStack} from 'native-base';
import React from 'react';
import Icon from '../../../components/Icon';
import {FeedbackCompletedImg} from '../../../assets/images/feedback';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-native';
import Page from '../../../components/Page';
import Button from '../../../components/Button';

const FeedbackSessionCompleted: React.FC = () => {
  const {t} = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Page>
      <Center flex={1}>
        <VStack alignItems={'center'}>
          <Image
            alignSelf={'center'}
            source={FeedbackCompletedImg}
            alt={'Two persons in screen'}
            width={349}
            height={216}
          />

          <Text
            fontSize={'HSM'}
            fontWeight={600}
            color={'gray.800'}
            mb={'16px'}
            textAlign={'center'}>
            {t('feedback.feedbackCompleted.title') || 'Feedback complete'}
          </Text>
          <Text
            fontSize={'TMD'}
            fontWeight={400}
            color={'gray.800'}
            textAlign={'center'}>
            {t('feedback.feedbackCompleted.subtitle') ||
              'Congratulations, you just completed the coaching process!'}
          </Text>

          <HStack
            p={3}
            mt={8}
            borderRadius={'8px'}
            background={'violet.0'}
            space={2}
            alignItems={'center'}>
            <Icon
              size={20}
              name={'info-circle-solid'}
              color={theme.colors.violet['200']}
            />

            <VStack>
              <Text fontSize={'LSM'} fontWeight={500} color={'gray.700'}>
                {t('feedback.feedbackCompleted.aboutNext') || "What's next?"}
              </Text>
              <Text mt={1} fontSize={'TXS'} fontWeight={400} color={'gray.700'}>
                {t('feedback.feedbackCompleted.aboutNextDescription') ||
                  "Stay prepared for Teaching Learning Circles, until then you can create new observations with a teacher by selecting them at the app's home"}
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </Center>

      <VStack w={'100%'} pt={3} space={4}>
        <Button onPress={() => navigate(-999)}>
          {t('feedback.feedbackCompleted.button')}
        </Button>
      </VStack>
    </Page>
  );
};

export default FeedbackSessionCompleted;
