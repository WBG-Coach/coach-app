import {Control} from 'react-hook-form';
import {CompetenceWithQuestions} from '../../../../providers/contexts/CompetencesContext';

export type Props = {
  competence: CompetenceWithQuestions;
  isFinished: boolean;
  startCollapsed: boolean;
  control: Control<
    {
      [key: string]: string | undefined;
    },
    any
  >;
};
