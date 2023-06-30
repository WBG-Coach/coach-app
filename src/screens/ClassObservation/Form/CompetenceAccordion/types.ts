import {Competence} from '../../../../types/competence';

export type Props = {
  index?: number;
  competence: Competence;

  onComplete: (answers: {[key: string]: number}) => void;
};
