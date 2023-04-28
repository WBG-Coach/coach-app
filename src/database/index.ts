import {Database} from '@nozbe/watermelondb';
import RNFS from 'react-native-fs';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import schema from './schemas';
import migrations from './migrations';
import User from './models/User';
import School from './models/School';
import Image from './models/Image';
import Guide from './models/Guide';
import Competence from './models/Competence';
import Question from './models/Question';
import Answer from './models/Answer';
import {synchronize} from '@nozbe/watermelondb/sync';
import DeviceInfo from 'react-native-device-info';
import axios from 'axios';
import Feedback from './models/Feedback';
// import {setGenerator} from '@nozbe/watermelondb/utils/common/randomId';
// import {v4 as uuidv4} from 'uuid';

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

    // setGenerator(() => uuidv4());

    database = new Database({
      adapter,
      modelClasses: [
        School,
        User,
        Image,
        Guide,
        Competence,
        Question,
        Answer,
        Feedback,
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
          const urlParams = `last_pulled_at=${lastPulledAt}`;

          const {data} = await axios.get(
            `http://10.0.2.2:3000/sync?${urlParams}`,
          );

          return data;
        } catch (err) {
          console.log({err});
          throw new Error(JSON.stringify(err));
        }
      },

      onDidPullChanges: async (object: Object) => {
        console.log('2 - onDidPullChanges', {object});
      },

      pushChanges: async ({changes, lastPulledAt}) => {
        console.log('3 - pushChanges', {changes, lastPulledAt});
        try {
          await axios.post(`http://10.0.2.2:3000/sync`, {
            changes,
            lastPulledAt,
            model: DeviceInfo.getDeviceId(),
            apiLevel: DeviceInfo.getApiLevel(),
            deviceId: await DeviceInfo.getUniqueId(),
          });
        } catch (err) {
          console.log({err});
          throw new Error(JSON.stringify(err));
        }
      },

      conflictResolver: () => {
        console.log('4 - conflictResolver');
        return {};
      },
    });

    console.log('LOGS - ', JSON.stringify(log));
  } catch (err) {
    console.log('ERROR OF SYNC - ', {err});
  }
};
