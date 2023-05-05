import {Button, HStack, Text, TextArea, VStack, useTheme} from 'native-base';
import React, {useContext, useEffect, useMemo, useState} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from '../../../components/base/Icon';
import {IQuestion} from '../../../types';
import {isTablet as Tablet} from 'react-native-device-info';
import Navigation from '../../../services/navigation';
import Routes from '../../../routes/paths';
import Answer from '../../../database/models/Answer';
import {CompetenceContext} from '../../../providers/contexts/CompetencesContext';
import CompetenceAccordion from './CompetenceAccordion';
import Session from '../../../database/models/Session';

type Props = {
  route: {
    params: {
      session: Session;
    };
  };
};

const ObservationForm: React.FC<any> = ({route: {params}}: Props) => {
  const {competences} = useContext(CompetenceContext);
  const isTablet = Tablet();
  const theme = useTheme();

  const questions = useMemo(
    () =>
      competences.reduce(
        (acc, item) => [...acc, ...(item.questions as any)],
        [] as IQuestion[],
      ),
    [competences],
  );

  const defaultValues = useMemo(
    () =>
      questions.reduce(
        (acc, item) => ({...acc, [item.id]: undefined}),
        {} as {[key: string]: undefined | string},
      ),
    [questions],
  );

  const {control, handleSubmit, watch} = useForm({
    defaultValues: {...defaultValues, key_points: ''} as {
      [key: string]: undefined | string;
    },
  });

  const formValues = watch();

  const competenciesFinished = useMemo(
    () =>
      competences.reduce((acc, item) => {
        if (!item.questions.find(({id}) => !formValues[id])) {
          return [...acc, ...item.id];
        }
        return acc;
      }, [] as string[]),
    [competences, formValues],
  );

  const handleSubmitForm: SubmitHandler<
    typeof defaultValues
  > = async values => {
    const formData = Object.keys(values).reduce(
      (acc, item) => {
        if (item === 'key_points') {
          return {...acc, session: {[item]: values[item] as string}};
        } else {
          return {
            ...acc,
            answers: [
              ...acc.answers,
              {
                question_id: item,
                value: values[item],
              },
            ],
          };
        }
      },
      {answers: [], session: {}} as {
        answers: Partial<Answer>[];
        session: {[x: string]: string};
      },
    );

    Navigation.navigate(Routes.classObservation.formConfirmaton, {
      answers: formData.answers,
      session: {...params.session, ...formData.session},
    });
  };

  const CompetenceComponent = useMemo(
    () => (
      <>
        {competences.map((competence, index) => (
          <CompetenceAccordion
            key={competence.id}
            control={control}
            competence={competence}
            isFinished={competenciesFinished.includes(competence.id)}
            startCollapsed={index !== 0}
          />
        ))}
      </>
    ),
    [],
  );

  return (
    <VStack flex={1} py={6} safeAreaBottom bg={'gray.0'}>
      <VStack flex={1} px={isTablet ? '64px' : 4}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text fontSize={'HSM'} fontWeight={600} color={'gray.700'}>
            Class evaluation
          </Text>
          <Text mt={2} fontSize={'TMD'} fontWeight={400} color={'gray.700'}>
            Rate each topic with your observation
          </Text>

          <VStack>{CompetenceComponent}</VStack>

          <VStack py={4}>
            <Text fontSize={'TXL'} fontWeight={700} color={'gray.700'}>
              Key points to be discussed
            </Text>
            <Text mt={4} fontSize={'LLG'} fontWeight={500} color={'gray.700'}>
              What you want to discuss with the teacher?
            </Text>
            <Controller
              name={'key_points'}
              rules={{required: true}}
              control={control}
              render={({field: {value, onChange}, fieldState: {error}}) => (
                <TextArea
                  mt={2}
                  onChangeText={onChange}
                  value={value}
                  isInvalid={!!error}
                  autoCompleteType={'off'}
                  placeholder={'Positive and negative points'}
                />
              )}
            />

            <Text mt={2} fontSize={'TXS'} fontWeight={400} color={'gray.600'}>
              Use this space for additional annotations that you'd like to
              discuss with the teacher
            </Text>
          </VStack>
        </ScrollView>
      </VStack>

      <VStack w={'100%'}>
        <HStack
          alignItems={'center'}
          px={isTablet ? '64px' : 4}
          background={'gray.100'}
          borderRadius={'8px 8px 0px 0px'}
          py={1}
          space={1}>
          <Icon name="star" color={theme.colors.gray['600']} size={20} />
          <Text fontSize={'TSM'} fontWeight={400} color={'gray.600'}>
            {competenciesFinished.length} of {competences.length} competencies
            rated
          </Text>
        </HStack>
        <VStack
          px={isTablet ? '64px' : 4}
          background={'white'}
          pt={3}
          borderRadius={'8px 8px 0px 0px'}>
          <Button
            onPress={handleSubmit(handleSubmitForm)}
            marginTop={'auto'}
            variant={'solid'}
            borderRadius={'8px'}
            color={'white'}
            background={'primary.200'}>
            Finish observation
          </Button>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default ObservationForm;
