import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import schema from './schemas';
import migrations from './migrations';
import User from './models/User';
import School from './models/School';

export const adapter = new SQLiteAdapter({
  schema,
  migrations,
  dbName: 'coachappsl-db',
  jsi: true,
  onSetUpError: () => {
    console.log("Error, database can't be initialized.");
  },
});

// Then, make a Watermelon database from it!
export const database = new Database({
  adapter,
  modelClasses: [User, School],
});
