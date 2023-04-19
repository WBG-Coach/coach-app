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
import {FeedbackCompletedImg} from '../../../assets/images/feedback';

const FeedbackCompleted: React.FC = () => {
  const isTablet = Tablet();
  const theme = useTheme();

  return (
    <VStack flex={1} py={6} background={'gray.0'} safeAreaBottom>
      <Center flex={1} px={isTablet ? '64px' : 4}>
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
            Feedback complete
          </Text>
          <Text
            fontSize={'TMD'}
            fontWeight={400}
            color={'gray.800'}
            textAlign={'center'}>
            Congratulations, you just completed the coaching process!
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
                What's next?
              </Text>
              <Text mt={1} fontSize={'TXS'} fontWeight={400} color={'gray.700'}>
                Stay prepared for Teaching Learning Circles, until then you can
                create new observations with a teacher by selecting them at the
                app's home
              </Text>
            </VStack>
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
          onPress={() => Navigation.reset(Routes.home)}>
          Go back to home
        </Button>
      </VStack>
    </VStack>
  );
};

export default FeedbackCompleted;
