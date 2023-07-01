import {Answer} from '../types/answer';
import {CompetenceAnalytics} from '../types/competence';
import {Feedback} from '../types/feedback';
import {Session} from '../types/session';
import {getDBConnection} from './database.service';
import {v4 as uuid} from 'uuid';

export const SessionService = {
  findSessionFromTeacher: async (
    teacher_id: string,
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
          s.teacher_id = ?
        LIMIT ?
        OFFSET ?
      `,
      [teacher_id, pageSize, (pageNumber - 1) * pageSize],
    )) as any[];

    return result[0].rows.raw();
  },

  create: async (
    session: Partial<Session>,
    answers: Partial<Answer>[],
  ): Promise<string> => {
    const db = await getDBConnection();
    const sessionId = uuid();

    await db.executeSql(
      `
      INSERT INTO session(id, students_count, subject, lesson_time, objective, school_id, coach_id, key_points, teacher_id, latitude, longitude, _status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    `,
      [
        sessionId,
        session.students_count,
        session.subject,
        session.lesson_time,
        session.objective,
        session.school_id,
        session.coach_id,
        session.key_points,
        session.teacher_id,
        session.latitude,
        session.longitude,
      ],
    );

    await Promise.all(
      answers.map(
        async answer =>
          await db.executeSql(
            `
              INSERT INTO answer(id, session_id, question_id, value, _status)
              VALUES (?, ?, ?, ?, 'pending')
            `,
            [uuid(), sessionId, answer.question_id, answer.value],
          ),
      ),
    );

    return sessionId;
  },

  getSessionAnswersGroupedByCompetence: async (
    sessionId: string,
  ): Promise<CompetenceAnalytics[]> => {
    const db = await getDBConnection();
    const result = (await db.executeSql(
      `
        SELECT
          c.*,
          (SELECT q.scale FROM question as q WHERE q.competence_id = c.id LIMIT 1) as questionsScale,
          (SELECT COUNT(*) FROM question as q WHERE q.competence_id = c.id) as totalQuestions,
          (SELECT SUM(a.value) FROM answer as a INNER JOIN question as q ON a.question_id = q.id WHERE q.competence_id = c.id AND a.session_id = ?) as sumAnswers
        FROM competence as c;
      `,
      [sessionId],
    )) as any[];

    console.log(result[0].rows.raw());
    return result[0].rows.raw();
  },

  createFeedback: async ({
    value,
    competence_id,
    session_id,
  }: Partial<Feedback>) => {
    console.log({value, competence_id, session_id});
    const db = await getDBConnection();
    const feedbackId = uuid();

    await db.executeSql(
      `
      INSERT INTO feedback(id, value, competence_id, session_id, _status)
      VALUES (?, ?, ?, ?, 'pending')
    `,
      [feedbackId, value, competence_id, session_id],
    );

    return feedbackId;
  },
};
