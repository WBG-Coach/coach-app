export type Coach = {
  id: string;
  name?: string;
  surname?: string;
  image_id?: string;

  sessionCount?: number;

  _status?: string;
  created_at: Date;
  updated_at: Date;
};
