import {Database, DirtyRaw, TableName} from '@nozbe/watermelondb';
import RNFS from 'react-native-fs';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import schema from './schemas';
import migrations from './migrations';
import User from './models/User';
import School from './models/School';
import Image from './models/Image';
import Competence from './models/Competence';
import Question from './models/Question';
import Answer from './models/Answer';
import {synchronize} from '@nozbe/watermelondb/sync';
import DeviceInfo from 'react-native-device-info';
import axios from 'axios';
import Feedback from './models/Feedback';
import {setGenerator} from '@nozbe/watermelondb/utils/common/randomId';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import Session from './models/Session';
import Teacher from './models/Teacher';

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

    setGenerator(() => uuidv4());

    database = new Database({
      adapter,
      modelClasses: [
        School,
        User,
        Image,
        Competence,
        Question,
        Answer,
        Feedback,
        Session,
        Teacher,
      ],
    });
  }

  return database;
};

export const syncWatermelon = async () => {
  const database = await getWatermelon();

  try {
    let log = {};

    await synchronize({
      log,
      database,
      pullChanges: async ({lastPulledAt}) => {
        console.log('1 - pullChanges');
        try {
          const urlParams = lastPulledAt
            ? `last_pulled_at=${lastPulledAt}`
            : '';

          const {data} = await axios.get(
            `https://api-sl.coachdigital.org/sync?${urlParams}`,
          );

          console.log(data.changes.session.created);

          return data;
        } catch (err) {
          console.log({err});
          throw new Error(JSON.stringify(err));
        }
      },

      onDidPullChanges: async () => {
        console.log('2 - onDidPullChanges');
      },

      pushChanges: async ({changes, lastPulledAt}) => {
        console.log('3 - pushChanges');
        try {
          await axios.post(`https://api-sl.coachdigital.org/sync`, {
            changes: {
              ...changes,
              image: {created: [], updated: [], deleted: []},
            },
            lastPulledAt: new Date(lastPulledAt).toJSON(),
            model: DeviceInfo.getDeviceId(),
            apiLevel: await DeviceInfo.getApiLevel(),
            deviceId: await DeviceInfo.getUniqueId(),
          });
        } catch (err) {
          console.log({err});
          throw new Error(JSON.stringify(err));
        }
      },

      conflictResolver: (
        _table: TableName<any>,
        _local: DirtyRaw,
        remote: DirtyRaw,
        _resolved: DirtyRaw,
      ) => {
        console.log('4 - conflictResolver');
        return remote;
      },
    });

    console.log('LOGS - ', JSON.stringify(log));
  } catch (err) {
    console.log('ERROR OF SYNC - ', {err});
  }
};
