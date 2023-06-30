import {Session} from '../types/session';
import {TeacherItemType} from '../types/teacher';
import {getDBConnection} from './database.service';
import {v4 as uuid} from 'uuid';

export const SessionService = {
  findSessionFromTeacher: async (
    teacher_id: string,
    pageSize: number,
    pageNumber: number,
  ): Promise<TeacherItemType[]> => {
    const db = await getDBConnection();
    const result = (await db.executeSql(
      `
        SELECT
          s.*
        FROM session as s
        WHERE
          s.teacher_id = ?
        LIMIT ?
        OFFSET ?
      `,
      [teacher_id, pageSize, (pageNumber - 1) * pageSize],
    )) as any[];

    return result[0].rows.raw();
  },

  create: async (session: Partial<Session>): Promise<string> => {
    // const db = await getDBConnection();
    const id = uuid();
    console.log(session);
    // await db.executeSql(
    //   `
    //   INSERT INTO teacher(id, name, surname, emis_number, subject, school_id, image_id, _status)
    //   VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')
    // `,
    //   [id],
    // );

    return id;
  },
};
