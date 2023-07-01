export type Answer = {
  id: string;

  value: string;
  question_id: string;
  session_id: string;

  _status?: string;
  created_at: Date;
  updated_at: Date;
};
