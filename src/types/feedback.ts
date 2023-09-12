import {Competence} from './competence';
import {Image} from './image';
import {Session} from './session';

export type Feedback = {
  id: string;

  value: string;
  session_id: string;
  competence_id: string;

  session?: Session;
  competence?: Competence;
  images?: Image[];

  _status?: string;
  created_at: Date;
  updated_at: Date;
};
