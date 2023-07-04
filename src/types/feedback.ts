import {Competence} from './competence';
import {Image} from './image';

export type Feedback = {
  id: string;

  value: string;
  session_id: string;
  competence_id: string;

  competence?: Competence;
  images?: Image[];

  _status?: string;
  created_at: Date;
  updated_at: Date;
};
