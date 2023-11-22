import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {getDBConnection} from '../../../services/database.service';

export const runMigrationV7 = async () => {
  const db = await getDBConnection();
  await updateCoach(db);
};

const updateCoach = (db: SQLiteDatabase) => {
  return db.executeSql(`
    ALTER TABLE coach ADD birthdate TEXT null
  `);
};
