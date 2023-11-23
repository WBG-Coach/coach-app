import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {getDBConnection} from '../../../services/database.service';

export const runMigrationV2 = async () => {
  const db = await getDBConnection();
  await updateCompetence(db);
  await updateQuestions(db);
};

const updateCompetence = (db: SQLiteDatabase) => {
  db.executeSql(`
    UPDATE competence
    SET title = 'Critical thinking'
    WHERE id = '968d595a-d033-4b6c-9758-943cfb6c412c'
  `);
};

const updateQuestions = (db: SQLiteDatabase) => {
  db.executeSql(`
    UPDATE question
    SET title = 'The students are not working', description = 'In the 1st 10 minutes of the class'
    WHERE id = 'a235ad6f-382b-4865-94f7-ac5e53736ec6'
  `);

  db.executeSql(`
    UPDATE question
    SET title = 'The students are not working', description = 'In the 2nd 10 minutes of the class'
    WHERE id = 'cf1c6bc7-d5ed-4de8-9fb3-fb3c20cca23e'
  `);

  db.executeSql(`
    UPDATE question
    SET title = 'The students are not working', description = 'In the 3rd 10 minutes of the class'
    WHERE id = '9b2391ed-9643-4d8c-a360-58251ea4f0e6'
  `);

  db.executeSql(`
    UPDATE question
    SET title = 'The teacher treats all students respectfully'
    WHERE id = 'b635e130-7d71-44a8-905b-134ca55adaef'
  `);

  db.executeSql(`
    UPDATE question
    SET title = 'The teacher uses positive language'
    WHERE id = 'dd3d2cd1-d87e-4f34-b63b-6ffdeebb0170'
  `);

  db.executeSql(`
    UPDATE question
    SET title = 'The teacher responds to students’ needs'
    WHERE id = '830808c5-dc47-462a-8080-c31f953aad02'
  `);

  db.executeSql(`
    UPDATE question
    SET title = 'The teacher does not treat any gender group unfairly in the classroomin the classroom'
    WHERE id = '6779b8e9-da1d-4c3a-8691-53c6233a914d'
  `);

  db.executeSql(`
    UPDATE question
    SET title = 'The teacher sets clear behavioral expectations for classroom activities'
    WHERE id = '97a48f96-cd27-4879-8f41-d2f4ff263785'
  `);

  db.executeSql(`
    UPDATE question
    SET title = 'The teacher clearly states the objectives of the lesson and connects classroom activities to the objectives'
    WHERE id = 'c5e34b76-52d9-467b-aa40-bf1beb05df18'
  `);

  db.executeSql(`
    UPDATE question
    SET title = "The teacher uses questions, or other strategies to ensure students' level of understanding"
    WHERE id = 'b7cd82e2-306e-467d-912e-bafde90febb4'
  `);

  db.executeSql(`
    UPDATE question
    SET title = ' The teacher monitors most students during independent/group workoup work'
    WHERE id = '21ab1281-4d6a-4d9c-850b-5b852fff7c01'
  `);

  db.executeSql(`
    UPDATE question
    SET title = 'The teacher adjusts teaching to the level of students'
    WHERE id = 'cb414e34-1681-46ec-8221-812bd849d3cb'
  `);

  db.executeSql(`
    UPDATE question
    SET title = 'The teacher provides critical thinking tasks'
    WHERE id = '65adb3a6-4fc7-4f1f-8b4c-4c670658127b'
  `);
};
