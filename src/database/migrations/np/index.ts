import {StorageService} from '../../../services/storage.service';
import {runMigrationV0} from './00';
import {runMigrationV1} from './01';
import {runMigrationV2} from './02';
import {runMigrationV3} from './03';
import {runMigrationV4} from './04';
import {runMigrationV5} from './05';
import {runMigrationV6} from './06';
import {runMigrationV7} from './07';
import {runMigrationV8} from './08';
import {runMigrationV9} from './09';

// ADD NEW MIGRATIONS HERE
const NP_MIGRATION_LIST = [
  runMigrationV0,
  runMigrationV1,
  runMigrationV2,
  runMigrationV3,
  runMigrationV4,
  runMigrationV5,
  runMigrationV6,
  runMigrationV7,
  runMigrationV8,
  runMigrationV9,
];

export const runMigrationsNP = async () => {
  const version = parseInt(
    (await StorageService.getDatabaseVersion()) || '0',
    10,
  );

  try {
    for (let index = version; index < NP_MIGRATION_LIST.length; index++) {
      await NP_MIGRATION_LIST[index]();
      console.log(`Migration NP ${index} - DONE`);
    }

    await StorageService.setDatabaseVersion(String(NP_MIGRATION_LIST.length));
  } catch (error) {
    console.log({error});
  }

  console.log('DATABASE SYNCED');
};
