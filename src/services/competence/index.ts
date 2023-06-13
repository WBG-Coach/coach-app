import Competence from '../../database/models/Competence';
import {getWatermelon} from '../../database';

const CompetenceService = {
  getCompetencies: async (): Promise<Competence[]> => {
    const db = await getWatermelon();
    return db.collections.get<Competence>('competence').query().fetch();
  },
};

export default CompetenceService;
