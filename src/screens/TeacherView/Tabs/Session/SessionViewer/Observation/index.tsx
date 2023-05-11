import {isTablet as Tablet} from 'react-native-device-info';
import {Center, Spinner, VStack} from 'native-base';
import React, {useEffect, useMemo, useState} from 'react';
import Competence from '../../../../../../database/models/Competence';
import {getWatermelon} from '../../../../../../database';
import {CompetenceWithQuestions} from '../../../../../../providers/contexts/CompetencesContext';
import Answer from '../../../../../../database/models/Answer';
import Question from '../../../../../../database/models/Question';
import CompetenceView from '../../../../../ClassObservation/FormConfirmation/CompetenceView';

type Props = {
  route: {
    params: {
      answers: Answer[];
    };
  };
};

const ObservationViewScreen: React.FC<any> = ({route: {params}}: Props) => {
  const {answers} = params;
  const [competences, setCompetences] = useState({
    isLoading: true,
    data: undefined as CompetenceWithQuestions[] | undefined,
  });
  const isTablet = Tablet();

  useEffect(() => {
    (async () => {
      const db = await getWatermelon();
      const competences = await db.collections
        .get<Competence>('competence')
        .query()
        .fetch();

      const updatedCompetences: CompetenceWithQuestions[] = await Promise.all(
        competences.map(
          async competence =>
            ({
              ...competence._raw,
              questions: (
                await competence.questions.fetch()
              ).map(({_raw}) => _raw),
            } as any),
        ),
      );

      setCompetences({
        isLoading: false,
        data: updatedCompetences,
      });
    })();
  }, []);

  const competencyFormatted = useMemo(
    () =>
      (competences?.data || []).reduce((acc, item) => {
        let questionsMax = 0;

        const questions = item.questions.map(question => {
          const value = parseInt(
            answers.find(answer => answer.question_id === question.id)?.value ||
              '0',
          );
          questionsMax += value;
          return {
            ...question,
            value,
          };
        }) as Array<Question & {value: number}>;

        const competence = {
          ...item,
          questions: questions,
          overall_rating: Math.round(questionsMax / item.questions.length) - 1,
        };

        return [...acc, competence];
      }, [] as Array<CompetenceWithQuestions & {overall_rating: number}>),
    [competences.data],
  );

  return (
    <VStack
      flex={1}
      py={6}
      px={isTablet ? '64px' : 4}
      safeAreaBottom
      bg={'gray.0'}>
      {competences.isLoading || competencyFormatted.length < 1 ? (
        <Center flex={1}>
          <Spinner size={'lg'} />
        </Center>
      ) : (
        <VStack flex={1}>
          <CompetenceView competences={competencyFormatted} />
        </VStack>
      )}
    </VStack>
  );
};

export default ObservationViewScreen;
