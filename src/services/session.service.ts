import {Answer} from '../types/answer';
import {
  Competence,
  CompetenceAnalytics,
  CompetenceAnswers,
} from '../types/competence';
import {Feedback} from '../types/feedback';
import {Session} from '../types/session';
import {getDBConnection} from './database.service';
import {v4 as uuid} from 'uuid';
import {ImageService} from './image.service';

export const SessionService = {
  findSessionFromTeacher: async (
    teacher_id: string,
    pageSize: number,
    pageNumber: number,
  ): Promise<Session[]> => {
    const db = await getDBConnection();
    const result = (await db.executeSql(
      `
        SELECT s.*
          FROM session as s
         WHERE s.teacher_id = ?
         LIMIT ?
        OFFSET ?
      `,
      [teacher_id, pageSize, (pageNumber - 1) * pageSize],
    )) as any[];

    return result[0].rows.raw();
  },

  sync: async (sessions: Session[]): Promise<void> => {
    const db = await getDBConnection();
    await Promise.all(
      sessions?.map(session => {
        return db.executeSql(
          `
          INSERT OR REPLACE INTO session(id, students_count, subject, lesson_time, objective, school_id, coach_id, key_points, teacher_id, latitude, longitude, _status)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'synced')
        `,
          [
            session.id,
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
      }),
    );
  },

  syncFeedbacks: async (feedbacks: Feedback[]): Promise<void> => {
    const db = await getDBConnection();
    await Promise.all(
      feedbacks?.map(feedback => {
        return db.executeSql(
          `
          INSERT OR REPLACE INTO feedback(id, value, answer_id, _status)
          VALUES (?, ?, ?, 'synced')
        `,
          [feedback.id, feedback.value, feedback.answer_id],
        );
      }),
    );
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

  getAnswersByQuestionAndSession: async (
    questionId: string,
    sessionId: string,
  ): Promise<Answer[]> => {
    const db = await getDBConnection();
    const result = (await db.executeSql(
      `
        SELECT
          a.*
        FROM answer as a
        WHERE
          a.question_id = ?
        AND
          a.session_id = ?
      `,
      [questionId, sessionId],
    )) as any[];

    return result[0].rows.raw();
  },

  getSessionAnswersGroupedByCompetence: async (
    sessionId: string,
  ): Promise<CompetenceAnswers[]> => {
    const db = await getDBConnection();
    const competenciesResult = (await db.executeSql(
      'SELECT c.* FROM competence as c',
    )) as any[];

    const competencies = competenciesResult[0].rows.raw();

    return await Promise.all(
      competencies.map(async (competence: any) => {
        const answersResult = (await db.executeSql(
          `SELECT a.* 
             FROM answer as a 
       INNER JOIN question as q ON q.id = a.question_id
            WHERE a.session_id = ? 
              AND q.competence_id = ?`,
          [sessionId, competence.id],
        )) as any[];

        const answers = answersResult[0].rows.raw();

        return {
          ...competence,
          answers: await Promise.all(
            answers.map(async (answer: Answer) => {
              const questionResult = (await db.executeSql(
                'SELECT q.* FROM question as q WHERE q.id = ?',
                [answer.question_id],
              )) as any[];

              return {...answer, question: questionResult[0].rows.raw()[0]};
            }),
          ),
        };
      }),
    );
  },

  getSessionAnswersCountGroupedByCompetence: async (
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
        FROM competence as c
      `,
      [sessionId],
    )) as any[];

    return result[0].rows.raw();
  },

  createFeedback: async (
    {value, answer_id}: Partial<Feedback>,
    session_id: string,
  ) => {
    const db = await getDBConnection();
    const feedbackId = uuid();

    await db.executeSql(
      `
      INSERT INTO feedback(id, value, answer_id, _status)
      VALUES (?, ?, ?, 'pending')
    `,
      [feedbackId, value, answer_id],
    );

    await db.executeSql(
      `
      UPDATE session
      SET feedback_id = ?, _status = 'pending'
      WHERE id = ?
    `,
      [feedbackId, session_id],
    );

    return feedbackId;
  },

  getFeedbackById: async (
    id: string,
  ): Promise<Feedback & {competence_title: string}> => {
    const db = await getDBConnection();
    const result = (await db.executeSql(
      `
        SELECT
          f.*,
          c.id as competence_id,
          c.title as competence_title
        FROM feedback as f
        INNER JOIN answer as a on a.id = f.answer_id
        INNER JOIN question as q on q.id = a.question_id
        INNER JOIN competence as c on c.id = q.competence_id
        WHERE f.id = ?
      `,
      [id],
    )) as any[];

    const feedback = result[0].rows.raw()[0];

    return {
      ...feedback,
      images: await ImageService.getImagesByExternalId(feedback.id),
    };
  },
};
