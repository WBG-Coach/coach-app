import {openDatabase, SQLiteDatabase} from 'react-native-sqlite-storage';

const databaseService = {
    getDBConnection: async () => await openDatabase({name: "coach-app-sl",location: "default"}),

    checkAndRunMigrations: async (db: SQLiteDatabase) => await db.executeSql(migrations)
}

export default databaseService