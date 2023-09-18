export type School = {
  id?: string;
  _status: string;

  name: string;
  emis_number: string;

  schoolKey?: string;
  created_at: Date;
  updated_at: Date;
  teachersCount: number;
};
