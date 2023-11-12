import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {getDBConnection} from '../../services/database.service';

export const runMigrationV5 = async () => {
  const db = await getDBConnection();
  await clearDatabase(db);
  await createCoacherTable(db);
  await createSchoolTable(db);
  await createCoacherSchoolTable(db);
  await createTeacherTable(db);
  await createSessionTable(db);
  await createAnswerTable(db);
  await createFeedbackTable(db);
};

const clearDatabase = async (db: SQLiteDatabase) => {
  await db.executeSql(`
    DROP TABLE answer
  `);
  await db.executeSql(`
    DROP TABLE session
  `);
  await db.executeSql(`
    DROP TABLE feedback
  `);
  await db.executeSql(`
    DROP TABLE teacher
  `);
  await db.executeSql(`
    DROP TABLE coach
  `);
  await db.executeSql(`
    DROP TABLE school
  `);
};

const createCoacherTable = (db: SQLiteDatabase) => {
  return db.executeSql(
    `
    CREATE TABLE IF NOT EXISTS coach (
      id TEXT PRIMARY KEY,
      _status TEXT,

      nin TEXT null,
      pin TEXT null,
      name TEXT null,
      surname TEXT null,
      image_id TEXT REFERENCES image(id),

      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `,
  );
};

const createSchoolTable = (db: SQLiteDatabase) => {
  return db.executeSql(
    `
    CREATE TABLE IF NOT EXISTS school (
      id TEXT PRIMARY KEY,
      _status TEXT,

      key TEXT null,
      name TEXT null,
      emis_number TEXT null,

      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `,
  );
};

const createCoacherSchoolTable = (db: SQLiteDatabase) => {
  return db.executeSql(
    `
    CREATE TABLE IF NOT EXISTS coach_school (
      id TEXT PRIMARY KEY,
      _status TEXT,

      coach_id TEXT REFERENCES coach(id),
      school_id TEXT REFERENCES school(id),

      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `,
  );
};

const createTeacherTable = (db: SQLiteDatabase) => {
  return db.executeSql(
    `
    CREATE TABLE IF NOT EXISTS teacher (
      id TEXT PRIMARY KEY,
      _status TEXT,

      nin TEXT null,
      pin TEXT null,
      name TEXT null,
      surname TEXT null,
      subject TEXT null,
      birthdate TEXT null,
      emis_number TEXT null,
      image_id TEXT REFERENCES image(id),
      school_id TEXT REFERENCES school(id),

      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `,
  );
};

const createSessionTable = (db: SQLiteDatabase) => {
  return db.executeSql(
    `
    CREATE TABLE session (
      id TEXT PRIMARY KEY,
      _status TEXT,

      subject TEXT null,
      objective TEXT null,
      key_points TEXT null,
      lesson_time TEXT null,
      latitude INTEGER null,
      longitude INTEGER null,
      students_count TEXT null,
      coach_id TEXT REFERENCES coach(id),
      school_id TEXT REFERENCES school(id),
      teacher_id TEXT REFERENCES teacher(id),

      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `,
  );
};

const createAnswerTable = (db: SQLiteDatabase) => {
  return db.executeSql(
    `
    CREATE TABLE IF NOT EXISTS answer (
      id TEXT PRIMARY KEY,
      _status TEXT,

      value INTEGER null,
      session_id TEXT REFERENCES session(id),
      question_id TEXT REFERENCES question(id),
      
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `,
  );
};

const createFeedbackTable = (db: SQLiteDatabase) => {
  return db.executeSql(
    `
    CREATE TABLE IF NOT EXISTS feedback (
      id TEXT PRIMARY KEY,
      _status TEXT,

      value INTEGER null,
      session_id TEXT REFERENCES session(id),
      competence_id TEXT REFERENCES competence(id),
      
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `,
  );
};
