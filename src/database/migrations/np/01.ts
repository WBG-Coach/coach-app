import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {getDBConnection} from '../../../services/database.service';

export const runMigrationV1 = async () => {
  const db = await getDBConnection();
  await insertCompetencies(db);
  await insertQuestions(db);
};

const insertCompetencies = async (db: SQLiteDatabase) => {
  await db.executeSql(`
    INSERT OR REPLACE INTO competence(id, title, _status)
    VALUES
      ('4d15a3be-db2a-4fef-913a-6535bcd9d389', 'Time on learning', 'synced'),
      ('0f8d1dcb-1d26-4073-a184-80e32012ae1b', 'Positive expectations','synced'),
      ('b9f2de44-2825-4353-a092-e979b7190a28', 'Creating High Expectations and Inclusive Learning Environment', 'synced'),
      ('8860e659-02da-4d99-abe4-135c25f1c26f', 'Effective and Engaging Learning Strategies', 'synced'),
      ('968d595a-d033-4b6c-9758-943cfb6c412c', 'Assessing learning', 'synced')
  `);
};

const insertQuestions = async (db: SQLiteDatabase) => {
  await db.executeSql(`
    INSERT OR REPLACE INTO question(id, title, description, tooltip_data, type, competence_id, scale, _status)
    VALUES
      ('c97cfef5-61e6-4667-b97b-8f4e602674ac', 'Students are engaged on given task', 'In the 1st part of the class', '{"title":"","subtitle":"","items":[]}', 'option', '4d15a3be-db2a-4fef-913a-6535bcd9d389', 3, 'synced'),
      ('a7704226-f4cd-432a-893a-811024b27ad0', 'Students are engaged on given task', 'In the 2nd part of the class', '{"title":"","subtitle":"","items":[]}', 'option', '4d15a3be-db2a-4fef-913a-6535bcd9d389', 3, 'synced'),
      ('80b6a0fe-9a43-4d06-884c-8ade0b46774b', 'Students are engaged on given task', 'In the 3rd part of the class', '{"title":"","subtitle":"","items":[]}', 'option', '4d15a3be-db2a-4fef-913a-6535bcd9d389', 3, 'synced');
  `);

  await db.executeSql(`
    INSERT OR REPLACE INTO question(id, title, description, tooltip_data, type, competence_id, scale, _status)
    VALUES
      ('e668f4cc-e34a-448e-b371-67a6b97c2d3a', 'The teacher acknowledges positive student behaviour.', NULL, '{"title":"","subtitle":"","items":[]}', 'option', '0f8d1dcb-1d26-4073-a184-80e32012ae1b', 5, 'synced'),
      ('2580c928-edc5-4f64-b506-6f47efb8b061', 'The teacher redirects unexpected behaviour and focuses on the expected behaviour.', NULL, '{"title":"","subtitle":"","items":[]}', 'option', '0f8d1dcb-1d26-4073-a184-80e32012ae1b', 5, 'synced');

  `);

  await db.executeSql(`
    INSERT OR REPLACE INTO question(id, title, description, tooltip_data, type, competence_id, scale, _status)
    VALUES
      ('d4e263c1-5943-489b-87ff-255f28b09762', 'The teacher treats all students respectfully.', NULL, '{"title":"","subtitle":"","items":[]}', 'option', 'b9f2de44-2825-4353-a092-e979b7190a28', 5, 'synced'),
      ('5d11e5c4-3d00-45b0-b53f-b306da7f1a1d', 'The teacher responds to students'' needs.', NULL, '{"title":"","subtitle":"","items":[]}', 'option', 'b9f2de44-2825-4353-a092-e979b7190a28', 5, 'synced'),
      ('7a5d1b69-00d4-4b12-8f23-27de65614ebe', 'The teacher acknowledges students'' efforts, rather than focusing only on results, students'' intelligence, or natural abilities.', NULL, '{"title":"","subtitle":"","items":[]}', 'option', 'b9f2de44-2825-4353-a092-e979b7190a28', 5, 'synced'),
      ('b3d29e0d-a7dc-4aa3-96d4-1294ad6b723e', 'Teacher uses additional learning materials effectively', NULL, '{"title":"","subtitle":"","items":[]}', 'option', 'b9f2de44-2825-4353-a092-e979b7190a28', 5, 'synced'),
      ('fb64470b-7a59-4fb9-9396-e67f97343434', 'Teacher Manages the Physical arrangement of the classroom to allow all students to learn', NULL, '{"title":"","subtitle":"","items":[]}', 'option', 'b9f2de44-2825-4353-a092-e979b7190a28', 5, 'synced');
  `);

  await db.executeSql(`
    INSERT OR REPLACE INTO question(id, title, description, tooltip_data, type, competence_id, scale, _status)
    VALUES
      ('b9160bc1-7345-4632-961c-124b7427ee75', 'The teacher explicitly articulates the objectives of the lesson and relates classroom activities to the objectives.', NULL, '{"title":"","subtitle":"","items":[]}', 'option', '8860e659-02da-4d99-abe4-135c25f1c26f', 5, 'synced'),
      ('6f5fcf4f-f462-4faf-b8fd-75066093419a', 'Teacher is teaching using Student-centered activities', NULL, '{"title":"","subtitle":"","items":[]}', 'option', '8860e659-02da-4d99-abe4-135c25f1c26f', 5, 'synced'),
      ('e6cd38a4-d86d-4b39-b263-da32a3f71f5a', 'The teacher makes connections in the lesson that related to other content knowledge or students'' daily lives.', NULL, '{"title":"","subtitle":"","items":[]}', 'option', '8860e659-02da-4d99-abe4-135c25f1c26f', 5, 'synced'),
      ('6f24fafb-7672-4d45-a31f-223e2eae7d6f', 'The teacher uses questions, prompts or other strategies to ensure students'' level of understanding.', NULL, '{"title":"","subtitle":"","items":[]}', 'option', '8860e659-02da-4d99-abe4-135c25f1c26f', 5, 'synced'),
      ('99914c89-5b84-44ef-8ffb-440f28a17a37', 'The teacher asks open-ended questions. (Critical Thinking)', NULL, '{"title":"","subtitle":"","items":[]}', 'option', '8860e659-02da-4d99-abe4-135c25f1c26f', 5, 'synced');
  `);

  await db.executeSql(`
    INSERT OR REPLACE INTO question(id, title, description, tooltip_data, type, competence_id, scale, _status)
    VALUES
      ('b1626e4f-94e4-4384-a811-5c18115bc8ab', 'The teacher monitors most students during independent/group work.', NULL, '{"title":"","subtitle":"","items":[]}', 'option', '968d595a-d033-4b6c-9758-943cfb6c412c', 5, 'synced'),
      ('6eb713cb-2887-47e9-8987-afc833cc27bd', 'The teacher adjusts teaching to the level of the students.', NULL, '{"title":"","subtitle":"","items":[]}', 'option', '968d595a-d033-4b6c-9758-943cfb6c412c', 5, 'synced'),
      ('2856af7b-6855-49b2-b7df-f4e7844182be', 'The teacher provides specific comments or guiding questions to help students clarify misunderstandings ', NULL, '{"title":"","subtitle":"","items":[]}', 'option', '968d595a-d033-4b6c-9758-943cfb6c412c', 5, 'synced');
  `);
};
