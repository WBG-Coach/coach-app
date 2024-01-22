import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {getDBConnection} from '../../../services/database.service';

export const runMigrationV10 = async () => {
  const db = await getDBConnection();
  await updateEmailField(db);
  await updatePhoneField(db);
};

const updateEmailField = async (db: SQLiteDatabase) => {
  return db.executeSql(`
    ALTER TABLE coach ADD email TEXT null;
  `);
};

const updatePhoneField = async (db: SQLiteDatabase) => {
  return db.executeSql(`
    ALTER TABLE coach ADD phone TEXT null;
  `);
};
