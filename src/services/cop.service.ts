import {getDBConnection} from './database.service';
import {v4 as uuid} from 'uuid';

export const COPService = {
  create: async (
    type: string,
    value: string,
    school_id: string,
    coach_id: string,
  ): Promise<string> => {
    const db = await getDBConnection();

    const id = uuid();

    await db.executeSql(`
      INSERT OR REPLACE INTO COP(id, type, value, school_id, coach_id, _status)
      VALUES ('${id}', '${type}', '${value}', '${school_id}', '${coach_id}', 'pending')
    `);

    return id;
  },
};
