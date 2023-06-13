import {VStack} from 'native-base';
import React, {useEffect, useMemo, useState} from 'react';
import Accordion from '../../../../components/Accordion';
import Question from '../../../../database/models/Question';
import QuestionItem from './QuestionItem';
import {Props} from './types';

const CompetenceAccordion: React.FC<Props> = ({
  competence,
  handleAnswer,
  onComplete,
}) => {
  const [answers, setAnswers] = useState<{[key: string]: number}>({});
  const [isFinished, setIsFinished] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (!isFinished) {
      if (Object.keys(answers).length === competence.questions.length) {
        setIsFinished(true);
        setIsOpen(false);
        onComplete();
      }
    }
  }, [isFinished, answers, competence]);

  const handleAnswerQuestion = (question: Question, value: number) => {
    const newValues = {[question.id]: value};
    setAnswers(state => ({...state, ...newValues}));
    handleAnswer(newValues);
  };

  const Form = useMemo(
    () => (
      <VStack>
        {competence.questions.map(question => (
          <QuestionItem
            key={question.id}
            question={question}
            onAnswer={handleAnswerQuestion}
            value={answers[question.id || 0]}
          />
        ))}
      </VStack>
    ),
    [isOpen],
  );

  return (
    <Accordion
      isOpen={isOpen}
      check={isFinished}
      title={competence.title}
      onClickHeader={() => isFinished && setIsOpen(!isOpen)}>
      {Form}
    </Accordion>
  );
};

export default CompetenceAccordion;
