import {TLC} from '../types/tlc';
import {getDBConnection} from './database.service';
import {v4 as uuid} from 'uuid';

export const TLCService = {
  create: async (tlc: Partial<TLC>): Promise<TLC> => {
    const db = await getDBConnection();
    const id = uuid();
    await db.executeSql(`
      INSERT OR REPLACE INTO TLC_evaluation(id, unit_id, coach_id, evaluation, _status)
      VALUES ('${id}', '${tlc.unit_id}', '${tlc.coach_id}', '${tlc.evaluation}', 'pending')
    `);

    return (
      (await db.executeSql(
        'SELECT c.* FROM TLC_evaluation as c WHERE c.id = ?',
        [id],
      )) as any[]
    )[0].rows.raw()[0];
  },
};
