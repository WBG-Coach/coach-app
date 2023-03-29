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
  ],
});
