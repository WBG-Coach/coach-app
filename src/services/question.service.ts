import {Answer} from '../types/answer';
import {Competence} from '../types/competence';
import {Question} from '../types/question';
import {getDBConnection} from './database.service';

export const QuestionService = {
  listQuestionsByCompetence: async (
    competence_id: Competence['id'],
  ): Promise<Question[]> => {
    const db = await getDBConnection();
    const result = (await db.executeSql(`SELECT *
    FROM question
    WHERE competence_id = '${competence_id}'`)) as any[];

    return result[0].rows.raw();
  },

  findQuestionByAnswerId: async (
    answer_id: Answer['id'],
  ): Promise<Question> => {
    const db = await getDBConnection();
    const result = (await db.executeSql(
      `
      SELECT q.*
        FROM question as q
  INNER JOIN answer as a on a.question_id = q.id
       WHERE a.id = '${answer_id}'
    `,
    )) as any[];

    return result[0].rows.raw()[0];
  },
};
