import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {getDBConnection} from '../../../services/database.service';

export const runMigrationV4 = async () => {
  const db = await getDBConnection();
  await updateSchool(db);
};

const updateSchool = (db: SQLiteDatabase) => {
  return db.executeSql(`
    ALTER TABLE school
    ADD region TEXT null
  `);
};
