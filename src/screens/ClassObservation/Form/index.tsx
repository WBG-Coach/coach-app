import {
  Button,
  Center,
  HStack,
  Text,
  TextArea,
  VStack,
  useTheme,
  Box,
} from 'native-base';
import React from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {SimpleAccordion} from 'react-native-simple-accordion';
import Icon from '../../../components/base/Icon';
import {useBottomSheetProvider} from '../../../providers/contexts/BottomSheetContext';
import {IQuestion} from '../../../types';
import BottomSheetTooltip from './BottomSheetTooltip';
import MockCompetence from './consts';
import {isTablet as Tablet} from 'react-native-device-info';
import StarRating from '../../../components/base/StarRating';
import Navigation from '../../../services/navigation';
import Routes from '../../../routes/paths';
import Answer from '../../../database/models/Answer';

const ObservationForm: React.FC<any> = () => {
  const [{}, {setBottomSheetContent}] = useBottomSheetProvider();
  const isTablet = Tablet();
  const theme = useTheme();

  const questions = MockCompetence.reduce(
    (acc, item) => [...acc, ...item.questions],
    [] as IQuestion[],
  );

  const defaultValues = questions.reduce(
    (acc, item) => ({...acc, [item.id]: undefined}),
    {} as {[key: string]: undefined | string},
  );

  const {control, handleSubmit, watch} = useForm({
    defaultValues: {...defaultValues, points: ''} as {
      [key: string]: undefined | string;
    },
  });

  const formValues = watch();

  const competenciesFinished = MockCompetence.reduce((acc, item) => {
    if (!item.questions.find(({id}) => !formValues[id])) {
      return [...acc, ...item.id];
    }

    return acc;
  }, [] as string[]);

  const handleSubmitForm: SubmitHandler<
    typeof defaultValues
  > = async values => {
    const answers: Partial<Answer>[] = Object.keys(values).map(
      (key, index) => ({
        id: index.toString(),
        question_id: key,
        value: values[key]?.toString() || '',
        session_id: 'example of same id =)',
      }),
    );

    Navigation.navigate(Routes.classObservation.formConfirmaton, {answers});
  };

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

          <VStack>
            {MockCompetence.map((competence, index) => (
              <Box key={competence.id} position={'relative'}>
                {competenciesFinished.includes(competence.id) && (
                  <Center
                    position={'absolute'}
                    zIndex={10}
                    top={5}
                    right={10}
                    background={'green.200'}
                    w={'20px'}
                    h={'20px'}
                    borderRadius={'10px'}>
                    <Icon name={'check'} color={theme.colors.white} size={16} />
                  </Center>
                )}

                <SimpleAccordion
                  title={competence.title}
                  startCollapsed={index !== 0}
                  bannerStyle={{
                    backgroundColor: 'white',
                    paddingHorizontal: 0,
                    paddingVertical: 0,
                  }}
                  viewContainerStyle={{
                    shadowColor: 'white',
                    paddingHorizontal: 0,
                    paddingVertical: 0,
                  }}
                  viewInside={
                    <VStack space={4}>
                      {questions
                        .filter(
                          question => question.competence_id === competence.id,
                        )
                        .map(question => (
                          <Controller
                            key={question.id}
                            name={question.id}
                            rules={{required: true}}
                            control={control}
                            render={({
                              field: {value, onChange},
                              fieldState: {error},
                            }) => (
                              <VStack>
                                <HStack mb={1}>
                                  <VStack flex={1}>
                                    <Text
                                      fontSize={'LMD'}
                                      fontWeight={500}
                                      color={'gray.700'}>
                                      {question.title}
                                    </Text>

                                    {question.description && (
                                      <Text
                                        mt={'1'}
                                        fontSize={'TXS'}
                                        fontWeight={400}
                                        color={'gray.600'}>
                                        {question.description}
                                      </Text>
                                    )}
                                  </VStack>

                                  <TouchableOpacity
                                    onPress={() =>
                                      setBottomSheetContent(
                                        <BottomSheetTooltip
                                          content={question.tooltip_data}
                                        />,
                                      )
                                    }>
                                    <Center
                                      background={'primary.200'}
                                      borderRadius={'10px'}
                                      width={'20px'}
                                      height={'20px'}>
                                      <Icon color="white" name="question" />
                                    </Center>
                                  </TouchableOpacity>
                                </HStack>

                                <StarRating
                                  value={parseInt(value || '0')}
                                  onPress={onChange}
                                  isInvalid={!!error}
                                />
                              </VStack>
                            )}
                          />
                        ))}
                    </VStack>
                  }
                />
              </Box>
            ))}
          </VStack>

          <VStack py={4}>
            <Text fontSize={'TXL'} fontWeight={700} color={'gray.700'}>
              Key points to be discussed
            </Text>
            <Text mt={4} fontSize={'LLG'} fontWeight={500} color={'gray.700'}>
              What you want to discuss with the teacher?
            </Text>
            <Controller
              name={'points'}
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
            {competenciesFinished.length} of {MockCompetence.length}{' '}
            competencies rated
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
