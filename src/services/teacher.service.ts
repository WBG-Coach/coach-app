import {
  Teacher,
  TeacherDetailsType,
  TeacherItemType,
  TeacherToEditType,
} from '../types/teacher';
import {getDBConnection} from './database.service';
import {v4 as uuid} from 'uuid';

export const TeacherService = {
  findTeachersItemBySchoolId: async (
    filter: string,
    school_id: string,
    pageSize: number,
    pageNumber: number,
  ): Promise<TeacherItemType[]> => {
    const db = await getDBConnection();
    const result = (await db.executeSql(
      `
        SELECT
          t.id as id,
          t.name as name,
          i.value as image,
          s.created_at AS last_session_date,
          (SELECT COUNT(*) FROM session as s WHERE s.teacher_id = t.id) as sessionsCount,
          (SELECT COUNT(*) FROM session as s INNER JOIN feedback as f on f.session_id = s.id WHERE s.teacher_id = t.id) as feedbacksCount
        FROM teacher as t
        LEFT JOIN image as i ON i.id = t.image_id
        LEFT JOIN (
          SELECT teacher_id, MAX(created_at) AS created_at
          FROM session
          GROUP BY teacher_id
        ) as s ON t.id = s.teacher_id
        WHERE
          t.school_id = ?
        AND
          UPPER(t.name) LIKE UPPER(?) || '%'
        LIMIT ?
        OFFSET ?
      `,
      [school_id, filter, pageSize, (pageNumber - 1) * pageSize],
    )) as any[];

    return result[0].rows.raw();
  },

  getTeacherDetails: async (id: string): Promise<TeacherDetailsType> => {
    const db = await getDBConnection();
    const result = (await db.executeSql(
      `
        SELECT 
          t.id as id,
          t.name || ' ' || t.surname as name,
          t.subject as subject,
          i.value as image
        FROM teacher as t 
        LEFT JOIN image as i ON i.id = t.image_id 
        WHERE 
          t.id = ?
      `,
      [id],
    )) as any[];

    return result[0].rows.raw()[0];
  },

  getTeacherToEdit: async (id: string): Promise<TeacherToEditType> => {
    const db = await getDBConnection();
    const result = (await db.executeSql(
      `
        SELECT 
          t.id as id,
          t.name as name,
          t.surname as surname,
          t.subject as subject,
          t.emis_number as emis_number,
          i.id as image_id,
          i.name as image_name,
          i.value as image_value
        FROM teacher as t 
        LEFT JOIN image as i ON i.id = t.image_id 
        WHERE 
          t.id = ?
      `,
      [id],
    )) as any[];

    return result[0].rows.raw()[0];
  },

  create: async (teacher: Partial<Teacher>): Promise<void> => {
    const db = await getDBConnection();
    await db.executeSql(
      `
      INSERT INTO teacher(id, name, surname, emis_number, subject, school_id, image_id, _status)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')
    `,
      [
        uuid(),
        teacher.name,
        teacher.surname,
        teacher.emis_number,
        teacher.subject,
        teacher.school_id,
        teacher.image_id,
      ],
    );
  },

  update: async (id: string, teacher: Partial<Teacher>): Promise<void> => {
    const db = await getDBConnection();
    await db.executeSql(
      `
      UPDATE teacher
      SET name = '${teacher.name}', surname = '${
        teacher.surname
      }', emis_number = '${teacher.emis_number || ''}', subject = '${
        teacher.subject
      }', image_id = '${teacher.image_id}', _status = 'pending'
      WHERE id = '${id}'
    `,
    );
  },
};
