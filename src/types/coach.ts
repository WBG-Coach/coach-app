import {CoachSchool} from './coach_school';
import {Session} from './session';

export type Coach = {
  id: string;

  name?: string;
  surname?: string;
  nin?: string;
  pin?: string;
  birthdate?: Date;
  phone?: string;
  email?: string;

  image_id?: string;

  sessions?: Session[];
  coachSchools?: CoachSchool[];

  _status?: string;
  created_at: Date;
  updated_at: Date;

  sessionCount?: number;
};
