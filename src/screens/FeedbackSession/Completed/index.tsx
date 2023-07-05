import {Center, HStack, Image, Text, useTheme, VStack} from 'native-base';
import React, {useEffect} from 'react';
import Icon from '../../../components/Icon';
import {FeedbackCompletedImg} from '../../../assets/images/feedback';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-native';
import Page from '../../../components/Page';
import Button from '../../../components/Button';
import {useNetInfo} from '@react-native-community/netinfo';
import SyncService from '../../../services/sync.service';

const FeedbackSessionCompleted: React.FC = () => {
  const {isConnected} = useNetInfo();
  const navigate = useNavigate();
  const {t} = useTranslation();
  const theme = useTheme();

  useEffect(() => {
    if (isConnected) {
      SyncService.trySyncData();
    }
  }, [isConnected]);

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
            {t('feedback.completed.title')}
          </Text>
          <Text
            fontSize={'TMD'}
            fontWeight={400}
            color={'gray.800'}
            textAlign={'center'}>
            {t('feedback.completed.subtitle')}
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
                {t('feedback.completed.aboutNext')}
              </Text>
              <Text mt={1} fontSize={'TXS'} fontWeight={400} color={'gray.700'}>
                {t('feedback.completed.aboutNextDescription')}
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </Center>

      <VStack w={'100%'} pt={3} space={4}>
        <Button onPress={() => navigate(-999)}>
          {t('feedback.completed.button')}
        </Button>
      </VStack>
    </Page>
  );
};

export default FeedbackSessionCompleted;
