import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {getDBConnection} from '../../../services/database.service';

export const runMigrationV9 = async () => {
  const db = await getDBConnection();
  await createCOPTable(db);
};

const createCOPTable = (db: SQLiteDatabase) => {
  return db.executeSql(
    `
    CREATE TABLE IF NOT EXISTS COP (
      id TEXT PRIMARY KEY,
      _status TEXT,
      type TEXT null,
      value TEXT null,
      coach_id TEXT null,
      school_id TEXT null,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `,
  );
};
