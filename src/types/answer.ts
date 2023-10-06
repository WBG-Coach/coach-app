import {Feedback} from './feedback';
import {Question} from './question';

export type Answer = {
  id: string;

  value: string;
  question_id: string;
  session_id: string;

  question?: Question;
  feedback?: Feedback[];

  _status?: string;
  created_at: Date;
  updated_at: Date;
};
