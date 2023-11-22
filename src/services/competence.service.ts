import {Competence} from '../types/competence';
import {Question} from '../types/question';
import {getDBConnection} from './database.service';
import {SessionService} from './session.service';

type QuestionCompetence = {
  competence_id: string;
  competence_title: string;
} & Question;

const CompetenceService = {
  listCompetenciesWithAnswersBySession: async (
    sessionId: string,
  ): Promise<Competence[]> => {
    const competences = await CompetenceService.listCompetenciesWithQuestions();

    return Promise.all(
      competences.map(async competence => ({
        ...competence,
        questions: await Promise.all(
          competence.questions.map(async question => ({
            ...question,
            answers: await SessionService.getAnswersByQuestionAndSession(
              question.id,
              sessionId,
            ),
          })),
        ),
      })),
    );
  },

  listCompetenciesWithQuestions: async (): Promise<Competence[]> => {
    const db = await getDBConnection();
    const results = await db.executeSql(`
      SELECT
        c.id as competence_id,
        c.title as competence_title,
        q.id as id,
        q.title as title,
        q.scale as scale,
        q.description as description,
        q.tooltip_data as tooltip_data
      FROM question as q
      INNER JOIN competence as c ON c.id = q.competence_id
    `);

    const resultParsed: QuestionCompetence[] = results[0].rows.raw();

    return resultParsed.reduce(
      (list, {competence_id, competence_title, ...question}) => {
        const competence = list.find(i => i.id === competence_id);
        if (competence) {
          competence?.questions.push(question as any);
          return list;
        }

        return [
          ...list,
          {id: competence_id, title: competence_title, questions: [question]},
        ] as any[];
      },
      [] as Competence[],
    );
  },

  sync: async (competencies: Competence[]): Promise<void> => {
    const db = await getDBConnection();
    await Promise.all(
      competencies?.map(competence => {
        return db.executeSql(`
          INSERT OR REPLACE INTO competence(id, title, _status)
          VALUES ('${competence.id}', '${competence.title}', 'synced')
        `);
      }),
    );
  },
};

export default CompetenceService;
