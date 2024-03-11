import axios from 'axios';
import {API_URL} from '@env';
import {Coach} from '../types/coach';
import {School} from '../types/school';
import {v4 as uuid} from 'uuid';
import {getDBConnection} from './database.service';
import {CoachSchool} from '../types/coach_school';
import {Competence} from '../types/competence';
import {Question} from '../types/question';

export const CoachService = {
  getById: async (id: string): Promise<Coach> => {
    const db = await getDBConnection();
    const result = (await db.executeSql(
      `
        SELECT
          c.*
        FROM coach as c
        WHERE c.id = ?
      `,
      [id],
    )) as any[];

    return result[0].rows.raw()[0];
  },

  findCoachItems: async (
    currentSchool: School,
    value: string,
  ): Promise<Coach[]> => {
    const db = await getDBConnection();
    let result;

    if (value) {
      result = (await db.executeSql(
        `
        SELECT  c.*, (SELECT COUNT(*) FROM session where coach_id = c.id) AS sessionCount 
          FROM  coach AS c 
    INNER JOIN  coach_school AS cs ON cs.coach_id = c.id
         WHERE  cs.school_id = ?
           AND  c.name LIKE UPPER(?) || '%'
        `,
        [currentSchool.id, value],
      )) as any[];
    } else {
      result = (await db.executeSql(
        `
        SELECT  c.*, (SELECT COUNT(*) FROM session where coach_id = c.id) AS sessionCount 
          FROM  coach AS c 
    INNER JOIN  coach_school AS cs ON cs.coach_id = c.id
         WHERE  cs.school_id = ?
        `,
        [currentSchool.id],
      )) as any[];
    }

    return result[0].rows.raw();
  },

  signup: async (coach: Partial<Coach>): Promise<Coach> => {
    const response = await axios.post<Coach>(`${API_URL}/coach/signup`, coach);

    return response.data;
  },

  sendEmailOTP: async (email: string) => {
    return await axios.post(`${API_URL}/auth/otp`, {
      email,
    });
  },

  verifyOTP: async (email: string, code: string) => {
    return await axios.post<{
      coach: Coach;
      competencies: Competence[];
      questions: Question[];
    }>(`${API_URL}/auth/otp/verify`, {
      email,
      code,
    });
  },

  createNewLocalCoach: async (newCoach: Partial<Coach>): Promise<Coach> => {
    const id = uuid();
    await CoachService.insertOrUpdateCoach({...newCoach, id});
    return CoachService.getById(id);
  },

  insertOrUpdateCoach: async ({
    id,
    nin,
    pin,
    name,
    email,
    phone,
    surname,
    birthdate,
    image_id,
  }: Partial<Coach>): Promise<void> => {
    const db = await getDBConnection();
    await db.executeSql(
      `
      INSERT OR REPLACE INTO coach(id, nin, pin, name, email, phone, surname, birthdate, image_id, _status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'synced')
    `,
      [id, nin, pin, name, email, phone, surname, birthdate, image_id],
    );
  },

  insertOrUpdateCoachSchool: async ({
    coach,
    school,
  }: CoachSchool): Promise<void> => {
    if (coach && school) {
      await CoachService.assignCoachToSchool(coach, school);
    }
  },

  assignCoachToSchool: async (coach: Coach, school: School): Promise<void> => {
    const db = await getDBConnection();

    const result = (await db.executeSql(
      `
        SELECT id
        FROM coach_school as s
        WHERE
        coach_id = ? AND school_id = ?
      `,
      [coach.id, school.id],
    )) as any[];

    if (!result[0] || result[0].rows?.raw().length === 0) {
      db.executeSql(`
      INSERT OR REPLACE INTO coach_school(id, coach_id, school_id, _status)
      VALUES ('${uuid()}', '${coach.id}', '${school.id}', 'pending')
    `);
    }
  },
};
