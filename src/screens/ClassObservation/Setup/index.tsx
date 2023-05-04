import {Button, Input, ScrollView, Text, TextArea, VStack} from 'native-base';
import React from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import Routes from '../../../routes/paths';
import Navigation from '../../../services/navigation';
import {isTablet as Tablet} from 'react-native-device-info';
import {getWatermelon} from '../../../database';
import Session from '../../../database/models/Session';
import {v4 as uuidv4} from 'uuid';
import {RecordId} from '@nozbe/watermelondb';

const defaultValues = {
  boys_count: '',
  girls_count: '',
  subject: '',
  lesson_time: '',
  objective: '',
};

const ObservationSetup: React.FC<any> = () => {
  const {control, handleSubmit} = useForm({defaultValues});
  const isTablet = Tablet();

  const handleSubmitForm: SubmitHandler<
    typeof defaultValues
  > = async values => {
    Navigation.navigate(Routes.classObservation.form, {session: values});
  };

  return (
    <VStack
      flex={1}
      px={isTablet ? '64px' : 4}
      py={6}
      safeAreaBottom
      bg={'gray.0'}>
      <ScrollView flexGrow={0}>
        <Text fontSize={'HSM'} fontWeight={600} color={'gray.800'}>
          About the lesson
        </Text>
        <Text mt={2} fontSize={'TMD'} fontWeight={400} color={'gray.800'}>
          Ask the teacher the following questions
        </Text>

        <VStack space={4} mt={6}>
          <VStack space={2}>
            <Text fontSize={'TMD'} fontWeight={400} color={'gray.800'}>
              How many students are boys?
            </Text>

            <Controller
              control={control}
              name={'boys_count'}
              render={({field, fieldState: {error}}) => (
                <Input
                  {...field}
                  onChangeText={field.onChange}
                  isInvalid={!!error}
                  placeholder={'15'}
                  variant={'outline'}
                  keyboardType={'number-pad'}
                />
              )}
            />
          </VStack>

          <VStack space={2}>
            <Text fontSize={'TMD'} fontWeight={400} color={'gray.800'}>
              How many students are girls?
            </Text>

            <Controller
              control={control}
              name={'girls_count'}
              render={({field, fieldState: {error}}) => (
                <Input
                  {...field}
                  onChangeText={field.onChange}
                  isInvalid={!!error}
                  placeholder={'15'}
                  variant={'outline'}
                  keyboardType={'number-pad'}
                />
              )}
            />
          </VStack>

          <VStack space={2}>
            <Text fontSize={'TMD'} fontWeight={400} color={'gray.800'}>
              What's the subject?
            </Text>

            <Controller
              control={control}
              name={'subject'}
              render={({field, fieldState: {error}}) => (
                <Input
                  {...field}
                  onChangeText={field.onChange}
                  isInvalid={!!error}
                  variant={'outline'}
                  placeholder={'Math'}
                />
              )}
            />
          </VStack>

          <VStack space={2}>
            <Text fontSize={'TMD'} fontWeight={400} color={'gray.800'}>
              How long the lesson’s going to last?
            </Text>

            <Controller
              control={control}
              name={'lesson_time'}
              render={({field, fieldState: {error}}) => (
                <Input
                  {...field}
                  onChangeText={field.onChange}
                  isInvalid={!!error}
                  variant={'outline'}
                  placeholder={'30 min'}
                />
              )}
            />
          </VStack>

          <VStack space={2}>
            <Text fontSize={'TMD'} fontWeight={400} color={'gray.800'}>
              Teacher's description of the class
            </Text>

            <Controller
              control={control}
              name={'objective'}
              render={({field, fieldState: {error}}) => (
                <TextArea
                  {...field}
                  onChangeText={field.onChange}
                  isInvalid={!!error}
                  autoCompleteType={'off'}
                  variant={'outline'}
                  placeholder={"Teacher's description of the class"}
                />
              )}
            />
          </VStack>
        </VStack>
        <Text my={2} fontSize={'TXS'} fontWeight={400} color={'gray.600'}>
          Ask the teacher the following questions
        </Text>
      </ScrollView>

      <Button
        marginTop={isTablet ? 6 : 'auto'}
        variant={'solid'}
        borderRadius={'8px'}
        color={'white'}
        background={'primary.200'}
        onPress={handleSubmit(handleSubmitForm)}>
        Next
      </Button>
    </VStack>
  );
};

export default ObservationSetup;
