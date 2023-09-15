import {StorageService} from '../../services/storage.service';
import {runMigrationV0} from './00';
import {runMigrationV1} from './01';
import {runMigrationV2} from './02';
import {runMigrationV3} from './03';
import {runMigrationV4} from './04';
import {runMigrationV5} from './05';
import {runMigrationV6} from './06';
import {runMigrationV7} from './07';

// ADD NEW MIGRATIONS HERE
const MIGRATION_LIST = [
  runMigrationV0,
  runMigrationV1,
  runMigrationV2,
  runMigrationV3,
  runMigrationV4,
  runMigrationV5,
  runMigrationV6,
  runMigrationV7,
];

export const runMigrations = async () => {
  const version = parseInt(
    (await StorageService.getDatabaseVersion()) || '0',
    10,
  );

  try {
    for (let index = version; index < MIGRATION_LIST.length; index++) {
      await MIGRATION_LIST[index]();
      console.log(`Migration ${index} - DONE`);
    }

    await StorageService.setDatabaseVersion(String(MIGRATION_LIST.length));
  } catch (error) {
    console.log({error});
  }

  console.log('DATABASE SYNCED');
};
