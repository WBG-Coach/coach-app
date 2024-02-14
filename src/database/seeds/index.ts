import {SEEDS} from '@env';
import {SEED_SL_INSERT_COMPETENCIES, SEED_SL_INSERT_QUESTIONS} from './sl';
import {StorageService} from '../../services/storage.service';
import {getDBConnection} from '../../services/database.service';

const ENABLE_SEEDS: any = {
  SEED_SL_INSERT_COMPETENCIES,
  SEED_SL_INSERT_QUESTIONS,
};

export const runSeeds = async () => {
  try {
    const sownSeeds = await StorageService.getSownSeeds();
    const splittedSownSeeds = sownSeeds?.split(',') || [];
    const splittedSeeds = SEEDS?.split(',') || [];

    if (!!SEEDS && SEEDS !== sownSeeds) {
      const db = await getDBConnection();
      for (let index = 0; index < splittedSeeds.length; index++) {
        const seed = splittedSeeds[index];
        if (ENABLE_SEEDS[seed] && !splittedSownSeeds.includes(seed)) {
          await db.executeSql(ENABLE_SEEDS[seed]);
          console.log(`SEED "${seed}" - DONE`);
        }
      }

      await StorageService.setSownSeeds(SEEDS);
    } else {
      console.log(`WITHOUT SEED's TO APPLY`);
    }
  } catch (err) {
    console.log({err});
  }
};
