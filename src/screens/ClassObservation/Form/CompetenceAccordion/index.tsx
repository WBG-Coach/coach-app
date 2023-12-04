import React, {useCallback, useEffect, useState} from 'react';
import {Question} from '../../../../types/question';
import QuestionItem from './QuestionItem';
import {VStack} from 'native-base';
import {Props} from './types';
import Accordion from '../../../../components/Accordion';
import {useTranslation} from 'react-i18next';

const CompetenceAccordion: React.FC<Props> = ({
  onComplete,
  index,
  competence,
  initialAnswers,
}) => {
  const {t} = useTranslation();
  const [isOpen, setIsOpen] = useState(true);
  const [isFinished, setIsFinished] = useState(initialAnswers ? true : false);
  const [answers, setAnswers] = useState<{[key: string]: number}>(
    initialAnswers
      ? competence.questions.reduce(
          (acc, question) => ({
            ...acc,
            [question.id]: initialAnswers[question.id],
          }),
          {},
        )
      : {},
  );

  useEffect(() => {
    if (Object.keys(answers).length === competence.questions.length) {
      setIsFinished(true);
      onComplete(answers);
      setIsOpen(isFinished);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers]);

  const handleAnswerQuestion = (question: Question, value: number) => {
    setAnswers(state =>
      state[question.id] !== value
        ? {...state, ...{[question.id]: value}}
        : state,
    );
  };

  const renderQuestion = useCallback(
    (question: Question) => (
      <QuestionItem
        key={question.id}
        question={question}
        initialValue={initialAnswers && initialAnswers[question.id]}
        onAnswer={handleAnswerQuestion}
      />
    ),
    [initialAnswers],
  );

  return (
    <Accordion
      isOpen={isOpen}
      check={isFinished}
      title={`${(index || 0) + 1}. ${t('Time on learning')}`}
      onClickHeader={() => isFinished && setIsOpen(!isOpen)}>
      <VStack>{competence.questions.map(renderQuestion)}</VStack>
    </Accordion>
  );
};

export default CompetenceAccordion;
