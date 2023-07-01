import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  HStack,
  Text,
  TextArea,
  VStack,
  Spinner,
  Center,
  ScrollView,
} from 'native-base';
import {useLocation, useNavigate} from 'react-router-native';
import {isTablet as Tablet} from 'react-native-device-info';
import CompetenceAccordion from './CompetenceAccordion';
import {Competence} from '../../../types/competence';
import PathRoutes from '../../../routers/paths';
import {useTranslation} from 'react-i18next';
import Icon from '../../../components/Icon';
import Button from '../../../components/Button';
import CompetenceService from '../../../services/competence.service';
import Page from '../../../components/Page';

const ClassObservationForm: React.FC<any> = () => {
  const isTablet = Tablet();
  const {t} = useTranslation();
  const {state} = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [keyPoints, setKeyPoints] = useState('');
  const [competencies, setCompetencies] = useState<Competence[]>(
    state.competencies || [],
  );
  const [answers, setAnswers] = useState<{[key: string]: number}>(
    state.answers || {},
  );
  const [competenciesFinished, setCompetenciesFinished] = useState<string[]>(
    state.answers ? state.competencies.map((item: Competence) => item.id) : [],
  );

  console.log({state});

  const isDisable = useMemo(
    () => competenciesFinished.length < competencies.length,
    [competenciesFinished, competencies],
  );

  useEffect(() => {
    if (competencies.length === 0) {
      CompetenceService.listCompetenciesWithQuestions().then(result => {
        setCompetencies(result);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [competencies]);

  const handleSubmitForm = async () => {
    navigate(PathRoutes.classObservation.confirmation, {
      replace: true,
      state: {
        competencies,
        answers,
        session: {...state.session, key_points: keyPoints},
      },
    });
  };

  const goBack = () => {
    navigate(PathRoutes.classObservation.setup, {replace: true, state});
  };

  const renderQuestion = useCallback(
    (competence: Competence, index: number) => (
      <CompetenceAccordion
        index={index}
        key={competence.id}
        competence={competence}
        initialAnswers={state?.answers}
        onComplete={newAnswers => {
          setCompetenciesFinished(currentCompetenciesFinished =>
            currentCompetenciesFinished.includes(competence.id)
              ? currentCompetenciesFinished
              : [...currentCompetenciesFinished, competence.id],
          );
          setAnswers(currentAnswers => ({
            ...currentAnswers,
            ...newAnswers,
          }));
        }}
      />
    ),
    [state],
  );

  if (loading) {
    return (
      <Center bg="white" w="full" h="full">
        <Spinner size="lg" />
      </Center>
    );
  }

  return (
    <Page back title={t('classObservation.title')} onBack={goBack}>
      <ScrollView>
        <Text fontSize={'HSM'} fontWeight={600} color={'gray.700'}>
          {t('classObservation.form.title') || 'Class evaluation'}
        </Text>
        <Text mt={2} fontSize={'TMD'} fontWeight={400} color={'gray.700'}>
          {t('classObservation.form.subtitle') ||
            'Rate each topic with your observation'}
        </Text>

        {competencies.map(renderQuestion)}

        <VStack py={4}>
          <Text fontSize={'TXL'} fontWeight={700} color={'gray.700'}>
            {t('classObservation.form.keyPoints') ||
              'Key points to be discussed'}
          </Text>
          <Text mt={4} fontSize={'LLG'} fontWeight={500} color={'gray.700'}>
            {t('classObservation.form.pointsToDiscuss') ||
              'What you want to discuss with the teacher?'}
          </Text>

          <TextArea
            mt={2}
            value={keyPoints}
            autoCompleteType={'off'}
            onChangeText={setKeyPoints}
            placeholder={'Positive and negative points'}
          />

          <Text mt={2} fontSize={'TXS'} fontWeight={400} color={'gray.600'}>
            {t('classObservation.form.spaceAdditional')}
          </Text>
        </VStack>
      </ScrollView>

      <HStack
        mb={3}
        py={1}
        space={1}
        alignItems={'center'}
        background={'#FEF8EC'}
        px={isTablet ? '32px' : 4}
        mx={isTablet ? '-32px' : -4}>
        <Icon name="star" color={'#9B6908'} size={20} />
        <Text fontSize={'TSM'} fontWeight={400} color={'#9B6908'}>
          {t('classObservation.form.competenciesRated', {
            count: competenciesFinished.length,
            total: competencies.length,
          })}
        </Text>
      </HStack>

      <Button onPress={handleSubmitForm} disabled={isDisable}>
        <Text {...(isDisable && {color: '#9AA2AC'})}>
          {t('classObservation.form.button')}
        </Text>
      </Button>
    </Page>
  );
};

export default ClassObservationForm;
