import {Competence} from '../types/competence';
import {Question} from '../types/question';

const averageConverter = {
  1: 1,
  2: 4,
  3: 5,
};

export const averageAnswersFromCompetences = (competences: Competence[]) => {
  return (
    competences.reduce(
      (sum, competence) => sum + averageAnswersPerCompetence(competence),
      0,
    ) / competences.length
  );
};

export const averageAnswersPerCompetence = (competence: Competence) => {
  return (
    (competence.questions?.reduce((sum, question) => {
      return sum + sumAnswersPerQuestions(question);
    }, 0) || 0) / competence.questions.length
  );
};

export const sumAnswersPerQuestions = (question: Question) => {
  return (
    question.answers?.reduce((sum, answer) => {
      return (
        sum +
        (question.scale === 3
          ? (averageConverter as any)[parseInt(answer.value, 10)]
          : parseInt(answer.value, 10))
      );
    }, 0) || 0
  );
};
