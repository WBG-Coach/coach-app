import React, {useCallback, useEffect, useState} from 'react';
import {Question} from '../../../../types/question';
import QuestionItem from './QuestionItem';
import {VStack} from 'native-base';
import {Props} from './types';
import Accordion from '../../../../components/Accordion';

const CompetenceAccordion: React.FC<Props> = ({
  onComplete,
  competence,
  index,
}) => {
  const [answers, setAnswers] = useState<{[key: string]: number}>({});
  const [isFinished, setIsFinished] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (!isFinished) {
      if (Object.keys(answers).length === competence.questions.length) {
        setIsFinished(true);
        onComplete(answers);
        setIsOpen(false);
      }
    }
  }, [isFinished, answers, competence, onComplete]);

  const handleAnswerQuestion = (question: Question, value: number) => {
    const newValues = {[question.id]: value};
    setAnswers(state => ({...state, ...newValues}));
  };

  const renderQuestion = useCallback(
    (question: Question) => (
      <QuestionItem
        key={question.id}
        question={question}
        onAnswer={handleAnswerQuestion}
      />
    ),
    [],
  );

  return (
    <Accordion
      isOpen={isOpen}
      check={isFinished}
      title={`${(index || 0) + 1}. ${competence.title}`}
      onClickHeader={() => isFinished && setIsOpen(!isOpen)}>
      <VStack>{competence.questions.map(renderQuestion)}</VStack>
    </Accordion>
  );
};

export default CompetenceAccordion;
