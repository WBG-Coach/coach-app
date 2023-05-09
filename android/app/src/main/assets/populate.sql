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
      boys_count TEXT null,
      girls_count TEXT null,
      subject TEXT null,
      lesson_time TEXT null,
      objective TEXT null,
      key_points TEXT null,
      coach_id TEXT null,
      school_id TEXT null,
      teacher_id TEXT null,
      created_at INTEGER DEFAULT (strftime('%s', 'now')),
      updated_at INTEGER DEFAULT (strftime('%s', 'now')),
      primary key (`id`)
  );

  CREATE TABLE local_storage (
      key TEXT,
      value TEXT
  );

  CREATE TABLE school (
      id TEXT,
      name TEXT,
      image_url TEXT,
      _changed TEXT,
      _status TEXT,
      created_at INTEGER DEFAULT (strftime('%s', 'now')),
      updated_at INTEGER DEFAULT (strftime('%s', 'now'))
  );

  INSERT INTO school (id, name, image_url, _changed, _status)
  VALUES 
      ('475ab284-1603-481a-86c6-e46323564ebb', 'Bayshore High', 'https://i.ibb.co/VqKhx46/Image-12.png', '', 'created'),
      ('4119412f-70a0-4d78-bd4c-58c0eb03f5ac', 'Angelwood Elementary', 'https://i.ibb.co/X8r613d/Image-15.png', '', 'created'),
      ('c4999ff6-66c0-4eff-be7a-fffb8851e17c', 'A new school', 'https://i.ibb.co/X8r613d/Image-15.png', '', 'created'),
      ('01def398-c159-4128-9b09-aec91f8da6c2', 'Pine Hill Charter School', 'https://i.ibb.co/tPVsMTY/Image-13.png', '', 'created');

  CREATE TABLE user (
      id TEXT,
      name TEXT,
      image_url TEXT,
      _changed TEXT,
      _status TEXT,
      created_at INTEGER DEFAULT (strftime('%s', 'now')),
      updated_at INTEGER DEFAULT (strftime('%s', 'now'))
  );

  INSERT INTO user (id, name, image_url, _changed, _status)
  VALUES 
      ('33c70236-ece4-487f-85b5-a74065c2a77c', 'Jane Cooper', 'https://i.ibb.co/t2vHr59/Image.png', '', 'created'),
      ('e8a16cac-2329-4ed4-936a-09096f27799b', 'Wade Warren', 'https://i.ibb.co/3dhwW5V/download.jpg', '', 'created'),
      ('961d75fb-8c52-404b-9381-319291281660', 'Esther Howard', 'https://i.ibb.co/PTB0MwJ/avatar-111332073ddbd15ba0d337e8ca0818d3.jpg', '', 'created'),
      ('4c872a8d-e3c2-498d-8a22-2dbace7daaad', 'Cameron Williamson', 'https://i.ibb.co/WnGYgB6/download-2.jpg', '', 'created');

  CREATE TABLE image (
      id TEXT,
      name TEXT,
      value TEXT,
      _changed TEXT,
      _status TEXT,
      created_at INTEGER DEFAULT (strftime('%s', 'now')),
      updated_at INTEGER DEFAULT (strftime('%s', 'now'))
  );

  INSERT INTO image (id, name, value, _changed, _status)
  VALUES 
      ('3f0b5974-8461-4442-9595-8db7bb7d16b5', 'Fred Williamson Image', 'https://i.ibb.co/hHw0K9B/download-3.jpg', '', 'created');

  CREATE TABLE competence (
      id TEXT,
      title TEXT,
      _changed TEXT,
      _status TEXT,
      created_at INTEGER DEFAULT (strftime('%s', 'now')),
      updated_at INTEGER DEFAULT (strftime('%s', 'now'))
  );

  INSERT INTO competence (id, title, _changed, _status)
  VALUES 
      ('4d15a3be-db2a-4fef-913a-6535bcd9d389', 'Time on learning', '','created'),
      ('0f8d1dcb-1d26-4073-a184-80e32012ae1b', 'Supportive learning environment', '', 'created'),
      ('b9f2de44-2825-4353-a092-e979b7190a28', 'Positive behavioral expectations', '', 'created'),
      ('8860e659-02da-4d99-abe4-135c25f1c26f', 'Effective teaching', '', 'created'),
      ('968d595a-d033-4b6c-9758-943cfb6c412c', 'Positive behavioral expectations', '', 'created');

  CREATE TABLE question (
      id TEXT,
      title TEXT,
      description TEXT,
      tooltip_data TEXT,
      type TEXT,
      competence_id TEXT,
      _changed TEXT,
      _status TEXT,
      created_at INTEGER DEFAULT (strftime('%s', 'now')),
      updated_at INTEGER DEFAULT (strftime('%s', 'now'))
  );

  INSERT INTO question (id, title, description, tooltip_data, type, competence_id, _changed, _status)
  VALUES
  ('a235ad6f-382b-4865-94f7-ac5e53736ec6', 'The students are working', 'In the first 10 minutes of the class', '{"title":"Students are not working","subtitle":"Consider that the student isnt participating if they re too distracted or disrupting the class","items":[{"icon":"chart-down","label":"Low","description":"Most students are not working"},{"icon":"heart-rate","label":"Medium","description":"Some students are working"},{"icon":"arrow-growth","label":"High","description":"Most students are working"}]}', 'option', '4d15a3be-db2a-4fef-913a-6535bcd9d389', '', 'created'),
  ('cf1c6bc7-d5ed-4de8-9fb3-fb3c20cca23e', 'The students are working', 'In the second 10 minutes of the class', '{"title":"Students are not working","subtitle":"Consider that the student isnt participating if they re too distracted or disrupting the class","items":[{"icon":"chart-down","label":"Low","description":"Most students are not working"},{"icon":"heart-rate","label":"Medium","description":"Some students are working"},{"icon":"arrow-growth","label":"High","description":"Most students are working"}]}', 'option', '4d15a3be-db2a-4fef-913a-6535bcd9d389', '', 'created'),
  ('9b2391ed-9643-4d8c-a360-58251ea4f0e6', 'The students are working', 'In the third 10 minutes of the class', '{"title":"Students are not working","subtitle":"Consider that the student isnt participating if they re too distracted or disrupting the class","items":[{"icon":"chart-down","label":"Low","description":"Most students are not working"},{"icon":"heart-rate","label":"Medium","description":"Some students are working"},{"icon":"arrow-growth","label":"High","description":"Most students are working"}]}', 'option', '4d15a3be-db2a-4fef-913a-6535bcd9d389', '', 'created');

  INSERT INTO question (id, title, description, tooltip_data, type, competence_id, _changed, _status) VALUES
  ('4', 'All students are treated respectfully', 'In the first 10 minutes of the class', '{"title":"All students are treated respectfully","subtitle":"Consider the treatment disrespectiful if the teacher shows aggressive behavior or unpolite, by shouting, shaming or with corporal punishment","items":[{"icon":"chart-down","label":"Low","description":"The teacher is disrepectful with the students"},{"icon":"heart-rate","label":"Medium","description":"The teacher isnt clearly disrespectful but isnt polite when talking to the students"},{"icon":"arrow-growth","label":"High","description":"The teacher is polite, referring the students by their names and saying please and thank you"}]}', 'option', '0f8d1dcb-1d26-4073-a184-80e32012ae1b', '', 'created'),
  ('5', 'The teacher uses positive language', NULL, '{"title":"The teacher uses positive language","subtitle":"Consider the language negative if the teacher shows frustration or discourage the students when speaking","items":[{"icon":"chart-down","label":"Low","description":"The teacher uses negative languagem with the students"},{"icon":"heart-rate","label":"Medium","description":"The teacher uses some positive languagem, but not frequently"},{"icon":"arrow-growth","label":"High","description":"The teacher uses positive language"}]}', 'option', '0f8d1dcb-1d26-4073-a184-80e32012ae1b', '', 'created'),
  ('6', 'The teacher responds to students’ needs', NULL, '{"title":"The teacher responds to students needs","subtitle":"The students may have needs to work in the class, such as materials or support at a lesson","items":[{"icon":"chart-down","label":"Low","description":"The teacher isnt aware of students needs or isnt proactive to solve them"},{"icon":"heart-rate","label":"Medium","description":"The teacher responds to students needs but dont address the problem at hand"},{"icon":"arrow-growth","label":"High","description":"The teacher quickly responds to students needs and solve them"}]}', 'option', '0f8d1dcb-1d26-4073-a184-80e32012ae1b', '', 'created'),
  ('7', 'All gender groups are treated fairly in the classroom', NULL, '{"title":"All gender groups are treated fairly in the classroom","subtitle":"A gender group is treated unfairly if the teacher provides different opportunities to participate in activities or have unequal expectations for students behavior","items":[{"icon":"chart-down","label":"Low","description":"The teacher treats gender groups unfairly in the classroom"},{"icon":"heart-rate","label":"Medium","description":"The teacher doesnt treat gender groups unfairly"},{"icon":"arrow-growth","label":"High","description":"The teacher doesnt treat gender groups unfairly and makes it clear why any gender shouldnt be treated unfairly"}]}', 'option', '0f8d1dcb-1d26-4073-a184-80e32012ae1b', '', 'created');

  INSERT INTO question (id, title, description, tooltip_data, type, competence_id, _changed, _status)
  VALUES ('8', 'A clear behavioral expectations for class activities is set', NULL, '{"title":"A clear behavioral expectations for class activities is set","subtitle":"If the students aren''t well-behaved throughout the lesson, the teacher is supposed to set clear behavor expectation for the students during the class or activity","items":[{"icon":"chart-down","label":"Low","description":"The teacher doesn''t set a clear behavioral expectations for class activities"},{"icon":"heart-rate","label":"Medium","description":"The teacher sets unclear or superficial behavioral expectations for class activities"},{"icon":"arrow-growth","label":"High","description":"The teacher sets clear behavioral expectations for class activities"}]}', 'option', 'b9f2de44-2825-4353-a092-e979b7190a28', '', 'created');

  INSERT INTO question (id, title, description, tooltip_data, type, competence_id, _changed, _status)
  VALUES
  ('9', 'The objectives of the lesson are explicitly articulated and related to the class', NULL, '{"title":"Questions and other strategies are used to ensure the understanding level","subtitle":"The teacher doesn''t ensure students'' understanding level if they don''t ask questions or if they don''t further check for underderstanding if it''s unclear the uptake","items":[{"icon":"chart-down","label":"Low","description":"The teacher doesn''t ask questions or when they do, there''s no further check for underderstanding"},{"icon":"heart-rate","label":"Medium","description":"The teacher uses questions and other strategies to ensure the understanding level of only few students"},{"icon":"arrow-growth","label":"High","description":"The teacher uses questions and other strategies to ensure the understanding level of most students"}]}', 'option', '8860e659-02da-4d99-abe4-135c25f1c26f', '', 'created'),
  ('10', 'Questions and other strategies are used to ensure the understanding level', NULL, '{"title":"Most students are monitored during independent/group work","subtitle":"The teacher doesn''t monitor the students if they sit at their desk or remain still while students are working","items":[{"icon":"chart-down","label":"Low","description":"The teacher doesn''t monitor the students during independent or group work"},{"icon":"heart-rate","label":"Medium","description":"The teacher monitor some students during independent or group work"},{"icon":"arrow-growth","label":"High","description":"The teacher monitor most students during independent or group work"}]}', 'option', '8860e659-02da-4d99-abe4-135c25f1c26f', '', 'created'),
  ('11', 'Most students are monitored during independent/group work', NULL, '{"title":"Most students are monitored during independent/group work","subtitle":"The teacher doesn''t monitor the students if they sit at their desk or remain still while students are working","items":[{"icon":"chart-down","label":"Low","description":"The teacher doesn''t monitor the students during independent or group work"},{"icon":"heart-rate","label":"Medium","description":"The teacher monitor some students during independent or group work"},{"icon":"arrow-growth","label":"High","description":"The teacher monitor most students during independent or group work"}]}', 'option', '8860e659-02da-4d99-abe4-135c25f1c26f', '', 'created'),
  ('12', 'The teaching is adjusted to the level of the students', NULL, '{"title":"The teaching is adjusted to the level of the students","subtitle":"The teaching isn''t adjusted to the level of the students if the teacher notice that the students are getting the wrong answer but doesn''t re-explain or provide additional opportunities to learn","items":[{"icon":"chart-down","label":"Low","description":"The teacher doesn''t adjust the teaching to the level of the students"},{"icon":"heart-rate","label":"Medium","description":"The teacher slightly adjusts the teaching to the level of the students"},{"icon":"arrow-growth","label":"High","description":"The teacher greatly adjusts the teaching to the level of the students"}]}', 'option', '8860e659-02da-4d99-abe4-135c25f1c26f', '', 'created');

  INSERT INTO question (id, title, description, tooltip_data, type, competence_id, _changed, _status)
  VALUES ('13', 'The teacher provides critical thinking tasks', NULL, '{"title":"The teacher provides thinking tasks","subtitle":"Classrooms with no thinking tasks include those where students simply listen to the teacher or perform rote tasks","items":[{"icon":"chart-down","label":"Low","description":"The teacher doesn''t provide critical thinking tasks"},{"icon":"heart-rate","label":"Medium","description":"The teacher provides critical thinking tasks but they''re too simple or similar to the teacher''s examples"},{"icon":"arrow-growth","label":"High","description":"The teacher provides detailed critical thinking tasks to apply the learning to new tasks"}]}', 'option', '968d595a-d033-4b6c-9758-943cfb6c412c', '', 'created');

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
      _changed TEXT,
      _status TEXT,
      created_at INTEGER DEFAULT (strftime('%s', 'now')),
      updated_at INTEGER DEFAULT (strftime('%s', 'now'))
  );

  CREATE TABLE teacher (
      id TEXT,
      name TEXT,
      surname TEXT,
      emis_number INTEGER,
      subject TEXT,
      birthdate TEXT,
      school_id TEXT,
      image_id TEXT,
      _changed TEXT,
      _status TEXT,
      created_at INTEGER DEFAULT (strftime('%s', 'now')),
      updated_at INTEGER DEFAULT (strftime('%s', 'now'))
  );

  INSERT INTO teacher (id, name, surname, emis_number, subject, birthdate, school_id, image_id, _changed, _status)
  VALUES 
      ('c90cfae3-853d-49b3-a311-6ca20e61eeb6', 'Fred', 'Williamson', 0101010101, 'Math', 'Mon May 08 2023 12:12:34 GMT-0300 (Horário Padrão de Brasília)', '475ab284-1603-481a-86c6-e46323564ebb', '3f0b5974-8461-4442-9595-8db7bb7d16b5', '', 'created');
