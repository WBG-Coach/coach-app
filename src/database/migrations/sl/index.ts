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
import {runMigrationV10} from './10';
import {runMigrationV11} from './11';

// ADD NEW MIGRATIONS HERE
const SL_MIGRATION_LIST = [
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
  runMigrationV10,
  runMigrationV11,
];

export const runMigrationsSL = async () => {
  const version = parseInt(
    (await StorageService.getDatabaseVersion()) || '0',
    10,
  );

  try {
    for (let index = version; index < SL_MIGRATION_LIST.length; index++) {
      await SL_MIGRATION_LIST[index]();
      console.log(`Migration SL ${index} - DONE`);
    }

    await StorageService.setDatabaseVersion(String(SL_MIGRATION_LIST.length));
  } catch (error) {
    console.log({error});
  }

  console.log('DATABASE SL SYNCED');
};
