import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {getDBConnection} from '../../../services/database.service';

export const runMigrationV5 = async () => {
  const db = await getDBConnection();
  await createTLCTable(db);
};

const createTLCTable = (db: SQLiteDatabase) => {
  return db.executeSql(`
  CREATE TABLE IF NOT EXISTS TLC_evaluation (
    id TEXT PRIMARY KEY,
    unit_id TEXT null,
    coach_id TEXT REFERENCES coach(id),
    evaluation TEXT null,
    _status TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
  `);
};
