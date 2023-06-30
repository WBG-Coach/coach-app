import AsyncStorage from '@react-native-async-storage/async-storage';
import {Coach} from '../types/coach';
import {School} from '../types/school';

const KEYS = {
  databaseVersion: 'DATABASE_VERSION',
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
  getLastSync: async () => {
    return (await AsyncStorage.getItem(KEYS.lastSync)) || 'no sync';
  },
  setLastSync: async (value: string) => {
    await AsyncStorage.setItem(KEYS.lastSync, value);
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
