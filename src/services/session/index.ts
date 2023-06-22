import {getWatermelon} from '../../database';
import {Q} from '@nozbe/watermelondb';

const SessionService = {
  countPendingSessionsToSync: async () => {
    const db = await getWatermelon();
    const query = db.collections
      .get('session')
      .query(Q.where('_status', Q.notEq('synced')));

    return query.fetchCount();
  },

  countPendingFeedbacksToSync: async () => {
    const db = await getWatermelon();
    const query = db.collections
      .get('feedback')
      .query(Q.where('_status', Q.notEq('synced')));

    return query.fetchCount();
  },

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
