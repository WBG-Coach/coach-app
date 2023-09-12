import {School} from './school';

export type Coach = {
  id: string;

  name?: string;
  surname?: string;
  image_id?: string;

  nin?: string;
  pin?: string;

  sessionCount?: number;
  schools?: School[];
  _status?: string;
  created_at: Date;
  updated_at: Date;
};
