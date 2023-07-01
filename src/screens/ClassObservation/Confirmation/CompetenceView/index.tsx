import {HStack, ScrollView, Text, VStack} from 'native-base';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {getTags} from '../../../../components/StarsTag/common';
import StarView from '../../../../components/StarView';
import {Question} from '../../../../types/question';
import {Competence} from '../../../../types/competence';

const CompetenceView: React.FC<{
  competences: (Competence & {overall_rating: number})[];
}> = ({competences}) => {
  const {t} = useTranslation();
  const tags = getTags(t);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text fontSize={'HSM'} fontWeight={600} color={'gray.700'}>
        {t('classObservation.formConfirmation.competenceView.title') ||
          'Class observation summary'}
      </Text>
      <Text mt={2} fontSize={'TMD'} fontWeight={400} color={'gray.700'}>
        {t('classObservation.formConfirmation.competenceView.subtitle') ||
          'Review how you rated the class'}
      </Text>

      <VStack space={6} mt={6} mb="8px">
        {competences.map((competency, i) => (
          <VStack
            key={i}
            borderRadius={'16px'}
            borderWidth={'1px'}
            borderColor={'gray.200'}>
            <HStack
              borderTopLeftRadius={'16px'}
              borderTopRightRadius={'16px'}
              background={'gray.200'}
              alignItems={'center'}
              py={3}
              px={4}>
              <Text
                fontSize={'TSM'}
                flex={1}
                fontWeight={400}
                color={'gray.700'}>
                {t(
                  'classObservation.formConfirmation.competenceView.overallRating',
                ) || 'Overall rating'}
              </Text>
              <VStack alignItems={'flex-end'} space={1}>
                <StarView
                  maxLength={competency.questions[0].scale}
                  value={competency.overall_rating + 1}
                />
                <Text
                  fontSize={'LSM'}
                  flex={1}
                  fontWeight={400}
                  color={'gray.600'}>
                  {tags[competency.overall_rating]?.label}
                </Text>
              </VStack>
            </HStack>

            <VStack p={4}>
              <Text fontSize={'TMD'} fontWeight={700} color={'gray.700'}>
                {competency.title}
              </Text>

              <VStack mt={4} space={4}>
                {competency.questions.map((question: Question) => (
                  <HStack key={question.id} alignItems={'center'}>
                    <VStack flex={1} space={1} mr={2}>
                      <Text
                        fontSize={'TSM'}
                        fontWeight={400}
                        color={'gray.700'}>
                        {question.title}
                      </Text>
                      {question.description && (
                        <Text
                          fontSize={'TSM'}
                          fontWeight={400}
                          color={'gray.600'}>
                          {question.description}
                        </Text>
                      )}
                    </VStack>

                    <StarView
                      maxLength={question.scale}
                      value={(question as any).value}
                    />
                  </HStack>
                ))}
              </VStack>
            </VStack>
          </VStack>
        ))}
      </VStack>
    </ScrollView>
  );
};

export default CompetenceView;
