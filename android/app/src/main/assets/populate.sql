drop table school;
drop table user;
drop table image;
drop table guide;
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
    ('1', 'Bayshore High', 'https://i.ibb.co/VqKhx46/Image-12.png', '', 'created'),
    ('2', 'Angelwood Elementary', 'https://i.ibb.co/X8r613d/Image-15.png', '', 'created'),
    ('3', 'A new school', 'https://i.ibb.co/X8r613d/Image-15.png', '', 'created'),
    ('4', 'Pine Hill Charter School', 'https://i.ibb.co/tPVsMTY/Image-13.png', '', 'created');


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
    ('1', 'Jane Cooper', 'https://i.ibb.co/t2vHr59/Image.png', '', 'created'),
    ('2', 'Wade Warren', 'https://i.ibb.co/3dhwW5V/download.jpg', '', 'created'),
    ('3', 'Esther Howard', 'https://i.ibb.co/PTB0MwJ/avatar-111332073ddbd15ba0d337e8ca0818d3.jpg', '', 'created'),
    ('4', 'Cameron Williamson', 'https://i.ibb.co/WnGYgB6/download-2.jpg', '', 'created');
    
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
    ('1', 'Fred Williamson Image', 'https://i.ibb.co/hHw0K9B/download-3.jpg', '', 'created');

    
CREATE TABLE guide (
    id TEXT,
  	content TEXT,
    _changed TEXT,
    _status TEXT,
   	created_at INTEGER DEFAULT (strftime('%s', 'now')),
    updated_at INTEGER DEFAULT (strftime('%s', 'now'))
);

INSERT INTO guide (id, content, _changed, _status)
VALUES 
    ('1', '', '', 'created');

CREATE TABLE competence (
    id TEXT,
  	title TEXT,
    guide_id TEXT,
    _changed TEXT,
    _status TEXT,
   	created_at INTEGER DEFAULT (strftime('%s', 'now')),
    updated_at INTEGER DEFAULT (strftime('%s', 'now'))
);

INSERT INTO competence (id, title, guide_id, _changed, _status)
VALUES 
    ('1', 'Time on learning', '1', '','created'),
    ('2', 'Supportive learning environment', '1', '', 'created'),
    ('3', 'Positive behavioral expectations', '1', '', 'created'),
    ('4', 'Effective teaching', '1', '', 'created'),
    ('5', 'Positive behavioral expectations', '1', '', 'created');
    
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
('1', 'The students are working', 'In the first 10 minutes of the class', '{"title":"Students are not working","subtitle":"Consider that the student isnt participating if they re too distracted or disrupting the class","items":[{"icon":"chart-down","label":"Low","description":"Most students are not working"},{"icon":"heart-rate","label":"Medium","description":"Some students are working"},{"icon":"arrow-growth","label":"High","description":"Most students are working"}]}', 'option', '1', '', 'created'),
('2', 'The students are working', 'In the second 10 minutes of the class', '{"title":"Students are not working","subtitle":"Consider that the student isnt participating if they re too distracted or disrupting the class","items":[{"icon":"chart-down","label":"Low","description":"Most students are not working"},{"icon":"heart-rate","label":"Medium","description":"Some students are working"},{"icon":"arrow-growth","label":"High","description":"Most students are working"}]}', 'option', '1', '', 'created'),
('3', 'The students are working', 'In the third 10 minutes of the class', '{"title":"Students are not working","subtitle":"Consider that the student isnt participating if they re too distracted or disrupting the class","items":[{"icon":"chart-down","label":"Low","description":"Most students are not working"},{"icon":"heart-rate","label":"Medium","description":"Some students are working"},{"icon":"arrow-growth","label":"High","description":"Most students are working"}]}', 'option', '1', '', 'created');

INSERT INTO question (id, title, description, tooltip_data, type, competence_id, _changed, _status) VALUES
('4', 'All students are treated respectfully', 'In the first 10 minutes of the class', '{"title":"All students are treated respectfully","subtitle":"Consider the treatment disrespectiful if the teacher shows aggressive behavior or unpolite, by shouting, shaming or with corporal punishment","items":[{"icon":"chart-down","label":"Low","description":"The teacher is disrepectful with the students"},{"icon":"heart-rate","label":"Medium","description":"The teacher isnt clearly disrespectful but isnt polite when talking to the students"},{"icon":"arrow-growth","label":"High","description":"The teacher is polite, referring the students by their names and saying please and thank you"}]}', 'option', '2', '', 'created'),
('5', 'The teacher uses positive language', NULL, '{"title":"The teacher uses positive language","subtitle":"Consider the language negative if the teacher shows frustration or discourage the students when speaking","items":[{"icon":"chart-down","label":"Low","description":"The teacher uses negative languagem with the students"},{"icon":"heart-rate","label":"Medium","description":"The teacher uses some positive languagem, but not frequently"},{"icon":"arrow-growth","label":"High","description":"The teacher uses positive language"}]}', 'option', '2', '', 'created'),
('6', 'The teacher responds to students’ needs', NULL, '{"title":"The teacher responds to students needs","subtitle":"The students may have needs to work in the class, such as materials or support at a lesson","items":[{"icon":"chart-down","label":"Low","description":"The teacher isnt aware of students needs or isnt proactive to solve them"},{"icon":"heart-rate","label":"Medium","description":"The teacher responds to students needs but dont address the problem at hand"},{"icon":"arrow-growth","label":"High","description":"The teacher quickly responds to students needs and solve them"}]}', 'option', '2', '', 'created'),
('7', 'All gender groups are treated fairly in the classroom', NULL, '{"title":"All gender groups are treated fairly in the classroom","subtitle":"A gender group is treated unfairly if the teacher provides different opportunities to participate in activities or have unequal expectations for students behavior","items":[{"icon":"chart-down","label":"Low","description":"The teacher treats gender groups unfairly in the classroom"},{"icon":"heart-rate","label":"Medium","description":"The teacher doesnt treat gender groups unfairly"},{"icon":"arrow-growth","label":"High","description":"The teacher doesnt treat gender groups unfairly and makes it clear why any gender shouldnt be treated unfairly"}]}', 'option', '2', '', 'created');

INSERT INTO question (id, title, description, tooltip_data, type, competence_id, _changed, _status)
VALUES ('8', 'A clear behavioral expectations for class activities is set', NULL, '{"title":"A clear behavioral expectations for class activities is set","subtitle":"If the students aren''t well-behaved throughout the lesson, the teacher is supposed to set clear behavor expectation for the students during the class or activity","items":[{"icon":"chart-down","label":"Low","description":"The teacher doesn''t set a clear behavioral expectations for class activities"},{"icon":"heart-rate","label":"Medium","description":"The teacher sets unclear or superficial behavioral expectations for class activities"},{"icon":"arrow-growth","label":"High","description":"The teacher sets clear behavioral expectations for class activities"}]}', 'option', '3', '', 'created');

INSERT INTO question (id, title, description, tooltip_data, type, competence_id, _changed, _status)
VALUES
('9', 'The objectives of the lesson are explicitly articulated and related to the class', NULL, '{"title":"Questions and other strategies are used to ensure the understanding level","subtitle":"The teacher doesn''t ensure students'' understanding level if they don''t ask questions or if they don''t further check for underderstanding if it''s unclear the uptake","items":[{"icon":"chart-down","label":"Low","description":"The teacher doesn''t ask questions or when they do, there''s no further check for underderstanding"},{"icon":"heart-rate","label":"Medium","description":"The teacher uses questions and other strategies to ensure the understanding level of only few students"},{"icon":"arrow-growth","label":"High","description":"The teacher uses questions and other strategies to ensure the understanding level of most students"}]}', 'option', '4', '', 'created'),
('10', 'Questions and other strategies are used to ensure the understanding level', NULL, '{"title":"Most students are monitored during independent/group work","subtitle":"The teacher doesn''t monitor the students if they sit at their desk or remain still while students are working","items":[{"icon":"chart-down","label":"Low","description":"The teacher doesn''t monitor the students during independent or group work"},{"icon":"heart-rate","label":"Medium","description":"The teacher monitor some students during independent or group work"},{"icon":"arrow-growth","label":"High","description":"The teacher monitor most students during independent or group work"}]}', 'option', '4', '', 'created'),
('11', 'Most students are monitored during independent/group work', NULL, '{"title":"Most students are monitored during independent/group work","subtitle":"The teacher doesn''t monitor the students if they sit at their desk or remain still while students are working","items":[{"icon":"chart-down","label":"Low","description":"The teacher doesn''t monitor the students during independent or group work"},{"icon":"heart-rate","label":"Medium","description":"The teacher monitor some students during independent or group work"},{"icon":"arrow-growth","label":"High","description":"The teacher monitor most students during independent or group work"}]}', 'option', '4', '', 'created'),
('12', 'The teaching is adjusted to the level of the students', NULL, '{"title":"The teaching is adjusted to the level of the students","subtitle":"The teaching isn''t adjusted to the level of the students if the teacher notice that the students are getting the wrong answer but doesn''t re-explain or provide additional opportunities to learn","items":[{"icon":"chart-down","label":"Low","description":"The teacher doesn''t adjust the teaching to the level of the students"},{"icon":"heart-rate","label":"Medium","description":"The teacher slightly adjusts the teaching to the level of the students"},{"icon":"arrow-growth","label":"High","description":"The teacher greatly adjusts the teaching to the level of the students"}]}', 'option', '4', '', 'created');

INSERT INTO question (id, title, description, tooltip_data, type, competence_id, _changed, _status)
VALUES ('13', 'The teacher provides critical thinking tasks', NULL, '{"title":"The teacher provides thinking tasks","subtitle":"Classrooms with no thinking tasks include those where students simply listen to the teacher or perform rote tasks","items":[{"icon":"chart-down","label":"Low","description":"The teacher doesn''t provide critical thinking tasks"},{"icon":"heart-rate","label":"Medium","description":"The teacher provides critical thinking tasks but they''re too simple or similar to the teacher''s examples"},{"icon":"arrow-growth","label":"High","description":"The teacher provides detailed critical thinking tasks to apply the learning to new tasks"}]}', 'option', '5', '', 'created');

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
    coach_id TEXT,
    image_id TEXT,
    _changed TEXT,
    _status TEXT,
   	created_at INTEGER DEFAULT (strftime('%s', 'now')),
    updated_at INTEGER DEFAULT (strftime('%s', 'now'))
);

INSERT INTO teacher (id, name, image_id, _changed, _status)
VALUES 
    ('1', 'Fred Williamson', '1', '', 'created');
