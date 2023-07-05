import {Answer} from '../types/answer';
import {Question} from '../types/question';
import {Session} from '../types/session';
import {getDBConnection} from './database.service';

export const AnswerService = {
  listBySessionsAndQuestions: async (
    sessionIds: Session['id'][],
    questionIds: Question['id'][],
  ): Promise<Answer[]> => {
    const db = await getDBConnection();
    const result = (await db.executeSql(`SELECT *
    FROM answer
    WHERE session_id IN (${sessionIds.reduce((acc, item, index) => {
      return acc + `'${item}'${sessionIds.length - 1 !== index ? ',' : ''}`;
    }, '')})
      AND question_id IN (${questionIds.reduce((acc, item, index) => {
        return acc + `'${item}'${questionIds.length - 1 !== index ? ',' : ''}`;
      }, '')});
    `)) as any[];

    return result[0].rows.raw();
  },
};
