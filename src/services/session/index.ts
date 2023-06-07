import {getWatermelon} from '../../database';
import {Q} from '@nozbe/watermelondb';

const SessionService = {
  getSessionByTeacherCount: async (teacher_id: string): Promise<number> => {
    const db = await getWatermelon();

    return db
      .get('session')
      .query(Q.where('teacher_id', Q.eq(teacher_id)))
      .fetchCount();
  },

  getFeedbackByTeacherCount: async (teacher_id: string): Promise<number> => {
    const db = await getWatermelon();
    const result = await db
      .get('feedback')
      .query(
        Q.unsafeSqlQuery(`
          select feedback.id
          from feedback
          inner join session on feedback.session_id = session.id
          where session.teacher_id = '${teacher_id}'
        `),
      )
      .unsafeFetchRaw();

    return result.length;
  },
};

export default SessionService;
