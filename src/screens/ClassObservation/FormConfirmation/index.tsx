import React from 'react';
import {IAnswer, IQuestion} from '../../../types';
import MockCompetence from '../Form/consts';
import {ICompetence} from '../../../types';
import {isTablet as Tablet} from 'react-native-device-info';
import {Button, HStack, ScrollView, Text, useTheme, VStack} from 'native-base';
import Icon from '../../../components/base/Icon';
import Navigation from '../../../services/navigation';
import StarView from '../../../components/StarView';

type Props = {
  route: {
    params: {
      answers: IAnswer[];
    };
  };
};

const FormConfirmation: React.FC<any> = ({route: {params}}: Props) => {
  const isTablet = Tablet();
  const theme = useTheme();

  const {answers} = params;
  const competencyFormatted = MockCompetence.reduce((acc, item) => {
    let questionsMax = 0;

    const questions = item.questions.map(question => {
      const value = parseInt(
        answers.find(answer => answer.question_id === question.id)?.value ||
          '0',
      );
      questionsMax += value;
      return {
        ...question,
        value,
      };
    }) as Array<IQuestion & {value: number}>;

    const competence = {
      ...item,
      questions: questions,
      overall_rating: Math.round(questionsMax / item.questions.length),
    };

    return [...acc, competence];
  }, [] as Array<ICompetence & {overall_rating: number; questions: Array<IQuestion & {value: number}>}>);

  return (
    <VStack flex={1} py={6} safeAreaBottom bg={'gray.0'}>
      <VStack flex={1} px={isTablet ? '64px' : 4}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text fontSize={'HSM'} fontWeight={600} color={'gray.700'}>
            Class observation summary
          </Text>
          <Text mt={2} fontSize={'TMD'} fontWeight={400} color={'gray.700'}>
            Review how you rated the class
          </Text>

          <VStack space={6} mt={6}>
            {competencyFormatted.map(competency => (
              <VStack
                key={competency.id}
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
                    Overall rating
                  </Text>
                  <VStack alignItems={'flex-end'} space={1}>
                    <StarView maxLength={5} value={competency.overall_rating} />
                    <Text
                      fontSize={'LSM'}
                      flex={1}
                      fontWeight={400}
                      color={'gray.600'}>
                      Doing great
                    </Text>
                  </VStack>
                </HStack>

                <VStack p={4}>
                  <Text fontSize={'TMD'} fontWeight={700} color={'gray.700'}>
                    {competency.title}
                  </Text>

                  <VStack mt={4} space={4}>
                    {competency.questions.map(question => (
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
                          maxLength={5}
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
      </VStack>

      <VStack w={'100%'}>
        <VStack
          px={isTablet ? '64px' : 4}
          background={'white'}
          pt={3}
          space={4}
          borderRadius={'8px 8px 0px 0px'}>
          <Button
            onPress={() => {}}
            marginTop={'auto'}
            variant={'solid'}
            borderRadius={'8px'}
            color={'white'}
            background={'primary.200'}>
            <HStack alignItems={'center'} space={2}>
              <Icon name={'check'} color={theme.colors.white} />
              <Text>Finish observation</Text>
            </HStack>
          </Button>

          <Button
            onPress={Navigation.goBack}
            marginTop={'auto'}
            variant={'outline'}
            borderRadius={'8px'}
            borderColor={'primary.200'}>
            <HStack alignItems={'center'} space={2}>
              <Icon name={'pen'} color={theme.colors.primary['200']} />
              <Text color={'primary.200'}>Edit evaluation</Text>
            </HStack>
          </Button>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default FormConfirmation;
