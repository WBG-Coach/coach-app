import {Center, Spinner} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {getWatermelon} from '../../../database';
import Competence from '../../../database/models/Competence';
import Question from '../../../database/models/Question';

export type CompetenceWithQuestions = Omit<Competence, 'questions'> & {
  questions: Question[];
};

export type CompetenceContextProps = {
  competences: CompetenceWithQuestions[];
};

export const CompetenceContext = React.createContext<CompetenceContextProps>(
  {} as CompetenceContextProps,
);

interface Props {
  children: React.ReactNode;
}

const CompetenceContextProvider = ({children}: Props) => {
  const [competences, setCompetences] = useState<CompetenceWithQuestions[]>([]);

  useEffect(() => {
    (async () => {
      const db = await getWatermelon();
      const competences = await db.collections
        .get<Competence>('competence')
        .query()
        .fetch();

      const updatedCompetences: CompetenceWithQuestions[] = await Promise.all(
        competences.map(
          async competence =>
            ({
              ...competence._raw,
              questions: (
                await competence.questions.fetch()
              ).map(({_raw}) => _raw),
            } as any),
        ),
      );

      setCompetences(updatedCompetences);
    })();
  }, []);

  return (
    <CompetenceContext.Provider value={{competences}}>
      {competences.length < 1 ? (
        <Center flex={1}>
          <Spinner />
        </Center>
      ) : (
        children
      )}
    </CompetenceContext.Provider>
  );
};

export const useCompetenceContext = () => {
  const context = useContext(CompetenceContext);

  if (context) return context;

  throw new Error(
    'useCompetenceContext must be used within a CompetenceContextProvider.',
  );
};

export default CompetenceContextProvider;
