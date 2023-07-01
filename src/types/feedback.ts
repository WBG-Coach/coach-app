export type Feedback = {
  id: string;

  value: string;
  session_id: string;
  competence_id: string;

  _status?: string;
  created_at: Date;
  updated_at: Date;
};
