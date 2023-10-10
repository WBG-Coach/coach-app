import {Answer} from './answer';
import {Question} from './question';

export type Competence = {
  id: string;
  title: string;
  questions: Question[];
};

export type CompetenceAnalytics = {
  id: string;
  title: string;
  questionsScale: number;
  sumAnswers: number;
  totalQuestions: number;
};

export type CompetenceAnswers = {
  id: string;
  title: string;
  answers: Answer[];
};
