import {Q} from '@nozbe/watermelondb';
import {getWatermelon} from '../../database';
import User from '../../database/models/User';
import TeacherService from '../teacher';
import Teacher from '../../database/models/Teacher';

const UserService = {
  findUsers: async (filter = '', take = 20, page = 1): Promise<User[]> => {
    const db = await getWatermelon();
    const query = db.collections
      .get<User>('user')
      .query(
        Q.take(take),
        Q.skip((page - 1) * take),
        Q.where('name', Q.like(`%${filter}%`)),
      );

    return (await query.fetch()).map(item => ({...(item._raw as any)} as User));
  },

  findUsersWithTeacherCoachingCount: async (
    filter = '',
    take = 20,
    page = 1,
  ): Promise<User[]> => {
    const db = await getWatermelon();
    const query = db.collections
      .get<User>('user')
      .query(
        Q.take(take),
        Q.skip((page - 1) * take),
        Q.where('name', Q.like(`%${filter}%`)),
      );

    return Promise.all(
      (await query.fetch()).map(async item => {
        return {
          ...(item._raw as any),
          teacherCoachingCount:
            await TeacherService.getTeacherWithSessionByCoachCount(
              item._raw.id,
            ),
        };
      }),
    );
  },
};

export default UserService;
