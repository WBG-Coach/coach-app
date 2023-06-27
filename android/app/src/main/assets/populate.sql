  drop table school;
  drop table user;
  drop table image;
  drop table competence;
  drop table question;
  drop table answer;
  drop table local_storage;
  drop table feedback;
  drop table session;
  drop table teacher;

  CREATE TABLE session (
      id TEXT not null,
      _changed TEXT,
      _status TEXT,
      session_status TEXT null,
      students_count TEXT null,
      subject TEXT null,
      lesson_time TEXT null,
      objective TEXT null,
      key_points TEXT null,
      coach_id TEXT null,
      school_id TEXT null,
      teacher_id TEXT null,
      created_at INTEGER DEFAULT (strftime('%s', 'now')),
      updated_at INTEGER DEFAULT (strftime('%s', 'now')),
      latitude INTEGER,
      longitude INTEGER,
      primary key (`id`)
  );

  CREATE TABLE local_storage (
      key TEXT,
      value TEXT
  );

  CREATE TABLE school (
      id TEXT,
      name TEXT,
      _changed TEXT,
      _status TEXT,
      created_at INTEGER DEFAULT (strftime('%s', 'now')),
      updated_at INTEGER DEFAULT (strftime('%s', 'now'))
  );

  CREATE TABLE user (
      id TEXT,
      name TEXT,
      surname TEXT null,
      image_id TEXT,
      _changed TEXT,
      _status TEXT,
      created_at INTEGER DEFAULT (strftime('%s', 'now')),
      updated_at INTEGER DEFAULT (strftime('%s', 'now'))
  );

  CREATE TABLE image (
      id TEXT,
      name TEXT,
      value TEXT,
      external_id TEXT null,
      _changed TEXT,
      _status TEXT,
      created_at INTEGER DEFAULT (strftime('%s', 'now')),
      updated_at INTEGER DEFAULT (strftime('%s', 'now'))
  );

  CREATE TABLE competence (
      id TEXT,
      title TEXT,
      _changed TEXT,
      _status TEXT,
      created_at INTEGER DEFAULT (strftime('%s', 'now')),
      updated_at INTEGER DEFAULT (strftime('%s', 'now'))
  );

  CREATE TABLE question (
      id TEXT,
      title TEXT,
      description TEXT,
      tooltip_data TEXT,
      type TEXT,
      competence_id TEXT,
      _changed TEXT,
      _status TEXT,
      scale INTEGER,
      created_at INTEGER DEFAULT (strftime('%s', 'now')),
      updated_at INTEGER DEFAULT (strftime('%s', 'now'))
  );

  CREATE TABLE answer (
      id TEXT,
      value INTEGER,
      question_id TEXT,
      session_id TEXT,
      _changed TEXT,
      _status TEXT,
      created_at INTEGER DEFAULT (strftime('%s', 'now')),
      updated_at INTEGER DEFAULT (strftime('%s', 'now'))
  );

  CREATE TABLE feedback (
      id TEXT,
      value TEXT,
      session_id TEXT NULL,
      competence_id TEXT NULL,
      _changed TEXT,
      _status TEXT,
      created_at INTEGER DEFAULT (strftime('%s', 'now')),
      updated_at INTEGER DEFAULT (strftime('%s', 'now'))
  );

  CREATE TABLE teacher (
      id TEXT,
      name TEXT,
      surname TEXT,
      emis_number TEXT,
      subject TEXT,
      birthdate TEXT,
      school_id TEXT,
      image_id TEXT,
      _changed TEXT,
      _status TEXT,
      created_at INTEGER DEFAULT (strftime('%s', 'now')),
      updated_at INTEGER DEFAULT (strftime('%s', 'now'))
  );

  INSERT INTO competence (id, title, _changed, _status)
  VALUES 
      ('4d15a3be-db2a-4fef-913a-6535bcd9d389', 'Time on learning', '','synced'),
      ('0f8d1dcb-1d26-4073-a184-80e32012ae1b', 'Supportive learning environment', '', 'synced'),
      ('b9f2de44-2825-4353-a092-e979b7190a28', 'Positive behavioral expectations', '', 'synced'),
      ('8860e659-02da-4d99-abe4-135c25f1c26f', 'Effective teaching', '', 'synced'),
      ('968d595a-d033-4b6c-9758-943cfb6c412c', 'Positive behavioral expectations', '', 'synced');

  INSERT INTO question (id, title, description, tooltip_data, type, competence_id, scale, _changed, _status)
  VALUES
  ('a235ad6f-382b-4865-94f7-ac5e53736ec6', 'The students are not working', 'In the 1st 10 minutes of the class', '{"title":"Students are not working","subtitle":"Consider that the student isnt participating if they re too distracted or disrupting the class","items":[{"icon":"chart-down","label":"Low","description":"Most students are not working"},{"icon":"heart-rate","label":"Medium","description":"Some students are working"},{"icon":"arrow-growth","label":"High","description":"Most students are working"}]}', 'option', '4d15a3be-db2a-4fef-913a-6535bcd9d389', 3, '', 'synced'),
  ('cf1c6bc7-d5ed-4de8-9fb3-fb3c20cca23e', 'The students are not working', 'In the 2nd 10 minutes of the class', '{"title":"Students are not working","subtitle":"Consider that the student isnt participating if they re too distracted or disrupting the class","items":[{"icon":"chart-down","label":"Low","description":"Most students are not working"},{"icon":"heart-rate","label":"Medium","description":"Some students are working"},{"icon":"arrow-growth","label":"High","description":"Most students are working"}]}', 'option', '4d15a3be-db2a-4fef-913a-6535bcd9d389', 3, '', 'synced'),
  ('9b2391ed-9643-4d8c-a360-58251ea4f0e6', 'The students are not working', 'In the 3rd 10 minutes of the class', '{"title":"Students are not working","subtitle":"Consider that the student isnt participating if they re too distracted or disrupting the class","items":[{"icon":"chart-down","label":"Low","description":"Most students are not working"},{"icon":"heart-rate","label":"Medium","description":"Some students are working"},{"icon":"arrow-growth","label":"High","description":"Most students are working"}]}', 'option', '4d15a3be-db2a-4fef-913a-6535bcd9d389', 3, '', 'synced');

  INSERT INTO question (id, title, description, tooltip_data, type, competence_id, scale, _changed, _status) VALUES
  ('b635e130-7d71-44a8-905b-134ca55adaef', 'The teacher treats all students respectfully', NULL, '{"title":"The teacher treats all students respectfully","subtitle":"Consider the treatment disrespectiful if the teacher shows aggressive behavior or unpolite, by shouting, shaming or with corporal punishment","items":[{"icon":"chart-down","label":"Low","description":"The teacher is disrepectful with the students"},{"icon":"heart-rate","label":"Medium","description":"The teacher isnt clearly disrespectful but isnt polite when talking to the students"},{"icon":"arrow-growth","label":"High","description":"The teacher is polite, referring the students by their names and saying please and thank you"}]}', 'option', '0f8d1dcb-1d26-4073-a184-80e32012ae1b', 5, '', 'synced'),
  ('dd3d2cd1-d87e-4f34-b63b-6ffdeebb0170', 'The teacher uses positive language', NULL, '{"title":"The teacher uses positive language","subtitle":"Consider the language negative if the teacher shows frustration or discourage the students when speaking","items":[{"icon":"chart-down","label":"Low","description":"The teacher uses negative languagem with the students"},{"icon":"heart-rate","label":"Medium","description":"The teacher uses some positive languagem, but not frequently"},{"icon":"arrow-growth","label":"High","description":"The teacher uses positive language"}]}', 'option', '0f8d1dcb-1d26-4073-a184-80e32012ae1b', 5, '', 'synced'),
  ('830808c5-dc47-462a-8080-c31f953aad02', 'The teacher responds to students’ needs', NULL, '{"title":"The teacher responds to students’ needs","subtitle":"The students may have needs to work in the class, such as materials or support at a lesson","items":[{"icon":"chart-down","label":"Low","description":"The teacher isnt aware of students needs or isnt proactive to solve them"},{"icon":"heart-rate","label":"Medium","description":"The teacher responds to students needs but dont address the problem at hand"},{"icon":"arrow-growth","label":"High","description":"The teacher quickly responds to students needs and solve them"}]}', 'option', '0f8d1dcb-1d26-4073-a184-80e32012ae1b', 5, '', 'synced'),
  ('6779b8e9-da1d-4c3a-8691-53c6233a914d', 'The teacher does not treat any gender group unfairly in the classroomin the classroom', NULL, '{"title":"The teacher does not treat any gender group unfairly in the classroomin the classroom","subtitle":"A gender group is treated unfairly if the teacher provides different opportunities to participate in activities or have unequal expectations for students behavior","items":[{"icon":"chart-down","label":"Low","description":"The teacher treats gender groups unfairly in the classroom"},{"icon":"heart-rate","label":"Medium","description":"The teacher doesnt treat gender groups unfairly"},{"icon":"arrow-growth","label":"High","description":"The teacher doesnt treat gender groups unfairly and makes it clear why any gender shouldnt be treated unfairly"}]}', 'option', '0f8d1dcb-1d26-4073-a184-80e32012ae1b', 5, '', 'synced');

  INSERT INTO question (id, title, description, tooltip_data, type, competence_id, scale, _changed, _status)
  VALUES ('97a48f96-cd27-4879-8f41-d2f4ff263785', 'The teacher sets clear behavioral expectations for classroom activities', NULL, '{"title":"The teacher sets clear behavioral expectations for classroom activities","subtitle":"If the students aren''t well-behaved throughout the lesson, the teacher is supposed to set clear behavor expectation for the students during the class or activity","items":[{"icon":"chart-down","label":"Low","description":"The teacher doesn''t set a clear behavioral expectations for class activities"},{"icon":"heart-rate","label":"Medium","description":"The teacher sets unclear or superficial behavioral expectations for class activities"},{"icon":"arrow-growth","label":"High","description":"The teacher sets clear behavioral expectations for class activities"}]}', 'option', 'b9f2de44-2825-4353-a092-e979b7190a28', 5, '', 'synced');

  INSERT INTO question (id, title, description, tooltip_data, type, competence_id, scale, _changed, _status)
  VALUES
  ('c5e34b76-52d9-467b-aa40-bf1beb05df18', 'The teacher clearly states the objectives of the lesson and connects classroom activities to the objectives', NULL, '{"title":"Questions and other strategies are used to ensure the understanding level","subtitle":"The teacher doesn''t ensure students'' understanding level if they don''t ask questions or if they don''t further check for underderstanding if it''s unclear the uptake","items":[{"icon":"chart-down","label":"Low","description":"The teacher doesn''t ask questions or when they do, there''s no further check for underderstanding"},{"icon":"heart-rate","label":"Medium","description":"The teacher uses questions and other strategies to ensure the understanding level of only few students"},{"icon":"arrow-growth","label":"High","description":"The teacher uses questions and other strategies to ensure the understanding level of most students"}]}', 'option', '8860e659-02da-4d99-abe4-135c25f1c26f', 5, '', 'synced'),
  ('b7cd82e2-306e-467d-912e-bafde90febb4', 'The teacher uses questions, or other strategies to ensure students level of understanding', NULL, '{"title":"Most students are monitored during independent/group work","subtitle":"The teacher doesn''t monitor the students if they sit at their desk or remain still while students are working","items":[{"icon":"chart-down","label":"Low","description":"The teacher doesn''t monitor the students during independent or group work"},{"icon":"heart-rate","label":"Medium","description":"The teacher monitor some students during independent or group work"},{"icon":"arrow-growth","label":"High","description":"The teacher monitor most students during independent or group work"}]}', 'option', '8860e659-02da-4d99-abe4-135c25f1c26f', 5, '', 'synced'),
  ('21ab1281-4d6a-4d9c-850b-5b852fff7c01', 'The teacher monitors most students during independent/group workoup work', NULL, '{"title":"The teacher monitors most students during independent/group workoup work","subtitle":"The teacher doesn''t monitor the students if they sit at their desk or remain still while students are working","items":[{"icon":"chart-down","label":"Low","description":"The teacher doesn''t monitor the students during independent or group work"},{"icon":"heart-rate","label":"Medium","description":"The teacher monitor some students during independent or group work"},{"icon":"arrow-growth","label":"High","description":"The teacher monitor most students during independent or group work"}]}', 'option', '8860e659-02da-4d99-abe4-135c25f1c26f', 5, '', 'synced'),
  ('cb414e34-1681-46ec-8221-812bd849d3cb', 'The teacher adjusts teaching to the level of students', NULL, '{"title":"The teacher adjusts teaching to the level of students","subtitle":"The teaching isn''t adjusted to the level of the students if the teacher notice that the students are getting the wrong answer but doesn''t re-explain or provide additional opportunities to learn","items":[{"icon":"chart-down","label":"Low","description":"The teacher doesn''t adjust the teaching to the level of the students"},{"icon":"heart-rate","label":"Medium","description":"The teacher slightly adjusts the teaching to the level of the students"},{"icon":"arrow-growth","label":"High","description":"The teacher greatly adjusts the teaching to the level of the students"}]}', 'option', '8860e659-02da-4d99-abe4-135c25f1c26f', 5, '', 'synced');

  INSERT INTO question (id, title, description, tooltip_data, type, competence_id, scale, _changed, _status)
  VALUES ('65adb3a6-4fc7-4f1f-8b4c-4c670658127b', 'The teacher provides critical thinking tasks', NULL, '{"title":"The teacher provides critical thinking tasks","subtitle":"Classrooms with no thinking tasks include those where students simply listen to the teacher or perform rote tasks","items":[{"icon":"chart-down","label":"Low","description":"The teacher doesn''t provide critical thinking tasks"},{"icon":"heart-rate","label":"Medium","description":"The teacher provides critical thinking tasks but they''re too simple or similar to the teacher''s examples"},{"icon":"arrow-growth","label":"High","description":"The teacher provides detailed critical thinking tasks to apply the learning to new tasks"}]}', 'option', '968d595a-d033-4b6c-9758-943cfb6c412c', 5, '', 'synced');
