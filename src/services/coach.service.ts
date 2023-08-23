import {Coach} from '../types/coach';
import {getDBConnection} from './database.service';
import {v4 as uuid} from 'uuid';

export const CoachService = {
  findCoachItems: async (
    value: string,
    pageSize: number,
    pageNumber: number,
  ): Promise<Coach[]> => {
    const db = await getDBConnection();
    let result;

    if (value) {
      result = (await db.executeSql(
        "SELECT c.*, (SELECT COUNT(*) FROM session where coach_id = c.id) as sessionCount FROM coach as c WHERE c.name LIKE UPPER(?) || '%' LIMIT ? OFFSET ?",
        [value, pageSize, (pageNumber - 1) * pageSize],
      )) as any[];
    } else {
      result = (await db.executeSql(
        'SELECT c.*, (SELECT COUNT(*) FROM session where coach_id = c.id) as sessionCount FROM coach as c LIMIT ? OFFSET ?',
        [pageSize, (pageNumber - 1) * pageSize],
      )) as any[];
    }

    return result[0].rows.raw();
  },

  sync: async (coaches: Coach[]): Promise<void> => {
    const db = await getDBConnection();
    await Promise.all(
      coaches.map(coach => {
        return db.executeSql(`
          INSERT OR REPLACE INTO coach(id, name, surname, image_id, _status)
          VALUES ('${coach.id}', '${coach.name}', '${coach.surname}', '${coach.image_id}', 'synced')
        `);
      }),
    );
  },

  create: async (coach: Partial<Coach>): Promise<Coach> => {
    const db = await getDBConnection();
    const id = uuid();
    await db.executeSql(`
      INSERT OR REPLACE INTO coach(id, name, surname, image_id, _status)
      VALUES ('${id}', '${coach.name}', '${coach.surname}', '${coach.image_id}', 'pending')
    `);

    return (
      (await db.executeSql('SELECT c.* FROM coach as c WHERE c.id = ?', [
        id,
      ])) as any[]
    )[0].rows.raw()[0];
  },
};
