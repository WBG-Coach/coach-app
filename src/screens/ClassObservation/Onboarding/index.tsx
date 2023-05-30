import {
  Button,
  HStack,
  useTheme,
  VStack,
  Text,
  Image,
  Center,
} from 'native-base';
import React, {useRef, useState} from 'react';
import {Dimensions} from 'react-native';
import {useSharedValue, withTiming} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import * as OnboardingImages from '../../../assets/images/onboarding';
import CarouselPaginate from '../../../components/Carousel/CarouselPaginate';
import Navigation from '../../../services/navigation';
import Routes from '../../../routes/paths';
import {isTablet as Tablet} from 'react-native-device-info';
import {useTranslation} from 'react-i18next';

const ClassOnboarding: React.FC<any> = () => {
  const {width: PAGE_WIDTH} = Dimensions.get('window');
  const [lowProgress, setLowProgress] = useState(0);
  const progressValue = useSharedValue<number>(0);
  const pressAnim = useSharedValue<number>(0);
  const carouselRef = useRef<any>();
  const {t} = useTranslation();
  const isTablet = Tablet();
  const theme = useTheme();

  const data = [
    {
      image: OnboardingImages['InformTeacherOnboarding'],
      title:
        t('classObservation.onboarding.sections.$1.title') ||
        'Inform the teacher',
      subtitle:
        t('classObservation.onboarding.sections.$1.subtitle') ||
        "Make sure to contact the teacher and let they know you're going to observe the class and have a mentoring session",
    },
    {
      image: OnboardingImages['BewareTimeOnboarding'],
      title:
        t('classObservation.onboarding.sections.$2.title') ||
        'Beware of the time',
      subtitle:
        t('classObservation.onboarding.sections.$2.subtitle') ||
        'Plan to spend 60 to 75 minutes with the teacher. Use this time to observe their class and to have the mentoring session',
    },
    {
      image: OnboardingImages['MakeNotesOnboarding'],
      title: t('classObservation.onboarding.sections.$3.title') || 'Make notes',
      subtitle:
        t('classObservation.onboarding.sections.$3.subtitle') ||
        'The notes will help you to answer the observation questions and plan the future mentoring sessions',
    },
  ];

  return (
    <VStack flex={1} background={'primary.0'} safeAreaBottom>
      <VStack flex={1} mt={6}>
        <Carousel
          loop={false}
          ref={carouselRef}
          onScrollBegin={() => {
            pressAnim.value = withTiming(1);
          }}
          onScrollEnd={() => {
            pressAnim.value = withTiming(0);
          }}
          data={data}
          width={PAGE_WIDTH * 1}
          onProgressChange={(_, absoluteProgress) => {
            progressValue.value = absoluteProgress;
          }}
          onSnapToItem={setLowProgress}
          renderItem={({item, index}) => (
            <Center key={index} flex={1}>
              <VStack
                alignItems={'center'}
                {...(isTablet && {maxWidth: '500px'})}>
                <Image
                  alignSelf={'center'}
                  source={item.image}
                  alt={'Coach logo'}
                />

                <Text
                  fontSize={'HSM'}
                  fontWeight={600}
                  color={'gray.800'}
                  mb={'16px'}
                  textAlign={'center'}>
                  {item.title}
                </Text>
                <Text
                  fontSize={'TMD'}
                  fontWeight={400}
                  color={'gray.800'}
                  textAlign={'center'}>
                  {item.subtitle}
                </Text>
              </VStack>
            </Center>
          )}
        />
      </VStack>

      <HStack w={'100%'} justifyContent={'center'} py={2} space={2} mb={2}>
        {data.map((_, index) => (
          <CarouselPaginate
            backgroundColor={theme.colors.primary['200']}
            animValue={progressValue}
            index={index}
            key={index}
            isRotate={false}
            length={data.length}
          />
        ))}
      </HStack>

      <HStack px={isTablet ? '64px' : 4} space={'8px'} mb={6}>
        <Button
          flex={1}
          borderRadius={'8px'}
          borderWidth={0}
          variant={'outline'}
          onPress={() => Navigation.navigate(Routes.classObservation.setup)}>
          <Text color={'primary.200'}>
            {t('classObservation.onboarding.skip') || 'Skip'}
          </Text>
        </Button>
        <Button
          flex={1}
          variant={'solid'}
          borderRadius={'8px'}
          color={'white'}
          background={'primary.200'}
          onPress={
            lowProgress !== data.length - 1
              ? () => carouselRef.current.next()
              : () => Navigation.navigate(Routes.classObservation.setup)
          }>
          {lowProgress === data.length - 1
            ? t('classObservation.onboarding.start') || 'Start'
            : t('classObservation.onboarding.next') || 'Next'}
        </Button>
      </HStack>
    </VStack>
  );
};

export default ClassOnboarding;
