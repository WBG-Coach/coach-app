import {School} from '../types/school';
import {getDBConnection} from './database.service';

export const SchoolService = {
  findSchoolItems: async (
    value: string,
    pageSize: number,
    pageNumber: number,
  ): Promise<School[]> => {
    const db = await getDBConnection();
    let result;
    if (!!value) {
      result = (await db.executeSql(
        "SELECT s.*, (SELECT COUNT(*) FROM teacher where school_id = s.id) as teachersCount FROM school as s WHERE s.name LIKE UPPER(?) || '%' LIMIT ? OFFSET ?",
        [value, pageSize, (pageNumber - 1) * pageSize],
      )) as any[];
    } else {
      result = (await db.executeSql(
        'SELECT s.*, (SELECT COUNT(*) FROM teacher where school_id = s.id) as teachersCount FROM school as s LIMIT ? OFFSET ?',
        [pageSize, (pageNumber - 1) * pageSize],
      )) as any[];
    }

    return result[0].rows.raw();
  },
};
