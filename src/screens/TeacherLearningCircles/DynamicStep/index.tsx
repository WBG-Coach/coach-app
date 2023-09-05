import React, {useState} from 'react';
import Page from '../../../components/Page';
import LoadingBar from '../LoadingBar';
import {ScrollView, Text, VStack} from 'native-base';
import Button from '../../../components/Button';
import {useLocation, useNavigate, useParams} from 'react-router-native';
import {useTranslation} from 'react-i18next';
import PathRoutes from '../../../routers/paths';
import unitsTLC from '../common';
import {DynamicPage, Unit} from '../../../types/unit';
import EvaluativeList from '../../../components/EvaluativeList';
import Chat from '../../../components/Chat';
import TipBox from '../../../components/EvaluativeList/TipBox';

const TLCDynamicStep = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const {unitId} = useParams<{unitId: string}>();
  const navigate = useNavigate();
  const location = useLocation();
  const {t} = useTranslation();

  const currentPage = Object.keys(PathRoutes.teacherLearningCircles).find(key =>
    location.pathname.includes(
      (PathRoutes.teacherLearningCircles as any)[key].replace('/:unitId', ''),
    ),
  ) as keyof Unit;

  const steps = unitsTLC[parseInt(unitId || '0')][currentPage];
  const step = steps[currentStep] as DynamicPage;

  return (
    <Page
      setting
      back
      title={t('tlc.page_title')}
      beforePageEl={<LoadingBar />}
      onBack={() =>
        currentStep >= 1 ? setCurrentStep(currentStep - 1) : navigate(-1)
      }>
      <ScrollView flex={1}>
        <Text fontSize={'HSM'} fontWeight={600} color={'gray.700'}>
          {step.title}
        </Text>
        <Text mb={8} fontSize={'TMD'} fontWeight={400} color={'gray.700'}>
          {step.subtitle}
        </Text>

        {step.evaluativeList && (
          <VStack space={6}>
            {step.evaluativeList.map((evaluative, index) => (
              <VStack key={index}>
                <EvaluativeList item={evaluative.item} />
                {evaluative.box && <TipBox {...evaluative.box} />}
              </VStack>
            ))}
          </VStack>
        )}

        {step.chat &&
          step.chat.map((chat, index) => (
            <VStack key={index}>
              <Chat messages={chat.messages} />
              {chat.box && <TipBox {...chat.box} />}
            </VStack>
          ))}
      </ScrollView>

      <Button
        mt={4}
        variant={'solid'}
        borderRadius={'8px'}
        color={'white'}
        background={'primary.200'}
        onPress={() =>
          step.nextRoute
            ? navigate(step.nextRoute.replace(':unitId', unitId || ''))
            : setCurrentStep(currentStep + 1)
        }>
        {step.buttonLabel}
      </Button>
    </Page>
  );
};

export default TLCDynamicStep;
