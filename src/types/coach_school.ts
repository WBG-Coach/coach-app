import {Coach} from './coach';
import {School} from './school';

export type CoachSchool = {
  id: string;

  coach_id?: string;
  school_id?: string;

  coach?: Coach;
  school?: School;

  _status?: string;
  created_at: Date;
  updated_at: Date;
};
