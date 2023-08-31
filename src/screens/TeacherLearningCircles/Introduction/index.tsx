import React, {useState} from 'react';
import Page from '../../../components/Page';
import LoadingBar from '../LoadingBar';
import {useTranslation} from 'react-i18next';
import {
  Button,
  Center,
  HStack,
  Image,
  ScrollView,
  Text,
  VStack,
  useTheme,
} from 'native-base';
import {useNavigate, useParams} from 'react-router-native';
import PathRoutes from '../../../routers/paths';
import unitsTLC from '../common';
import Icon from '../../../components/Icon';

const TLCIntroduction = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const {unitId} = useParams<{unitId: string}>();
  const navigate = useNavigate();
  const {t} = useTranslation();
  const theme = useTheme();

  const steps = unitsTLC[parseInt(unitId || '0')]?.introduction;
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

          {compData.afterComponent && (
            <VStack>
              <Text
                mt={6}
                mb={3}
                alignSelf={'center'}
                fontSize={'LLG'}
                fontWeight={500}
                color={'gray.700'}>
                {compData.afterComponent.title}
              </Text>

              {compData.afterComponent.items.map((item, index) => (
                <HStack key={index} space={1}>
                  <Icon name={'check'} color={theme.colors.green['200']} />
                  <Text
                    alignSelf={'center'}
                    fontSize={'TSM'}
                    fontWeight={400}
                    color={'gray.700'}>
                    {item}
                  </Text>
                </HStack>
              ))}
            </VStack>
          )}
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
            : navigate(
                PathRoutes.teacherLearningCircles.situations.replace(
                  ':unitId',
                  unitId || '',
                ),
              )
        }>
        {compData.buttonLabel}
      </Button>
    </Page>
  );
};

export default TLCIntroduction;
