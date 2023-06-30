import React from 'react';
import {
  Input,
  ScrollView,
  Text,
  TextArea,
  VStack,
  Box,
  Center,
} from 'native-base';
import {useNavigate, useLocation} from 'react-router-native';
import SelectModal from '../../../components/SelectModal';
import PathRoutes from '../../../routers/paths';
import {TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import Page from '../../../components/Page';
import {Formik} from 'formik';

const defaultValues = {
  students_count: '',
  subject: '',
  lesson_time: '',
  objective: '',
  class_type: '',
};

const ClassObservationSetup: React.FC = () => {
  const {state} = useLocation();
  const navigate = useNavigate();
  const {t} = useTranslation();

  const handleSubmitForm = async (values: typeof defaultValues) => {
    navigate(PathRoutes.classObservation.form, {
      state: {...state, ...values},
    });
  };

  const validate = (values: typeof defaultValues): any => {
    let erros: any = {};
    if (!values.class_type) {
      erros.class_type = 'Required';
    }

    if (!values.students_count) {
      erros.students_count = 'Required';
    }

    if (!values.lesson_time) {
      erros.lesson_time = 'Required';
    }

    return erros;
  };

  return (
    <Formik
      validate={validate}
      onSubmit={handleSubmitForm}
      initialValues={defaultValues}>
      {({values, errors, handleSubmit, setFieldValue}) => (
        <Page back title={t('classObservation.title')}>
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

                <SelectModal
                  isInvalid={!!errors.class_type}
                  value={values.class_type}
                  handleSelectValue={value =>
                    setFieldValue('class_type', value)
                  }
                  options={[
                    {label: 'All boys', value: 'All boys'},
                    {label: 'All girls', value: 'All girls'},
                    {label: 'Both', value: 'Both'},
                  ]}
                  placeholder={
                    t('classObservation.setup.questions.$0.placeholder') || '0'
                  }
                  bottomTitle={t('classObservation.setup.questions.$0.title')}
                />
              </VStack>

              <VStack space={2}>
                <Text fontSize={'TMD'} fontWeight={400} color={'gray.800'}>
                  {t('classObservation.setup.questions.$1.title') ||
                    'How many students are boys?'}
                </Text>

                <SelectModal
                  options={[
                    {label: '1 - 10', value: '1 - 10'},
                    {label: '10 - 30', value: '10 - 30'},
                    {label: '30 - 60', value: '30 - 60'},
                    {label: '60+', value: '60+'},
                  ]}
                  isInvalid={!!errors.students_count}
                  handleSelectValue={value =>
                    setFieldValue('students_count', value)
                  }
                  placeholder={
                    t('classObservation.setup.questions.$1.placeholder') || '15'
                  }
                  value={values.students_count}
                  bottomTitle={t('classObservation.setup.questions.$1.title')}
                />
              </VStack>

              <VStack space={2}>
                <Text fontSize={'TMD'} fontWeight={400} color={'gray.800'}>
                  {t('classObservation.setup.questions.$2.title')}
                </Text>

                <Input
                  onChangeText={value => setFieldValue('subject', value)}
                  isInvalid={!!errors.subject}
                  variant={'outline'}
                  placeholder={
                    t('classObservation.setup.questions.$2.placeholder') ||
                    'Math'
                  }
                />
              </VStack>

              <VStack space={2}>
                <Text fontSize={'TMD'} fontWeight={400} color={'gray.800'}>
                  {t('classObservation.setup.questions.$3.title')}
                </Text>
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
                  isInvalid={!!errors.lesson_time}
                  handleSelectValue={value =>
                    setFieldValue('lesson_time', value)
                  }
                  placeholder={'25 mins'}
                  bottomTitle={t('classObservation.setup.questions.$3.title')}
                  value={values.lesson_time}
                />
              </VStack>

              <VStack space={2} mb="4px">
                <Text fontSize={'TMD'} fontWeight={400} color={'gray.800'}>
                  {t('classObservation.setup.questions.$4.title') ||
                    "Teacher's description of the class"}
                </Text>
                <TextArea
                  onChangeText={value => setFieldValue('objective', value)}
                  isInvalid={!!errors.objective}
                  autoCompleteType={'off'}
                  variant={'outline'}
                  placeholder={
                    t('classObservation.setup.questions.$4.placeholder') ||
                    "Teacher's description of the class"
                  }
                />
              </VStack>
            </VStack>
          </ScrollView>

          <Box marginTop={'auto'}>
            <TouchableOpacity onPress={() => handleSubmit()}>
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
        </Page>
      )}
    </Formik>
  );
};

export default ClassObservationSetup;
