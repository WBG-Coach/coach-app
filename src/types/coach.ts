import {School} from './school';

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

  sessionCount?: number;
  schools?: School[];

  _status?: string;
  created_at: Date;
  updated_at: Date;
};
