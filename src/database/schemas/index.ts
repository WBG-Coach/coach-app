import {appSchema, tableSchema} from '@nozbe/watermelondb';

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'school',
      columns: [
        {
          name: 'name',
          type: 'string',
        },
        {
          name: 'image_url',
          type: 'string',
        },
        {name: 'created_at', type: 'number'},
        {name: 'updated_at', type: 'number'},
      ],
    }),
    tableSchema({
      name: 'user',
      columns: [
        {
          name: 'name',
          type: 'string',
        },
        {
          name: 'image_url',
          type: 'string',
        },
        {name: 'created_at', type: 'number'},
        {name: 'updated_at', type: 'number'},
      ],
    }),
    tableSchema({
      name: 'image',
      columns: [
        {
          name: 'name',
          type: 'string',
        },
        {
          name: 'value',
          type: 'string',
        },
        {name: 'created_at', type: 'number'},
        {name: 'updated_at', type: 'number'},
      ],
    }),
    tableSchema({
      name: 'competence',
      columns: [
        {
          name: 'title',
          type: 'string',
        },
        {name: 'created_at', type: 'number'},
        {name: 'updated_at', type: 'number'},
      ],
    }),
    tableSchema({
      name: 'question',
      columns: [
        {
          name: 'title',
          type: 'string',
        },
        {
          name: 'description',
          type: 'string',
        },
        {
          name: 'tooltip_data',
          type: 'string',
        },
        {
          name: 'type',
          type: 'string',
        },
        {
          name: 'competence_id',
          type: 'string',
        },
        {name: 'created_at', type: 'number'},
        {name: 'updated_at', type: 'number'},
      ],
    }),
    tableSchema({
      name: 'answer',
      columns: [
        {
          name: 'value',
          type: 'number',
        },
        {
          name: 'question_id',
          type: 'string',
        },
        {
          name: 'session_id',
          type: 'string',
        },
        {name: 'created_at', type: 'number'},
        {name: 'updated_at', type: 'number'},
      ],
    }),
    tableSchema({
      name: 'feedback',
      columns: [
        {
          name: 'value',
          type: 'string',
        },
        {
          name: 'session_id',
          type: 'string',
        },
        {name: 'created_at', type: 'number'},
        {name: 'updated_at', type: 'number'},
      ],
    }),
    tableSchema({
      name: 'session',
      columns: [
        {name: 'session_status', type: 'string'},
        {name: 'boys_count', type: 'string'},
        {name: 'girls_count', type: 'string'},
        {name: 'subject', type: 'string'},
        {name: 'lesson_time', type: 'string'},
        {name: 'objective', type: 'string'},
        {name: 'key_points', type: 'string'},
        {name: 'coach_id', type: 'string'},
        {name: 'school_id', type: 'string'},
        {name: 'teacher_id', type: 'string'},
        {name: 'created_at', type: 'number'},
        {name: 'updated_at', type: 'number'},
      ],
    }),
    tableSchema({
      name: 'teacher',
      columns: [
        {name: 'name', type: 'string'},
        {name: 'surname', type: 'string'},
        {name: 'subject', type: 'string'},
        {name: 'emis_number', type: 'number'},
        {name: 'school_id', type: 'string'},
        {name: 'image_id', type: 'string'},
        {name: 'birthdate', type: 'string'},
        {name: 'created_at', type: 'number'},
        {name: 'updated_at', type: 'number'},
      ],
    }),
  ],
});
