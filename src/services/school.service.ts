import {School} from '../types/school';
import {Session} from '../types/session';
import {getDBConnection} from './database.service';

export const SchoolService = {
  findSchoolItems: async (value: string): Promise<School[]> => {
    const db = await getDBConnection();
    let result;
    if (value) {
      result = (await db.executeSql(
        "SELECT s.*, (SELECT COUNT(*) FROM teacher where school_id = s.id) as teachersCount FROM school as s WHERE s.name LIKE UPPER(?) || '%' OR s.emis_number = ?",
        [value, value],
      )) as any[];
    } else {
      result = (await db.executeSql(
        'SELECT s.*, (SELECT COUNT(*) FROM teacher where school_id = s.id) as teachersCount FROM school as s',
      )) as any[];
    }

    return result[0].rows.raw();
  },

  findSessionFromSchool: async (
    school_id: string,
    pageSize: number,
    pageNumber: number,
  ): Promise<Session[]> => {
    const db = await getDBConnection();
    const result = (await db.executeSql(
      `
        SELECT s.*
          FROM session as s
         WHERE s.school_id = ?
         LIMIT ?
        OFFSET ?
      `,
      [school_id, pageSize, (pageNumber - 1) * pageSize],
    )) as any[];

    return result[0].rows.raw();
  },

  insertSchool: async ({id, name, emis_number, key}: School) => {
    const db = await getDBConnection();
    const result = (await db.executeSql(
      `
        SELECT id
        FROM school as s
        WHERE
          id = ?
      `,
      [id],
    )) as any[];

    if (!result[0] || result[0].rows?.raw().length === 0) {
      await db.executeSql(
        `
        INSERT INTO school(id, name, emis_number, key, _status)
        VALUES (?, ?, ?, ?, 'synced')
        `,
        [id, name, emis_number, key],
      );
    }
  },
};
