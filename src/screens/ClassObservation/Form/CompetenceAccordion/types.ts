import Competence from '../../../../database/models/Competence';
import {CompetenceWithQuestions} from '../../../../providers/contexts/CompetencesContext';

export type Props = {
  index?: number;
  competence: CompetenceWithQuestions;
  isFinished?: boolean;

  handleAnswer: (answers: {[key: string]: number}) => void;
  onComplete: () => void;
};
