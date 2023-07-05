import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {getDBConnection} from '../../services/database.service';

export const runMigrationV0 = async () => {
  const db = await getDBConnection();

  await createImageTable(db);

  await createSchoolTable(db);
  await createCoacherTable(db);
  await createTeacherTable(db);

  await createSessionTable(db);

  await createCompetenceTable(db);
  await createQuestionTable(db);
  await createAnswerTable(db);
  await createFeedbackTable(db);
};

const createImageTable = (db: SQLiteDatabase) => {
  return db.executeSql(
    `
    CREATE TABLE IF NOT EXISTS image (
      id TEXT PRIMARY KEY,
      _status TEXT,
      name TEXT null,
      value TEXT null,
      external_id TEXT null,
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
      name TEXT,
      _status TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `,
  );
};

const createCoacherTable = (db: SQLiteDatabase) => {
  return db.executeSql(
    `
    CREATE TABLE IF NOT EXISTS coach (
      id TEXT PRIMARY KEY,
      _status TEXT,
      username TEXT,
      password TEXT,
      name TEXT null,
      surname TEXT null,
      birthday TIMESTAMP null,
      image_id TEXT REFERENCES image(id),
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
      session_status TEXT null,
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

const createCompetenceTable = (db: SQLiteDatabase) => {
  return db.executeSql(
    `
    CREATE TABLE IF NOT EXISTS competence (
      id TEXT PRIMARY KEY,
      name TEXT,
      _status TEXT,
      title TEXT null,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `,
  );
};

const createQuestionTable = (db: SQLiteDatabase) => {
  return db.executeSql(
    `
    CREATE TABLE IF NOT EXISTS question (
      id TEXT PRIMARY KEY,
      _status TEXT,
      type TEXT null,
      title TEXT null,
      scale INTEGER null,
      description TEXT null,
      tooltip_data TEXT null,
      competence_id TEXT null,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
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
