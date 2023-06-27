import {
  Button,
  Input,
  ScrollView,
  Text,
  TextArea,
  VStack,
  Select,
  Box,
  Center,
} from 'native-base';
import React, {useContext} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import Routes from '../../../routes/paths';
import Navigation from '../../../services/navigation';
import {isTablet as Tablet} from 'react-native-device-info';
import {UserContext} from '../../../providers/contexts/UserContext';
import {useTranslation} from 'react-i18next';
import SelectModal from '../../../components/base/SelectModal';
import {TouchableOpacity} from 'react-native-gesture-handler';

const defaultValues = {
  students_count: '',
  subject: '',
  lesson_time: '',
  objective: '',
  class_type: '',
};

const ObservationSetup: React.FC<any> = () => {
  const {control, handleSubmit} = useForm({defaultValues});
  const {teacher} = useContext(UserContext);
  const {t} = useTranslation();
  const isTablet = Tablet();

  const handleSubmitForm: SubmitHandler<
    typeof defaultValues
  > = async values => {
    Navigation.navigate(Routes.classObservation.form, {
      session: {...values, teacher_id: teacher?.id},
    });
  };

  return (
    <VStack
      py={6}
      flex={1}
      bg={'gray.0'}
      safeAreaBottom
      px={isTablet ? '32px' : 4}>
      <ScrollView flexGrow={0}>
        <Text fontSize={'HSM'} fontWeight={600} color={'gray.800'}>
          {t('classObservation.setup.title') || 'About the lesson'}
        </Text>
        <Text mt={2} fontSize={'TMD'} fontWeight={400} color={'gray.800'}>
          {t('classObservation.setup.subtitle') ||
            'Ask the teacher the following questions'}
        </Text>

        <VStack space={4} mt={6}>
          <VStack space={2}>
            <Text fontSize={'TMD'} fontWeight={400} color={'gray.800'}>
              {t('classObservation.setup.questions.$0.title') ||
                'How many students are boys?'}
            </Text>

            <Controller
              control={control}
              rules={{required: true}}
              name={'class_type'}
              render={({field, fieldState: {error}}) => (
                <SelectModal
                  options={[
                    {label: 'All boys', value: 'All boys'},
                    {label: 'All girls', value: 'All girls'},
                    {label: 'Both', value: 'Both'},
                  ]}
                  isInvalid={!!error}
                  handleSelectValue={field.onChange}
                  placeholder={
                    t('classObservation.setup.questions.$0.placeholder') || '0'
                  }
                  value={field.value}
                  bottomTitle={t('classObservation.setup.questions.$0.title')}
                />
              )}
            />
          </VStack>

          <VStack space={2}>
            <Text fontSize={'TMD'} fontWeight={400} color={'gray.800'}>
              {t('classObservation.setup.questions.$1.title') ||
                'How many students are boys?'}
            </Text>

            <Controller
              control={control}
              rules={{required: true}}
              name={'students_count'}
              render={({field, fieldState: {error}}) => (
                <SelectModal
                  options={[
                    {label: '1 - 10', value: '1 - 10'},
                    {label: '10 - 30', value: '10 - 30'},
                    {label: '30 - 60', value: '30 - 60'},
                    {label: '60+', value: '60+'},
                  ]}
                  isInvalid={!!error}
                  handleSelectValue={field.onChange}
                  placeholder={
                    t('classObservation.setup.questions.$1.placeholder') || '15'
                  }
                  value={field.value}
                  bottomTitle={t('classObservation.setup.questions.$1.title')}
                />
              )}
            />
          </VStack>

          <VStack space={2}>
            <Text fontSize={'TMD'} fontWeight={400} color={'gray.800'}>
              {t('classObservation.setup.questions.$2.title')}
            </Text>

            <Controller
              control={control}
              rules={{required: false}}
              name={'subject'}
              render={({field, fieldState: {error}}) => (
                <Input
                  {...field}
                  onChangeText={field.onChange}
                  isInvalid={!!error}
                  variant={'outline'}
                  placeholder={
                    t('classObservation.setup.questions.$2.placeholder') ||
                    'Math'
                  }
                />
              )}
            />
          </VStack>

          <VStack space={2}>
            <Text fontSize={'TMD'} fontWeight={400} color={'gray.800'}>
              {t('classObservation.setup.questions.$3.title')}
            </Text>

            <Controller
              control={control}
              rules={{required: true}}
              name={'lesson_time'}
              render={({field, fieldState: {error}}) => (
                <SelectModal
                  options={[
                    {label: '25 mins', value: '25'},
                    {label: '30 mins', value: '30'},
                    {label: '35 mins', value: '35'},
                    {label: '40 mins', value: '40'},
                    {label: '45 mins', value: '45'},
                    {label: '50 mins', value: '50'},
                    {label: '55 mins', value: '55'},
                    {label: '60 mins', value: '60'},
                  ]}
                  isInvalid={!!error}
                  handleSelectValue={field.onChange}
                  placeholder={'25 mins'}
                  bottomTitle={t('classObservation.setup.questions.$3.title')}
                  value={field.value}
                />
              )}
            />
          </VStack>

          <VStack space={2}>
            <Text fontSize={'TMD'} fontWeight={400} color={'gray.800'}>
              {t('classObservation.setup.questions.$4.title') ||
                "Teacher's description of the class"}
            </Text>

            <Controller
              control={control}
              rules={{required: false}}
              name={'objective'}
              render={({field, fieldState: {error}}) => (
                <TextArea
                  {...field}
                  onChangeText={field.onChange}
                  isInvalid={!!error}
                  autoCompleteType={'off'}
                  variant={'outline'}
                  placeholder={
                    t('classObservation.setup.questions.$4.placeholder') ||
                    "Teacher's description of the class"
                  }
                />
              )}
            />
          </VStack>
        </VStack>
      </ScrollView>

      <Box marginTop={isTablet ? 6 : 'auto'}>
        <TouchableOpacity onPress={handleSubmit(handleSubmitForm)}>
          <Center
            variant={'solid'}
            borderRadius={'8px'}
            color={'white'}
            py={3}
            background={'primary.200'}>
            {t('classObservation.setup.button') || 'Next'}
          </Center>
        </TouchableOpacity>
      </Box>
    </VStack>
  );
};

export default ObservationSetup;
