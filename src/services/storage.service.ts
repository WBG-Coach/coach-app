import AsyncStorage from '@react-native-async-storage/async-storage';
import {Coach} from '../types/coach';
import {School} from '../types/school';
import moment from 'moment';
import {COUNTRY} from '@env';

const KEYS = {
  databaseVersion: `V2_LOCAL_DATABASE_VERSION`,
  sownSeeds: `SOWN_SEEDS`,
  lastSync: 'LAST_SYNC',
  currentCoach: 'CURRENT_COACH',
  currentSchool: 'CURRENT_SCHOOL',
};

export const StorageService = {
  getDatabaseVersion: () => {
    return AsyncStorage.getItem(KEYS.databaseVersion);
  },
  setDatabaseVersion: async (value: string) => {
    await AsyncStorage.setItem(KEYS.databaseVersion, value);
  },
  getSownSeeds: () => {
    return AsyncStorage.getItem(KEYS.sownSeeds);
  },
  setSownSeeds: async (value: string) => {
    await AsyncStorage.setItem(KEYS.sownSeeds, value);
  },
  getLastSyncFormated: async () => {
    const date = await AsyncStorage.getItem(KEYS.lastSync);
    return date ? moment(new Date(date)).format('LLL') : 'no sync';
  },
  getLastSync: async () => {
    const date = await AsyncStorage.getItem(KEYS.lastSync);
    return date;
  },
  setLastSync: async (date: Date | null) => {
    if (!date) await AsyncStorage.removeItem(KEYS.lastSync);
    else await AsyncStorage.setItem(KEYS.lastSync, date.toJSON());
  },
  getCurrentCoach: async (): Promise<Coach | null> => {
    const coach = await AsyncStorage.getItem(KEYS.currentCoach);

    return coach ? JSON.parse(coach) : null;
  },
  setCurrentCoach: async (coach: Coach | null) => {
    if (coach) {
      await AsyncStorage.setItem(KEYS.currentCoach, JSON.stringify(coach));
    } else {
      await AsyncStorage.removeItem(KEYS.currentCoach);
    }
  },
  getCurrentSchool: async (): Promise<School | null> => {
    const school = await AsyncStorage.getItem(KEYS.currentSchool);

    return school ? JSON.parse(school) : null;
  },
  setCurrentSchool: async (school: School | null) => {
    if (school) {
      await AsyncStorage.setItem(KEYS.currentSchool, JSON.stringify(school));
    } else {
      await AsyncStorage.removeItem(KEYS.currentSchool);
    }
  },
};
