import {Competence} from '../../../../types/competence';
import {Question} from '../../../../types/question';

export type Props = {
  competence: Competence;
  selectedQuestion?: Question['id'];
  handleSelectQuestion: (question: Question) => void;
};
