import React, {useState} from 'react';
import Page from '../../../components/Page';
import LoadingBar from '../LoadingBar';
import {useTranslation} from 'react-i18next';
import {Button, Center, Image, ScrollView, Text, VStack} from 'native-base';
import {useNavigate} from 'react-router-native';
import PathRoutes from '../../../routers/paths';
import {FirstStepImage} from '../../../assets/images/tlc/introduction';
import FirstStepAfter from './AfterComponents/FirstStep';

const TLCIntroduction = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const {t} = useTranslation();

  const steps = [
    {
      image: FirstStepImage,
      title: t('tlc.introduction.$1.title'),
      subtitle: t('tlc.introduction.$1.description'),
      afterComponent: <FirstStepAfter />,
      buttonLabel: t('tlc.introduction.$1.button'),
    },
    {
      image: FirstStepImage,
      title: t('tlc.introduction.$2.title'),
      subtitle: t('tlc.introduction.$2.description'),
      buttonLabel: t('tlc.introduction.$2.button'),
    },
  ];

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
        {compData.buttonLabel}
      </Button>
    </Page>
  );
};

export default TLCIntroduction;
