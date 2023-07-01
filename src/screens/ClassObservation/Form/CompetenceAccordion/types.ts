import {Competence} from '../../../../types/competence';

export type Props = {
  index?: number;
  competence: Competence;
  initialAnswers?: {[key: string]: number};

  onComplete: (answers: {[key: string]: number}) => void;
};
