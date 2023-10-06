import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {getDBConnection} from '../../services/database.service';

export const runMigrationV8 = async () => {
  const db = await getDBConnection();
  await updateFeedbackTable(db);
};

const updateFeedbackTable = async (db: SQLiteDatabase) => {
  await db.executeSql(`
    DROP TABLE feedback
  `);

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS feedback (
      id TEXT PRIMARY KEY,
      _status TEXT,

      value INTEGER null,
      
      answer_id TEXT REFERENCES answer(id),
      
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
};
