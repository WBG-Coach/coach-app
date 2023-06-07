import {
  Button,
  Center,
  HStack,
  Image,
  Text,
  useTheme,
  VStack,
} from 'native-base';
import React from 'react';
import {isTablet as Tablet} from 'react-native-device-info';
import Navigation from '../../../services/navigation';
import Routes from '../../../routes/paths';
import {BestPratices} from '../../../assets/images/mentoring';
import Icon from '../../../components/base/Icon';
import Session from '../../../database/models/Session';
import {useTranslation} from 'react-i18next';

type Props = {
  route: {
    params: {
      session_id: Session['id'];
    };
  };
};

const MentoringSection: React.FC<any> = ({route: {params}}: Props) => {
  const {t} = useTranslation();
  const isTablet = Tablet();
  const theme = useTheme();

  return (
    <VStack flex={1} py={6} background={'primary.0'} safeAreaBottom>
      <Center flex={1} px={isTablet ? '64px' : 4}>
        <VStack alignItems={'center'} {...(isTablet && {maxWidth: '500px'})}>
          <Image
            alignSelf={'center'}
            source={BestPratices}
            alt={'A guy looking into you phone'}
          />

          <Text
            fontSize={'HSM'}
            fontWeight={600}
            color={'gray.800'}
            mb={'16px'}
            textAlign={'center'}>
            {t('feedback.mentoringSection.title') || 'Best practices'}
          </Text>
          <Text
            fontSize={'TMD'}
            fontWeight={400}
            color={'gray.800'}
            textAlign={'center'}>
            {t('feedback.mentoringSection.subtitle') ||
              'Remember the good practices from your training and put them in practice.'}
          </Text>

          <HStack
            p={3}
            mt={8}
            width={'100%'}
            borderRadius={'8px'}
            background={'violet.0'}
            space={2}
            alignItems={'center'}>
            <Icon
              size={20}
              name={'info-circle-solid'}
              color={theme.colors.violet['200']}
            />
            <Text flex={1} fontSize={'TXS'} fontWeight={400} color={'gray.700'}>
              {t('feedback.mentoringSection.bestPratices') ||
                "If you don't remember the best practices access the Training Guide"}
            </Text>
          </HStack>
        </VStack>
      </Center>

      <VStack
        w={'100%'}
        px={isTablet ? '64px' : 4}
        pt={3}
        space={4}
        borderRadius={'8px 8px 0px 0px'}>
        <Button
          marginTop={'auto'}
          variant={'solid'}
          borderRadius={'8px'}
          color={'white'}
          background={'primary.200'}
          onPress={() =>
            Navigation.reset(Routes.feedback.mentoringSection, {...params})
          }>
          {t('feedback.mentoringSection.continueButton') ||
            'Continue to feedback preparation'}
        </Button>

        <Button
          marginTop={'auto'}
          variant={'outline'}
          borderRadius={'8px'}
          borderColor={'transparent'}
          onPress={() => Navigation.reset(Routes.home)}>
          <Text color={'primary.200'}>
            {t('feedback.mentoringSection.trainingButton') ||
              'Access Training Guide'}
          </Text>
        </Button>
      </VStack>
    </VStack>
  );
};

export default MentoringSection;
