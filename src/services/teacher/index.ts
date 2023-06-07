import {Q} from '@nozbe/watermelondb';
import {getWatermelon} from '../../database';
import Teacher from '../../database/models/Teacher';
import {TeachersWithSession} from '../../providers/contexts/UserContext';
import Session from '../../database/models/Session';

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

    return await query.fetch();
  },

  findTeachersWithSessionBySchoolId: async (
    school_id: string,
    take = 20,
    page = 1,
  ): Promise<TeachersWithSession[]> => {
    const teachers = await TeacherService.findTeachersBySchoolId(
      school_id,
      take,
      page,
    );

    return await Promise.all(
      teachers.map(async teacher => {
        const sessions = (await teacher.sessions.fetch()) as Session[];
        const feedbacksLength = (
          await Promise.all(
            sessions.map(async session => ({
              ...session,
              feedbacks: await session.feedback.fetch(),
            })),
          )
        ).reduce((acc, item) => acc + (item.feedbacks as any).length, 0);

        return {
          ...teacher._raw,
          sessions,
          feedbacksLength: feedbacksLength,
          image: (await teacher.image.fetch())?._raw,
        } as any;
      }),
    );
  },

  getTeachersBySchoolCount: async (school_id: string): Promise<number> => {
    const db = await getWatermelon();
    const query = db.collections
      .get<Teacher>('teacher')
      .query(Q.where('school_id', Q.eq(school_id)));

    return await query.fetchCount();
  },

  getTeacherWithSessionByCoachCount: async (
    coach_id: string,
  ): Promise<number> => {
    const db = await getWatermelon();

    const grouped = await db
      .get('session')
      .query(
        Q.unsafeSqlQuery(`
          select session.teacher_id
          from session
          where session.coach_id = '${coach_id}'
          group by session.teacher_id
        `),
      )
      .unsafeFetchRaw();

    console.log({count: grouped});

    return grouped.length;
  },
};

export default TeacherService;
