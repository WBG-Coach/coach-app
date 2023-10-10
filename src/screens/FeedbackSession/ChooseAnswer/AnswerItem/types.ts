import {Answer} from '../../../../types/answer';

export type Props = {
  title: string;
  answers: Answer[];
  selectedAnswer?: Answer['id'];
  handleSelectAnswer: (answer: Answer) => void;
};
