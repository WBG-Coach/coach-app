export type Session = {
  id: string;

  subject: string;
  objective: string;
  key_points: string;
  lesson_time: string;
  latitude?: number;
  longitude?: number;
  session_status: string;
  students_count: string;
  coach_id: string;
  school_id: string;
  teacher_id: string;

  _status?: string;
  created_at: Date;
  updated_at: Date;
};

export type SessionItemType = {
  id: string;
  name: string;
  image?: string;
  sessionsCount: number;
  feedbacksCount: number;
  last_session_date?: Date;
};
