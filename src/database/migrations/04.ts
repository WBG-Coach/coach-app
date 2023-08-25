import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {getDBConnection} from '../../services/database.service';

export const runMigrationV4 = async () => {
  const db = await getDBConnection();
  await updateSchool(db);
  await updateCoach(db);
  await updateAnswer(db);
  await updateFeedback(db);
};

const updateSchool = (db: SQLiteDatabase) => {
  return db.executeSql(`
    ALTER TABLE school
    ADD region TEXT null
  `);
};

const updateCoach = async (db: SQLiteDatabase) => {
  await db.executeSql(`ALTER TABLE coach DROP COLUMN username`);
  await db.executeSql(`ALTER TABLE coach DROP COLUMN password`);
  await db.executeSql(`ALTER TABLE coach ADD school_id TEXT null`);
};

const updateAnswer = (db: SQLiteDatabase) => {
  return db.executeSql(`
    ALTER TABLE answer
    ADD school_id TEXT null
  `);
};

const updateFeedback = (db: SQLiteDatabase) => {
  return db.executeSql(`
    ALTER TABLE feedback
    ADD school_id TEXT null
  `);
};
