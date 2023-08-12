import React, {useState} from 'react';
import Page from '../../../components/Page';
import LoadingBar from '../LoadingBar';
import {useTranslation} from 'react-i18next';
import {Button, Center, Image, ScrollView, Text, VStack} from 'native-base';
import {useNavigate} from 'react-router-native';
import PathRoutes from '../../../routers/paths';
import {FirstStepImage} from '../../../assets/images/tlc/introduction';
import FirstStepAfter from './AfterComponents/FirstStep';

const steps = [
  {
    image: FirstStepImage,
    title: 'Introduction',
    subtitle:
      'This Teacher Learning Circle is about using positive language in the classroom to create an encouraging learning environment for students.',
    afterComponent: <FirstStepAfter />,
    buttonLabel: 'tlc.introduction.first-button',
  },
  {
    image: FirstStepImage,
    title: 'Why is it useful to use positive language in the classroom?',
    subtitle:
      'It is important to create a classroom environment where students can feel emotionally safe and supported. All students feel welcome if the teacher treats them all respectfully.',
    buttonLabel: 'tlc.introduction.second-button',
  },
];

const TLCIntroduction = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const {t} = useTranslation();

  const compData = steps[currentStep];

  return (
    <Page
      setting
      back
      title={t('tlc.page_title')}
      beforePageEl={<LoadingBar />}>
      <VStack flex={1}>
        <ScrollView w={'full'} flex={1}>
          <Center>
            <Image
              source={compData.image}
              alt={'A guy looking into you phone'}
            />
          </Center>

          <Text
            mt={6}
            alignSelf={'center'}
            fontSize={'HSM'}
            fontWeight={600}
            color={'gray.700'}>
            {compData.title}
          </Text>

          <Text
            mt={2}
            alignSelf={'center'}
            fontSize={'TMD'}
            fontWeight={400}
            textAlign={'center'}
            color={'gray.700'}>
            {compData.subtitle}
          </Text>

          {compData.afterComponent}
        </ScrollView>
      </VStack>

      <Button
        pt={4}
        variant={'solid'}
        borderRadius={'8px'}
        color={'white'}
        background={'primary.200'}
        onPress={() =>
          currentStep !== steps.length - 1
            ? setCurrentStep(currentStep + 1)
            : navigate(PathRoutes.teacherLearningCircles.situations)
        }>
        {t(compData.buttonLabel)}
      </Button>
    </Page>
  );
};

export default TLCIntroduction;
