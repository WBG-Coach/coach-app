import {Coach} from '../types/coach';
import {getDBConnection} from './database.service';
import {v4 as uuid} from 'uuid';

export const CoachService = {
  login: async (
    username: string,
    password: string,
  ): Promise<Coach | undefined> => {
    const db = await getDBConnection();
    const result = (await db.executeSql(
      `SELECT * FROM coach WHERE username = '${username?.toLocaleLowerCase()}' AND password = '${password?.toLocaleLowerCase()}'`,
    )) as any[];

    return result[0].rows.raw()[0];
  },
  create: async (coach: Partial<Coach>): Promise<void> => {
    const db = await getDBConnection();
    await db.executeSql(`
      INSERT OR REPLACE INTO coach(id, name, surname, username, password, image_id, _status)
      VALUES ('${uuid()}', '${coach.name}', '${
      coach.surname
    }', '${coach.username?.toLocaleLowerCase()}', '${coach.password?.toLocaleLowerCase()}', '${
      coach.image_id
    }', 'pending')
    `);
  },
};
