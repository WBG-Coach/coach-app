import {isTablet as Tablet} from 'react-native-device-info';
import {
  Box,
  Button,
  Center,
  HStack,
  Input,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import React, {useState} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import Teacher from '../../../database/models/Teacher';
import Icon from '../../../components/base/Icon';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import moment from 'moment';

const defaultValues = {} as Teacher;

const TeacherCreateScreen: React.FC = () => {
  const {control, handleSubmit} = useForm({defaultValues});
  const isTablet = Tablet();

  const handleSubmitTeacher: SubmitHandler<
    typeof defaultValues
  > = async values => {
    console.log(values);
    //do logic to create teacher
  };

  return (
    <VStack
      safeAreaBottom
      my={isTablet ? '64px' : 6}
      px={isTablet ? '64px' : 4}
      flex={1}>
      <ScrollView>
        <Text fontSize={'HSM'} fontWeight={600} color={'gray.700'}>
          Add a new teacher
        </Text>
        <Center w={'100%'} my={6}>
          <VStack alignItems={'center'} space={1}>
            <Center
              background={'primary.100'}
              w={'56px'}
              h={'56px'}
              borderRadius={'500px'}>
              <Icon name={'user'} />
            </Center>

            <Text fontSize={'LMD'} fontWeight={500} color={'primary.200'}>
              Take/choose photo
            </Text>
          </VStack>
        </Center>

        <VStack space={4} flex={1} mb={4}>
          <Controller
            control={control}
            name={'name'}
            rules={{required: true}}
            render={({field, fieldState: {error}}) => (
              <VStack space={2}>
                <Text fontSize={'LMD'} fontWeight={500} color={'gray.700'}>
                  First name
                </Text>
                <Input
                  {...field}
                  onChangeText={field.onChange}
                  isInvalid={!!error}
                  variant={'outline'}
                />
              </VStack>
            )}
          />

          <Controller
            control={control}
            name={'surname'}
            rules={{required: true}}
            render={({field, fieldState: {error}}) => (
              <VStack space={2}>
                <Text fontSize={'LMD'} fontWeight={500} color={'gray.700'}>
                  Last name
                </Text>
                <Input
                  {...field}
                  onChangeText={field.onChange}
                  isInvalid={!!error}
                  variant={'outline'}
                  keyboardType={'web-search'}
                />
              </VStack>
            )}
          />

          <Controller
            control={control}
            name={'emis_number'}
            rules={{required: true}}
            render={({field, fieldState: {error}}) => (
              <VStack space={2}>
                <Text fontSize={'LMD'} fontWeight={500} color={'gray.700'}>
                  EMIS number
                </Text>
                <Input
                  {...field}
                  onChangeText={field.onChange}
                  isInvalid={!!error}
                  variant={'outline'}
                  placeholder={'000000000'}
                  keyboardType={'number-pad'}
                />
              </VStack>
            )}
          />

          <Controller
            control={control}
            name={'subject'}
            rules={{required: true}}
            render={({field, fieldState: {error}}) => (
              <VStack space={2}>
                <Text fontSize={'LMD'} fontWeight={500} color={'gray.700'}>
                  Principal subject
                </Text>
                <Input
                  {...field}
                  onChangeText={field.onChange}
                  isInvalid={!!error}
                  variant={'outline'}
                  placeholder={'e.g. Math'}
                />
              </VStack>
            )}
          />

          <Controller
            control={control}
            name={'birthdate'}
            rules={{required: true}}
            render={({field, fieldState: {error}}) => (
              <VStack space={2}>
                <Text fontSize={'LMD'} fontWeight={500} color={'gray.700'}>
                  Date of birth
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    DateTimePickerAndroid.open({
                      value: field.value ? new Date(field.value) : new Date(),
                      onChange: e => field.onChange(e.nativeEvent.timestamp),
                      mode: 'date',
                      is24Hour: true,
                    });
                  }}>
                  <HStack
                    w={'100%'}
                    borderWidth={'1px'}
                    borderColor={'gray.300'}
                    borderRadius={'8px'}
                    p={4}
                    py={3}>
                    <Text
                      fontSize={'TSM'}
                      fontWeight={400}
                      color={field.value ? 'gray.700' : 'gray.400'}>
                      {field.value
                        ? moment(new Date(field.value))
                            .format('MM/DD/YYYY')
                            .toString()
                        : 'MM/DD/YYY'}
                    </Text>
                  </HStack>
                </TouchableOpacity>
              </VStack>
            )}
          />
        </VStack>
      </ScrollView>

      <Button
        variant={'solid'}
        borderRadius={'8px'}
        color={'white'}
        background={'primary.200'}
        onPress={handleSubmit(handleSubmitTeacher)}>
        Add teacher
      </Button>
    </VStack>
  );
};

export default TeacherCreateScreen;
