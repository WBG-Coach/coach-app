import React from 'react';
import {getTags} from '../../../../components/StarsTag/common';
import {HStack, ScrollView, Text, VStack} from 'native-base';
import {Competence} from '../../../../types/competence';
import StarView from '../../../../components/StarView';
import {Question} from '../../../../types/question';
import {useTranslation} from 'react-i18next';
import {
  averageAnswersPerCompetence,
  sumAnswersPerQuestions,
} from '../../../../helpers/session.helper';

const averageConverter = {
  1: 1,
  2: 1,
  3: 1,
  4: 2,
  5: 3,
};

type Props = {competences: Competence[]};

const CompetenceView: React.FC<Props> = ({competences}) => {
  const {t} = useTranslation();
  const tags = getTags(t);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text fontSize={'HSM'} fontWeight={600} color={'gray.700'}>
        {t('classObservation.formConfirmation.competenceView.title')}
      </Text>
      <Text mt={2} fontSize={'TMD'} fontWeight={400} color={'gray.700'}>
        {t('classObservation.formConfirmation.competenceView.subtitle')}
      </Text>

      <VStack space={6} mt={6} mb="8px">
        {competences.map((competency, i) => {
          const average = Math.floor(averageAnswersPerCompetence(competency));
          return (
            <VStack
              key={i}
              borderWidth={'1px'}
              borderRadius={'16px'}
              borderColor={'gray.200'}>
              <HStack
                py={3}
                px={4}
                alignItems={'center'}
                background={'gray.200'}
                borderTopLeftRadius={'16px'}
                borderTopRightRadius={'16px'}>
                <Text
                  flex={1}
                  fontSize={'TSM'}
                  fontWeight={400}
                  color={'gray.700'}>
                  {t(
                    'classObservation.formConfirmation.competenceView.overallRating',
                  )}
                </Text>
                <VStack alignItems={'flex-end'} space={1}>
                  <StarView
                    maxLength={competency.questions[0].scale}
                    value={
                      competency.questions[0].scale === 3
                        ? (averageConverter as any)[average]
                        : average
                    }
                  />
                  <Text
                    fontSize={'LSM'}
                    flex={1}
                    fontWeight={400}
                    color={'gray.600'}>
                    {tags[average - 1]?.label}
                  </Text>
                </VStack>
              </HStack>

              <VStack p={4}>
                <Text fontSize={'TMD'} fontWeight={700} color={'gray.700'}>
                  {t(competency.title)}
                </Text>

                <VStack mt={4} space={4}>
                  {competency.questions.map((question: Question) => (
                    <HStack key={question.id} alignItems={'center'}>
                      <VStack flex={1} space={1} mr={2}>
                        <Text
                          fontSize={'TSM'}
                          fontWeight={400}
                          color={'gray.700'}>
                          {t(question.title)}
                        </Text>
                        {question.description && (
                          <Text
                            fontSize={'TSM'}
                            fontWeight={400}
                            color={'gray.600'}>
                            {t(question.description)}
                          </Text>
                        )}
                      </VStack>

                      <StarView
                        maxLength={question.scale}
                        value={
                          question.scale === 3
                            ? (averageConverter as any)[
                                sumAnswersPerQuestions(question)
                              ]
                            : sumAnswersPerQuestions(question) || 0
                        }
                      />
                    </HStack>
                  ))}
                </VStack>
              </VStack>
            </VStack>
          );
        })}
      </VStack>
    </ScrollView>
  );
};

export default CompetenceView;
