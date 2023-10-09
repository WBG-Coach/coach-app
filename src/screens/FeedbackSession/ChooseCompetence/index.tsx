import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Center,
  FlatList,
  ScrollView,
  Spinner,
  Text,
  VStack,
  View,
} from 'native-base';
import {SessionService} from '../../../services/session.service';
import {Competence, CompetenceAnalytics} from '../../../types/competence';
import {useLocation, useNavigate} from 'react-router-native';
import Button from '../../../components/Button';
import PathRoutes from '../../../routers/paths';
import {useTranslation} from 'react-i18next';
import Page from '../../../components/Page';
import {Question} from '../../../types/question';
import CompetenceItem from './CompetenceItem';

const FeedbackSessionChooseCompetence: React.FC = () => {
  const [competencies, setCompetencies] = useState<CompetenceAnalytics[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question>();
  const navigate = useNavigate();
  const {state} = useLocation();
  const {t} = useTranslation();

  useEffect(() => {
    SessionService.getSessionAnswersGroupedByCompetence(state.sessionId).then(
      setCompetencies,
    );
  }, [state]);

  const goToFeedbackForm = () => {
    const competence = competencies.find(competence =>
      competence.questions.find(
        question => question.id === selectedQuestion?.id,
      ),
    );

    navigate(PathRoutes.feedbackSession.form, {
      replace: true,
      state: {
        competence: {...competence, question: selectedQuestion},
        ...state,
      },
    });
  };

  const renderCompetence = useCallback(
    (competence: Competence) => {
      const question = competence.questions.find(
        question => selectedQuestion?.id === question.id,
      );

      return (
        <CompetenceItem
          key={competence.id}
          competence={competence}
          selectedQuestion={question ? selectedQuestion?.id : ''}
          handleSelectQuestion={setSelectedQuestion}
        />
      );
    },
    [selectedQuestion],
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
            {competencies.length >= 1 ? (
              competencies.map(renderCompetence)
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
        isDisabled={!selectedQuestion}
        onPress={goToFeedbackForm}>
        {t('feedback.preparation.button')}
      </Button>
    </Page>
  );
};

export default FeedbackSessionChooseCompetence;
