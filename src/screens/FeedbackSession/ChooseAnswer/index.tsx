import React, {useCallback, useEffect, useState} from 'react';
import {Center, ScrollView, Spinner, Text, VStack} from 'native-base';
import {SessionService} from '../../../services/session.service';
import {CompetenceAnswers} from '../../../types/competence';
import {useLocation, useNavigate} from 'react-router-native';
import Button from '../../../components/Button';
import PathRoutes from '../../../routers/paths';
import {useTranslation} from 'react-i18next';
import Page from '../../../components/Page';
import {Answer} from '../../../types/answer';
import AnswerItem from './AnswerItem';

const FeedbackSessionChooseAnswer: React.FC = () => {
  const [competenceAnswers, setCompetenceAnswers] = useState<
    CompetenceAnswers[]
  >([]);
  const [selectedAnswer, setSelectedAnswer] = useState<Answer>();
  const navigate = useNavigate();
  const {state} = useLocation();
  const {t} = useTranslation();

  useEffect(() => {
    SessionService.getSessionAnswersGroupedByCompetence(state.sessionId).then(
      setCompetenceAnswers,
    );
  }, [state]);

  const goToFeedbackForm = () => {
    if (selectedAnswer) {
      navigate(PathRoutes.feedbackSession.form, {
        replace: true,
        state: {
          answerId: selectedAnswer.id,
          ...state,
        },
      });
    }
  };

  const renderCompetence = useCallback(
    (competenceAnswer: CompetenceAnswers) => {
      return (
        <AnswerItem
          key={competenceAnswer.id}
          title={competenceAnswer.title}
          answers={competenceAnswer.answers}
          selectedAnswer={selectedAnswer?.id}
          handleSelectAnswer={setSelectedAnswer}
        />
      );
    },
    [selectedAnswer],
  );

  return (
    <Page back title={t('feedbackSession.title')}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack flex={1} mb={3}>
          <Text fontSize={'HSM'} fontWeight={600} color={'gray.700'}>
            {t('feedback.preparation.title')}
          </Text>
          <Text mt={2} fontSize={'TMD'} fontWeight={400} color={'gray.700'}>
            {t('feedback.preparation.subtitle')}
          </Text>

          <VStack mt={7} space={5} flex={1}>
            {competenceAnswers.length >= 1 ? (
              competenceAnswers.map(renderCompetence)
            ) : (
              <Center bg="white" w="full" h="full">
                <Spinner size="lg" />
              </Center>
            )}
          </VStack>
        </VStack>
      </ScrollView>

      <Button
        marginTop={'auto'}
        isDisabled={!selectedAnswer}
        onPress={goToFeedbackForm}>
        {t('feedback.preparation.button')}
      </Button>
    </Page>
  );
};

export default FeedbackSessionChooseAnswer;
