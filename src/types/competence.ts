import {Question} from './question';

export type Competence = {
  id: string;
  title: string;
  questions: Question[];
};
