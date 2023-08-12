import {School} from '../types/school';
import {Session} from '../types/session';
import {getDBConnection} from './database.service';

export const SchoolService = {
  findSchoolItems: async (
    value: string,
    pageSize: number,
    pageNumber: number,
  ): Promise<School[]> => {
    const db = await getDBConnection();
    let result;
    if (value) {
      result = (await db.executeSql(
        "SELECT s.*, (SELECT COUNT(*) FROM teacher where school_id = s.id) as teachersCount FROM school as s WHERE s.name LIKE UPPER(?) || '%' OR s.emis_number = ? LIMIT ? OFFSET ?",
        [value, value, pageSize, (pageNumber - 1) * pageSize],
      )) as any[];
    } else {
      result = (await db.executeSql(
        'SELECT s.*, (SELECT COUNT(*) FROM teacher where school_id = s.id) as teachersCount FROM school as s LIMIT ? OFFSET ?',
        [pageSize, (pageNumber - 1) * pageSize],
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
        SELECT
          s.*,
          f.id as feedback_id
        FROM session as s
        LEFT JOIN feedback f ON f.session_id = s.id
        WHERE
          s.school_id = ?
        LIMIT ?
        OFFSET ?
      `,
      [school_id, pageSize, (pageNumber - 1) * pageSize],
    )) as any[];

    return result[0].rows.raw();
  },
};
