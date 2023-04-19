import {Button, Center, HStack, Text, useTheme, VStack} from 'native-base';
import {isTablet as Tablet} from 'react-native-device-info';
import React from 'react';
import Icon from '../../../components/base/Icon';
import Navigation from '../../../services/navigation';
import Routes from '../../../routes/paths';

const ObservationCompleted: React.FC = () => {
  const starsLength = Array(5).fill({});
  const isTablet = Tablet();
  const theme = useTheme();

  return (
    <VStack flex={1} py={6} safeAreaBottom bg={'gray.0'}>
      <Center flex={1} px={isTablet ? '64px' : 4} flexDirection={'column'}>
        <Center
          w={'48px'}
          h={'48px'}
          borderRadius={'24px'}
          background={'green.100'}>
          <Icon name={'check'} color={theme.colors.green['300']} size={30} />
        </Center>

        <HStack mt={2} space={3}>
          {starsLength.map((_, index) => (
            <Icon
              size={30}
              key={index}
              name={'star-solid'}
              color={theme.colors.yellow['200']}
            />
          ))}
        </HStack>

        <Text mt={8} fontSize={'HSM'} fontWeight={600} color={'gray.700'}>
          Class observation complete
        </Text>
        <Text mt={2} fontSize={'TMD'} fontWeight={400} color={'gray.600'}>
          Congratulations, you just completed the class evaluation process!
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
          <VStack flex={1}>
            <Text fontSize={'LSM'} fontWeight={500} color={'gray.700'}>
              What's next?
            </Text>
            <Text mt={1} fontSize={'TXS'} fontWeight={400} color={'gray.700'}>
              You can start the feedback with the teacher right now or you can
              go back to the home and do it later by selecting the teacher
              profile
            </Text>
          </VStack>
        </HStack>
      </Center>

      <VStack
        w={'100%'}
        px={isTablet ? '64px' : 4}
        background={'white'}
        pt={3}
        space={4}
        borderRadius={'8px 8px 0px 0px'}>
        <Button
          marginTop={'auto'}
          variant={'solid'}
          borderRadius={'8px'}
          color={'white'}
          background={'primary.200'}
          onPress={() => Navigation.reset(Routes.feedback.mentoringSection)}>
          Start feedback preparation
        </Button>

        <Button
          marginTop={'auto'}
          variant={'outline'}
          borderRadius={'8px'}
          borderColor={'white'}
          onPress={() => Navigation.reset(Routes.home)}>
          <Text color={'primary.200'}>Go back to home</Text>
        </Button>
      </VStack>
    </VStack>
  );
};

export default ObservationCompleted;
