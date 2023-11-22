import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {getDBConnection} from '../../../services/database.service';

export const runMigrationV10 = async () => {
  const db = await getDBConnection();
  await updateSessionTable(db);
};

const updateSessionTable = async (db: SQLiteDatabase) => {
  return db.executeSql(`
    ALTER TABLE session ADD feedback_id TEXT null
  `);
};
