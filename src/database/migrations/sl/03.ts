import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {getDBConnection} from '../../../services/database.service';

export const runMigrationV3 = async () => {
  const db = await getDBConnection();
  await updateSchool(db);
};

const updateSchool = (db: SQLiteDatabase) => {
  db.executeSql(`
    ALTER TABLE school
    ADD emis_number TEXT null
  `);
};
