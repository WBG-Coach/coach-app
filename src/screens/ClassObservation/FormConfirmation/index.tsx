import React, {useContext, useState} from 'react';
import {IAnswer} from '../../../types';
import {ICompetence} from '../../../types';
import {isTablet as Tablet} from 'react-native-device-info';
import {Button, HStack, ScrollView, Text, useTheme, VStack} from 'native-base';
import Icon from '../../../components/base/Icon';
import Navigation from '../../../services/navigation';
import StarView from '../../../components/StarView';
import Routes from '../../../routes/paths';
import Answer from '../../../database/models/Answer';
import {getWatermelon} from '../../../database';
import {CompetenceContext} from '../../../providers/contexts/CompetencesContext';
import Question from '../../../database/models/Question';
import Session from '../../../database/models/Session';
import {UserContext} from '../../../providers/contexts/UserContext';

type Props = {
  route: {
    params: {
      answers: IAnswer[];
      session: Session;
    };
  };
};

const FormConfirmation: React.FC<any> = ({route: {params}}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const {competences} = useContext(CompetenceContext);
  const {user} = useContext(UserContext);
  const isTablet = Tablet();
  const theme = useTheme();

  const {session, answers} = params;
  const competencyFormatted = competences.reduce((acc, item) => {
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
    }) as Array<Question & {value: number}>;

    const competence = {
      ...item,
      questions: questions,
      overall_rating: Math.round(questionsMax / item.questions.length),
    };

    return [...acc, competence];
  }, [] as Array<ICompetence & {overall_rating: number; questions: Array<Question & {value: number}>}>);

  const handlePressContinue = async () => {
    const db = await getWatermelon();
    /*     setIsLoading(true); */

    const {_raw} = await db.write(
      async () =>
        await db.collections.get<Session>('session').create(record => {
          record.session_status = '';
          record.boys_count = session.boys_count;
          record.girls_count = session.girls_count;
          record.subject = session.subject;
          record.lesson_time = session.lesson_time;
          record.objective = session.objective;
          record.school_id = user?.school?.id;
          record.coach_id = user?.id;
          record.key_points = session.key_points;
        }),
    );

    await Promise.all(
      answers?.map(
        async answer =>
          await db.write(
            async () =>
              await db.collections.get<Answer>('answer').create(record => {
                record.value = answer.value;
                record.question_id = answer.question_id;
                record.session_id = _raw.id;
              }),
          ),
      ),
    );

    /*     Navigation.navigate(Routes.classObservation.observationCompleted); */
  };

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
            {competencyFormatted.map((competency, i) => (
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

      <VStack
        w={'100%'}
        px={isTablet ? '64px' : 4}
        background={'white'}
        pt={3}
        space={4}
        borderRadius={'8px 8px 0px 0px'}>
        <Button
          onPress={handlePressContinue}
          marginTop={'auto'}
          variant={'solid'}
          borderRadius={'8px'}
          color={'white'}
          isLoading={isLoading}
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
          isLoading={isLoading}
          borderColor={'primary.200'}>
          <HStack alignItems={'center'} space={2}>
            <Icon name={'pen'} color={theme.colors.primary['200']} />
            <Text color={'primary.200'}>Edit evaluation</Text>
          </HStack>
        </Button>
      </VStack>
    </VStack>
  );
};

export default FormConfirmation;
