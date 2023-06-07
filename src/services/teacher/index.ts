import {Q} from '@nozbe/watermelondb';
import {getWatermelon} from '../../database';
import Teacher from '../../database/models/Teacher';
import {TeachersWithSession} from '../../providers/contexts/UserContext';
import SessionService from '../session';

const TeacherService = {
  findTeachersBySchoolId: async (
    school_id: string,
    take = 20,
    page = 1,
  ): Promise<Teacher[]> => {
    const db = await getWatermelon();
    const query = db.collections
      .get<Teacher>('teacher')
      .query(
        Q.take(take),
        Q.skip((page - 1) * take),
        Q.where('school_id', Q.eq(school_id)),
      );

    return (await query.fetch()).map(item => ({...(item._raw as any)}));
  },

  findTeachersWithSessionBySchoolId: async (
    school_id: string,
    take = 20,
    page = 1,
  ): Promise<Teacher[]> => {
    const db = await getWatermelon();
    const allTeachers = await db.collections
      .get<Teacher>('teacher')
      .query(
        Q.take(take),
        Q.skip((page - 1) * take),
        Q.where('school_id', Q.eq(school_id)),
      )
      .fetch();

    const teachersUpdated = await Promise.all(
      allTeachers.map(async teacher => {
        return {
          ...teacher._raw,
          sessionsCount: await SessionService.getSessionByTeacherCount(
            teacher._raw.id,
          ),
          feedbacksCount: await SessionService.getFeedbackByTeacherCount(
            teacher._raw.id,
          ),
          image: (await teacher.image.fetch())?._raw,
        } as any;
      }),
    );

    return teachersUpdated;
  },

  getTeachersBySchoolCount: async (school_id: string): Promise<number> => {
    const db = await getWatermelon();
    const query = db.collections
      .get<Teacher>('teacher')
      .query(Q.where('school_id', Q.eq(school_id)));

    return await query.fetchCount();
  },

  getTeacherWithSessionByCoachAndSchoolCount: async (
    coach_id: string,
    school_id: string,
  ): Promise<number> => {
    const db = await getWatermelon();
    const grouped = await db
      .get('session')
      .query(
        Q.unsafeSqlQuery(`
          select session.teacher_id
          from session
          where session.coach_id = '${coach_id}' and session.school_id = '${school_id}'
          group by session.teacher_id
        `),
      )
      .unsafeFetchRaw();

    return grouped.length;
  },
};

export default TeacherService;
