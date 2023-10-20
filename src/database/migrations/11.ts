import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {getDBConnection} from '../../services/database.service';

export const runMigrationV11 = async () => {
  const db = await getDBConnection();
  await updateSessionTable(db);
};

const updateSessionTable = async (db: SQLiteDatabase) => {
  db.executeSql(`
    UPDATE question
    SET title = 'The students are not working', description = 'In the 1st part of the class'
    WHERE id = 'a235ad6f-382b-4865-94f7-ac5e53736ec6'
  `);

  db.executeSql(`
    UPDATE question
    SET title = 'The students are not working', description = 'In the 2nd part of the class'
    WHERE id = 'cf1c6bc7-d5ed-4de8-9fb3-fb3c20cca23e'
  `);

  db.executeSql(`
    UPDATE question
    SET title = 'The students are not working', description = 'In the 3rd part of the class'
    WHERE id = '9b2391ed-9643-4d8c-a360-58251ea4f0e6'
  `);
};
