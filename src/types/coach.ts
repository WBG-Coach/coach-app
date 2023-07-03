export type Coach = {
  id: string;
  name?: string;
  surname?: string;
  image_id?: string;

  username?: string;
  password?: string;

  _status?: string;
  created_at: Date;
  updated_at: Date;
};
