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
      name: 'guide',
      columns: [
        {
          name: 'content',
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
        {
          name: 'guide_id',
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
          type: 'string',
        },
        {
          name: 'question_id',
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
  ],
});
