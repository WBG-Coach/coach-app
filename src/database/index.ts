import {Database} from '@nozbe/watermelondb';
import RNFS from 'react-native-fs';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import schema from './schemas';
import migrations from './migrations';
import User from './models/User';
import School from './models/School';
import Image from './models/Image';

let database: Database;

export const getWatermelon = async () => {
  if (!database) {
    const dbName = 'coachappsl-db.db';

    try {
      const dbPath = `${RNFS.DocumentDirectoryPath}/../${dbName}`;
      const exists = await RNFS.exists(dbPath);

      if (!exists) {
        await RNFS.copyFileAssets(
          dbName,
          `${RNFS.DocumentDirectoryPath}/../${dbName}`,
        );
      }
    } catch (err) {
      console.log('Critical error, default database not especified.');
      console.log('->', err);
      throw new Error(``);
    }

    const adapter = new SQLiteAdapter({
      schema,
      migrations,
      dbName: `${RNFS.DocumentDirectoryPath}/../${dbName.replace('.db', '')}`,
      jsi: false,
      onSetUpError: () => {
        console.log("Error, database can't be initialized.");
      },
    });

    database = new Database({
      adapter,
      modelClasses: [School, User, Image],
    });
  }

  return database;
};
