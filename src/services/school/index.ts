import {Q} from '@nozbe/watermelondb';
import {getWatermelon} from '../../database';
import School from '../../database/models/School';

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

    return await query.fetch();
  },
};

export default SchoolService;
