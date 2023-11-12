import axios from 'axios';
import {Answer} from '../types/answer';
import {Coach} from '../types/coach';
import {Feedback} from '../types/feedback';
import {Image} from '../types/image';
import {Session} from '../types/session';
import {Teacher} from '../types/teacher';
import {getDBConnection} from './database.service';
import DeviceInfo from 'react-native-device-info';
import GeolocationService from './geolocation.service';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {StorageService} from './storage.service';
import {SyncData} from '../types/sync';
import {CoachService} from './coach.service';
import {TeacherService} from './teacher.service';
import {SessionService} from './session.service';
import {AnswerService} from './answer.service';

const SyncService = {
  getUnsyncedItemsCount: async (): Promise<{
    pendingTeachers: number;
    pendingFeedbacks: number;
    pendingSessions: number;
  }> => {
    const db = await getDBConnection();

    const results = await db.executeSql(`
        SELECT
            (SELECT COUNT(*) FROM teacher where _status != 'synced') AS pendingTeachers,
            (SELECT COUNT(*) FROM feedback where _status != 'synced') AS pendingFeedbacks,
            (SELECT COUNT(*) FROM session where _status != 'synced') AS pendingSessions
    `);

    return results[0].rows.raw()[0];
  },

  trySyncData: async (): Promise<void> => {
    try {
      // const db = await getDBConnection();
      // const changes = {
      //   images: await SyncService.getPendingImages(db),
      //   coaches: await SyncService.getPendingCoaches(db),
      //   coachSchools: await SyncService.getPendingCoachSchools(db),
      //   teachers: await SyncService.getPendingTeachers(db),
      //   sessions: await SyncService.getPendingSessions(db),
      //   answers: await SyncService.getPendingAnswers(db),
      //   feedbacks: await SyncService.getPendingFeedbacks(db),
      // };

      // const currentSchool = await StorageService.getCurrentSchool();
      // const lastSync = await StorageService.getLastSync();

      // const response = await axios.post<SyncData>(
      //   'https://api-sl.coachdigital.org/sync',
      //   {
      //     changes,
      //     lastSync,
      //     model: DeviceInfo.getDeviceId(),
      //     apiLevel: await DeviceInfo.getApiLevel(),
      //     deviceId: await DeviceInfo.getUniqueId(),
      //     ...(await GeolocationService.getLocation()),
      //   },
      //   {headers: {token: currentSchool?.schoolKey}},
      // );

      // if (response.status !== 200) {
      //   throw new Error();
      // }

      // if (currentSchool && response.data.total > 0) {
      //   await CoachService.sync(response.data.coaches);
      //   await CoachService.syncCoachSchools(response.data.coachSchools);
      //   await TeacherService.sync(response.data.teachers);
      //   await SessionService.sync(response.data.sessions);
      //   await AnswerService.sync(response.data.answers);
      //   await SessionService.syncFeedbacks(response.data.feedbacks);
      //   await StorageService.setLastSync(new Date());
      // }

      // await SyncService.updateAllToSynced(db);
    } catch (err) {
      console.log({err});
    }
  },

  updateAllToSynced: async (db: SQLiteDatabase): Promise<void> => {
    await Promise.all([
      SyncService.updateToSyncedImages(db),
      SyncService.updateToSyncedCoachSchools(db),
      SyncService.updateToSyncedCoaches(db),
      SyncService.updateToSyncedTeachers(db),
      SyncService.updateToSyncedSession(db),
      SyncService.updateToSyncedAnswers(db),
      SyncService.updateToSyncedFeedbacks(db),
    ]);
  },

  getPendingImages: async (db: SQLiteDatabase): Promise<Image[]> => {
    const results = await db.executeSql(
      "SELECT * FROM image WHERE _status != 'synced'",
    );

    return results[0].rows.raw();
  },

  updateToSyncedImages: async (db: SQLiteDatabase): Promise<void> => {
    await db.executeSql(
      "UPDATE image SET _status = 'synced' WHERE _status != 'synced'",
    );
  },

  getPendingCoaches: async (db: SQLiteDatabase): Promise<Coach[]> => {
    const results = await db.executeSql(
      "SELECT * FROM coach WHERE _status != 'synced'",
    );

    return results[0].rows.raw();
  },

  getPendingCoachSchools: async (db: SQLiteDatabase): Promise<Coach[]> => {
    const results = await db.executeSql(
      "SELECT * FROM coach_school WHERE _status != 'synced'",
    );

    return results[0].rows.raw();
  },

  updateToSyncedCoachSchools: async (db: SQLiteDatabase): Promise<void> => {
    await db.executeSql(
      "UPDATE coach_school SET _status = 'synced' WHERE _status != 'synced'",
    );
  },

  updateToSyncedCoaches: async (db: SQLiteDatabase): Promise<void> => {
    await db.executeSql(
      "UPDATE coach SET _status = 'synced' WHERE _status != 'synced'",
    );
  },

  getPendingTeachers: async (db: SQLiteDatabase): Promise<Teacher[]> => {
    const results = await db.executeSql(
      "SELECT * FROM teacher WHERE _status != 'synced'",
    );

    return results[0].rows.raw();
  },

  updateToSyncedTeachers: async (db: SQLiteDatabase): Promise<void> => {
    await db.executeSql(
      "UPDATE teacher SET _status = 'synced' WHERE _status != 'synced'",
    );
  },

  getPendingSessions: async (db: SQLiteDatabase): Promise<Session[]> => {
    const results = await db.executeSql(
      "SELECT * FROM session WHERE _status != 'synced'",
    );

    return results[0].rows.raw();
  },

  updateToSyncedSession: async (db: SQLiteDatabase): Promise<void> => {
    await db.executeSql(
      "UPDATE session SET _status = 'synced' WHERE _status != 'synced'",
    );
  },

  getPendingAnswers: async (db: SQLiteDatabase): Promise<Answer[]> => {
    const results = await db.executeSql(
      "SELECT * FROM answer WHERE _status != 'synced'",
    );

    return results[0].rows.raw();
  },

  updateToSyncedAnswers: async (db: SQLiteDatabase): Promise<void> => {
    await db.executeSql(
      "UPDATE answer SET _status = 'synced' WHERE _status != 'synced'",
    );
  },

  getPendingFeedbacks: async (db: SQLiteDatabase): Promise<Feedback[]> => {
    const results = await db.executeSql(
      "SELECT * FROM feedback WHERE _status != 'synced'",
    );

    return results[0].rows.raw();
  },

  updateToSyncedFeedbacks: async (db: SQLiteDatabase): Promise<void> => {
    await db.executeSql(
      "UPDATE feedback SET _status = 'synced' WHERE _status != 'synced'",
    );
  },
};

export default SyncService;
