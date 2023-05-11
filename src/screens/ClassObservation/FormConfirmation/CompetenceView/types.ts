import {CompetenceWithQuestions} from '../../../../providers/contexts/CompetencesContext';

export type Props = {
  competences: Array<CompetenceWithQuestions & {overall_rating: number}>;
};
