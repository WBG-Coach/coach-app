import {getDBConnection} from './database.service';

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
};

export default SyncService;
