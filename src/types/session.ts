import {Answer} from './answer';
import {Feedback} from './feedback';

export type Session = {
  id: string;
  _status?: string;

  subject: string;
  objective: string;
  key_points: string;
  lesson_time: string;
  latitude?: number;
  longitude?: number;
  students_count: string;
  coach_id: string;
  school_id: string;
  teacher_id: string;
  feedback_id: string;

  feedback?: Feedback;
  answers?: Answer[];

  created_at: Date;
  updated_at: Date;
};
