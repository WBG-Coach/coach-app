import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {getDBConnection} from '../../services/database.service';

export const runMigrationV7 = async () => {
  const db = await getDBConnection();
  await updateQuestions(db);
};

const updateQuestions = async (db: SQLiteDatabase) => {
  await db.executeSql(`
    UPDATE question
    SET title = 'The teacher does not treat any gender group unfairly in the classroom'
    WHERE id = '6779b8e9-da1d-4c3a-8691-53c6233a914d'
  `);

  await db.executeSql(`
    UPDATE question
    SET title = ' The teacher monitors most students during independent/group work'
    WHERE id = '21ab1281-4d6a-4d9c-850b-5b852fff7c01'
  `);
};
