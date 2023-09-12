import {Coach} from '../types/coach';
import {CoachSchool} from '../types/coach_school';
import {School} from '../types/school';
import {getDBConnection} from './database.service';
import {v4 as uuid} from 'uuid';

export const CoachService = {
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

  sync: async (coaches: Coach[]): Promise<void> => {
    const db = await getDBConnection();
    await Promise.all(
      coaches?.map(coach => {
        return db.executeSql(`
          INSERT OR REPLACE INTO coach(id, name, surname, image_id, _status)
          VALUES ('${coach.id}', '${coach.name}', '${coach.surname}', '${coach.image_id}', 'synced')
        `);
      }),
    );
  },

  syncCoachSchools: async (coachSchools: CoachSchool[]): Promise<void> => {
    const db = await getDBConnection();
    await Promise.all(
      coachSchools?.map(coachSchool => {
        return db.executeSql(`
          INSERT OR REPLACE INTO coach_school(id, coach_id, school_id, _status)
          VALUES ('${coachSchool.id}', '${coachSchool.coach_id}', '${coachSchool.school_id}', 'synced')
        `);
      }),
    );
  },

  create: async (
    currentSchool: School,
    coach: Partial<Coach>,
  ): Promise<Coach> => {
    const db = await getDBConnection();
    const coachId = uuid();
    await db.executeSql(`
      INSERT OR REPLACE INTO coach(id, name, surname, nin, pin, image_id, _status)
      VALUES ('${coachId}', '${coach.name}', '${coach.surname}', '${coach.nin}', '${coach.pin}', '${coach.image_id}','pending')
    `);

    await db.executeSql(`
      INSERT OR REPLACE INTO coach_school(id, school_id, coach_id, _status)
      VALUES ('${uuid()}', '${currentSchool.id}', '${coachId}', 'pending')
    `);

    return (
      (await db.executeSql('SELECT c.* FROM coach as c WHERE c.id = ?', [
        coachId,
      ])) as any[]
    )[0].rows.raw()[0];
  },
};
