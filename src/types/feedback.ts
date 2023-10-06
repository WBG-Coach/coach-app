import {Answer} from './answer';
import {Image} from './image';

export type Feedback = {
  id: string;

  value: string;
  answer_id: string;

  answer?: Answer;
  images?: Image[];

  _status?: string;
  created_at: Date;
  updated_at: Date;
};
