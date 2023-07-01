import React, {useEffect, useMemo, useState} from 'react';
import {
  Button,
  Center,
  HStack,
  Spinner,
  Text,
  useTheme,
  VStack,
} from 'native-base';
import Icon from '../../../components/Icon';
import {useTranslation} from 'react-i18next';
import PathRoutes from '../../../routers/paths';
import {useCoachContext} from '../../../providers/coach.provider';
import {SessionService} from '../../../services/session.service';
import GeolocationService from '../../../services/geolocation.service';
import {useLocation, useNavigate} from 'react-router-native';
import {Competence} from '../../../types/competence';
import {Question} from '../../../types/question';
import CompetenceView from './CompetenceView';
import Page from '../../../components/Page';
import {Answer} from '../../../types/answer';

const ClassObservationConfirmation: React.FC = () => {
  const theme = useTheme();
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const {currentCoach, currentSchool} = useCoachContext();
  const {
    state: {answers, session, competencies},
  } = useLocation();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    });
  }, []);

  const competencyFormatted = useMemo(
    () =>
      competencies.reduce(
        (
          acc: Array<Competence & {overall_rating: number}>,
          item: Competence,
        ) => {
          let questionsMax = 0;

          const questions = item.questions.map(question => {
            const value = parseInt(answers[question.id] || '0', 10);

            questionsMax += value;
            return {
              ...question,
              value,
            };
          }) as Array<Question & {value: number}>;

          const competence = {
            ...item,
            questions: questions,
            overall_rating:
              Math.round(questionsMax / item.questions.length) - 1,
          };

          return [...acc, competence];
        },
        [],
      ),
    [answers, competencies],
  );

  const handlePressContinue = async () => {
    try {
      setIsLoading(true);

      const location = await GeolocationService.getLocation();

      const parsedAnswers: Partial<Answer>[] = Object.keys(answers).map(
        question_id => ({question_id, value: answers[question_id]}),
      );

      const sessionId = await SessionService.create(
        {
          students_count: session.students_count,
          subject: session.subject,
          lesson_time: session.lesson_time,
          objective: session.objective,
          school_id: currentSchool?.id,
          coach_id: currentCoach?.id,
          key_points: session.key_points,
          teacher_id: session.teacher_id,
          latitude: location.latitude,
          longitude: location.longitude,
        },
        parsedAnswers,
      );

      navigate(
        PathRoutes.classObservation.completed.replace(':sessionId', sessionId),
        {
          replace: true,
        },
      );
    } catch (err) {
      console.log(err);
    }
  };

  const goBack = () => {
    navigate(PathRoutes.classObservation.form, {
      replace: true,
      state: {answers, session, competencies},
    });
  };

  if (loading) {
    return (
      <Center bg="white" w="full" h="full">
        <Spinner size="lg" />
      </Center>
    );
  }

  return (
    <Page back title={t('classObservation.title')} onBack={goBack}>
      {!competencyFormatted ? (
        <Center flex={1}>
          <Spinner size={'lg'} />
        </Center>
      ) : (
        <>
          <VStack flex={1}>
            <CompetenceView competences={competencyFormatted} />
          </VStack>

          <VStack w={'100%'} pt={3} space={4}>
            <Button
              onPress={handlePressContinue}
              marginTop={'auto'}
              variant={'solid'}
              borderRadius={'8px'}
              color={'white'}
              isLoading={isLoading}
              background={'primary.200'}>
              <HStack alignItems={'center'} space={2}>
                <Icon name={'check'} color={theme.colors.white} />
                <Text>{t('classObservation.formConfirmation.button')}</Text>
              </HStack>
            </Button>

            <Button
              onPress={goBack}
              marginTop={'auto'}
              variant={'outline'}
              borderRadius={'8px'}
              isLoading={isLoading}
              borderColor={'primary.200'}>
              <HStack alignItems={'center'} space={2}>
                <Icon name={'pen'} color={theme.colors.primary['200']} />
                <Text color={'primary.200'}>
                  {t('classObservation.formConfirmation.buttonEdit')}
                </Text>
              </HStack>
            </Button>
          </VStack>
        </>
      )}
    </Page>
  );
};

export default ClassObservationConfirmation;
