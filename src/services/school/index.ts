import School from '../../database/models/School';
import {getWatermelon} from '../../database';
import {Q} from '@nozbe/watermelondb';

const SchoolService = {
  findSchools: async (filter = '', take = 20, page = 1): Promise<School[]> => {
    const db = await getWatermelon();
    const query = db.collections
      .get<School>('school')
      .query(
        Q.take(take),
        Q.skip((page - 1) * take),
        Q.where('name', Q.like(`%${filter}%`)),
      );

    return Promise.all(
      (await query.fetch()).map(
        async item =>
          ({
            ...(item._raw as any),
            teachersCount: await item.teachers.fetchCount(),
          } as School),
      ),
    );
  },
};

export default SchoolService;
