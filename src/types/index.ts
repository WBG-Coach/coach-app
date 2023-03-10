export interface IUser {
  id: string;
  name: string;
  school?: ISchool;
}

export interface ISchool {
  id: string;
  name: string;
}
