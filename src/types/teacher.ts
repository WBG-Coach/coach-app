export type Teacher = {
  id: string;
  name?: string;
  surname?: string;
  birthdate?: Date;
  image_id?: string;
  subject?: string;
  emis_number?: string;
  school_id?: string;

  _status?: string;
  created_at: Date;
  updated_at: Date;
};

export type TeacherItemType = {
  id: string;
  image?: string;
  name: string;
  last_session_date?: Date;
  sessionsCount: number;
  feedbacksCount: number;
};

export type TeacherDetailsType = {
  id: string;
  name: string;
  subject?: string;
  image?: string;
};

export type TeacherToEditType = {
  id: string;
  name: string;
  surname: string;
  subject?: string;
  emis_number?: string;
  image_id?: string;
  image_name?: string;
  image_value?: string;
};
