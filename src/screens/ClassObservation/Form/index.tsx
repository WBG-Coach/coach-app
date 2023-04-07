import {
  Button,
  Center,
  HStack,
  Radio,
  Text,
  TextArea,
  VStack,
} from 'native-base';
import React from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {SimpleAccordion} from 'react-native-simple-accordion';
import Icon from '../../../components/base/Icon';
import {useBottomSheetProvider} from '../../../providers/contexts/BottomSheetContext';
import {IAnswer, IQuestion} from '../../../types';
import BottomSheetTooltip from './BottomSheetTooltip';
import MockCompetence from './consts';
import {isTablet as Tablet} from 'react-native-device-info';

const ObservationForm: React.FC<any> = () => {
  const [{}, {setBottomSheetContent}] = useBottomSheetProvider();
  const isTablet = Tablet();

  const questions = MockCompetence.reduce(
    (acc, item) => [...acc, ...item.questions],
    [] as IQuestion[],
  );

  const defaultValues = questions.reduce(
    (acc, item) => ({...acc, [item.id]: ''}),
    {} as {[key: string]: string},
  );

  const {control, handleSubmit} = useForm({
    defaultValues,
  });

  const options = ['Low', 'Medium', 'High'];

  const handleSubmitForm: SubmitHandler<typeof defaultValues> = values => {
    const answers: IAnswer[] = Object.keys(values).map((key, index) => ({
      id: index.toString(),
      question_id: key,
      value: values[key],
      session_id: 'example of same id =)',
    }));

    console.log('answers ->', answers);
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
              <SimpleAccordion
                key={competence.id}
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
                            field: {value, name, onChange},
                            fieldState,
                          }) => (
                            <VStack>
                              <HStack>
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
                                        content={question.tooltipData}
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

                              <Radio.Group
                                name={name}
                                accessibilityLabel="favorite number"
                                value={value}
                                flex={1}
                                mb={1}
                                onChange={onChange}>
                                <HStack
                                  mt={2}
                                  justifyContent={'space-evenly'}
                                  alignItems={'center'}>
                                  {options.map(option => (
                                    <VStack
                                      key={option}
                                      flex={1}
                                      alignItems={'center'}>
                                      <Text
                                        fontSize={'TXS'}
                                        fontWeight={400}
                                        color={'gray.600'}
                                        mb={1}>
                                        {option}
                                      </Text>
                                      <Radio
                                        isInvalid={!!fieldState.error}
                                        bg={'white'}
                                        aria-label={option}
                                        value={option}>
                                        <></>
                                      </Radio>
                                    </VStack>
                                  ))}
                                </HStack>
                              </Radio.Group>
                            </VStack>
                          )}
                        />
                      ))}
                  </VStack>
                }
              />
            ))}
          </VStack>

          <VStack py={4}>
            <Text fontSize={'TXL'} fontWeight={700} color={'gray.700'}>
              Key points to be discussed
            </Text>
            <Text mt={4} fontSize={'LLG'} fontWeight={500} color={'gray.700'}>
              What you want to discuss with the teacher?
            </Text>
            <TextArea
              mt={2}
              autoCompleteType={'off'}
              placeholder={'Positive and negative points'}
            />
            <Text mt={2} fontSize={'TXS'} fontWeight={400} color={'gray.600'}>
              Use this space for additional annotations that you'd like to
              discuss with the teacher
            </Text>
          </VStack>
        </ScrollView>
      </VStack>

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
  );
};

export default ObservationForm;
