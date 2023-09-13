import {Answer} from './answer';
import {Coach} from './coach';
import {CoachSchool} from './coach_school';
import {Feedback} from './feedback';
import {Question} from './question';
import {School} from './school';
import {Session} from './session';
import {Teacher} from './teacher';

export type SyncData = {
  coaches: Coach[];
  coachSchools: CoachSchool[];
  sessions: Session[];
  questions: Question[];
  schools: School[];
  teachers: Teacher[];
  feedbacks: Feedback[];
  answers: Answer[];

  total: number;
};
