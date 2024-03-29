import React from 'react';
import {ScrollView, Text, TextArea, VStack, Box} from 'native-base';
import {useNavigate, useLocation} from 'react-router-native';
import SelectModal from '../../../components/SelectModal';
import Button from '../../../components/Button';
import PathRoutes from '../../../routers/paths';
import {useTranslation} from 'react-i18next';
import Page from '../../../components/Page';
import {Formik} from 'formik';
import FieldError from '../../../components/FieldError';
import {COUNTRY} from '@env';

const ClassObservationSetup: React.FC = () => {
  const {state} = useLocation();
  const navigate = useNavigate();
  const {t} = useTranslation();

  const handleSubmitForm = async (values: typeof defaultValues) => {
    navigate(PathRoutes.classObservation.form, {
      state: {session: {...(state?.session ? state.session : {}), ...values}},
      replace: true,
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

  const classroomOptions = [
    t('classObservation.setup.questions.$1.options.$1'),
    t('classObservation.setup.questions.$1.options.$2'),
    t('classObservation.setup.questions.$1.options.$3'),
  ];

  const studentsOptions = [
    t('classObservation.setup.questions.$1.counters.$1'),
    t('classObservation.setup.questions.$1.counters.$2'),
    t('classObservation.setup.questions.$1.counters.$3'),
    t('classObservation.setup.questions.$1.counters.$4'),
  ];

  const timeOptions = [
    t('classObservation.setup.questions.$3.options.$1'),
    t('classObservation.setup.questions.$3.options.$2'),
    t('classObservation.setup.questions.$3.options.$3'),
    t('classObservation.setup.questions.$3.options.$4'),
    t('classObservation.setup.questions.$3.options.$5'),
    t('classObservation.setup.questions.$3.options.$6'),
    t('classObservation.setup.questions.$3.options.$7'),
    t('classObservation.setup.questions.$3.options.$8'),
  ];

  const subjectOptions =
    COUNTRY === 'np'
      ? [
          t(`teacher.subjects.np.$1`),
          t(`teacher.subjects.np.$2`),
          t(`teacher.subjects.np.$3`),
          t(`teacher.subjects.np.$4`),
          t(`teacher.subjects.np.$5`),
          t(`teacher.subjects.np.$6`),
          t(`teacher.subjects.np.$7`),
          t(`teacher.subjects.np.$8`),
        ]
      : [
          t(`teacher.subjects.sl.$1`),
          t(`teacher.subjects.sl.$2`),
          t(`teacher.subjects.sl.$3`),
          t(`teacher.subjects.sl.$4`),
          t(`teacher.subjects.sl.$5`),
          t(`teacher.subjects.sl.$6`),
          t(`teacher.subjects.sl.$7`),
          t(`teacher.subjects.sl.$8`),
          t(`teacher.subjects.sl.$9`),
          t(`teacher.subjects.sl.$10`),
        ];

  const defaultValues = {
    students_count: '',
    subject: '',
    lesson_time: '',
    objective: '',
    class_type: t('classObservation.setup.questions.$1.options.$1'),
  };

  return (
    <Formik
      validate={validate}
      onSubmit={handleSubmitForm}
      initialValues={state?.session ? state?.session : defaultValues}>
      {({values, errors, handleSubmit, setFieldValue, submitCount}) => (
        <Page back title={t('classObservation.title')}>
          <ScrollView flexGrow={0}>
            <Text fontSize={'HSM'} fontWeight={600} color={'gray.800'}>
              {t('classObservation.setup.title')}
            </Text>
            <Text mt={2} fontSize={'TMD'} fontWeight={400} color={'gray.800'}>
              {t('classObservation.setup.subtitle')}
            </Text>

            <VStack space={4} mt={6}>
              <VStack space={2}>
                <Text fontSize={'LLG'} fontWeight={500} color={'gray.800'}>
                  {t('classObservation.setup.questions.$0.title')}
                </Text>

                <SelectModal
                  isInvalid={!!errors.class_type && submitCount >= 1}
                  value={values.class_type}
                  handleSelectValue={value =>
                    setFieldValue('class_type', value)
                  }
                  options={classroomOptions.map(option => ({
                    value: option,
                    label: option,
                  }))}
                  placeholder={t(
                    'classObservation.setup.questions.$0.placeholder',
                  )}
                  bottomTitle={t('classObservation.setup.questions.$0.title')}
                />
                {!!errors.class_type && submitCount >= 1 && <FieldError />}
              </VStack>

              <VStack space={2}>
                <Text fontSize={'LLG'} fontWeight={500} color={'gray.800'}>
                  {t('classObservation.setup.questions.$1.title')}
                </Text>

                <SelectModal
                  options={studentsOptions.map(option => ({
                    value: option,
                    label: option,
                  }))}
                  isInvalid={!!errors.students_count && submitCount >= 1}
                  handleSelectValue={value =>
                    setFieldValue('students_count', value)
                  }
                  placeholder={t(
                    'classObservation.setup.questions.$1.placeholder',
                  )}
                  value={values.students_count}
                  bottomTitle={t('classObservation.setup.questions.$1.title')}
                />
                {!!errors.students_count && submitCount >= 1 && <FieldError />}
              </VStack>

              <VStack space={2}>
                <Text fontSize={'LLG'} fontWeight={500} color={'gray.800'}>
                  {t('classObservation.setup.questions.$2.title')}
                </Text>

                <SelectModal
                  options={subjectOptions.map(option => ({
                    value: option,
                    label: option,
                  }))}
                  handleSelectValue={value => setFieldValue('subject', value)}
                  placeholder={t(
                    'classObservation.setup.questions.$2.placeholder',
                  )}
                  bottomTitle={t('classObservation.setup.questions.$2.title')}
                  value={values.subject}
                />
              </VStack>

              <VStack space={2}>
                <Text fontSize={'LLG'} fontWeight={500} color={'gray.800'}>
                  {t('classObservation.setup.questions.$3.title')}
                </Text>
                <SelectModal
                  options={timeOptions.map(option => ({
                    value: option,
                    label: option,
                  }))}
                  isInvalid={!!errors.lesson_time && submitCount >= 1}
                  handleSelectValue={value =>
                    setFieldValue('lesson_time', value)
                  }
                  placeholder={t(
                    'classObservation.setup.questions.$3.placeholder',
                  )}
                  bottomTitle={t('classObservation.setup.questions.$3.title')}
                  value={values.lesson_time}
                />
                {!!errors.lesson_time && submitCount >= 1 && <FieldError />}
              </VStack>

              <VStack space={2} mb="4px">
                <Text fontSize={'LLG'} fontWeight={500} color={'gray.800'}>
                  {t('classObservation.setup.questions.$4.title')}
                </Text>
                <TextArea
                  onChangeText={value => setFieldValue('objective', value)}
                  isInvalid={!!errors.objective}
                  autoCompleteType={'off'}
                  variant={'outline'}
                  placeholder={t(
                    'classObservation.setup.questions.$4.placeholder',
                  )}
                />
              </VStack>
            </VStack>
          </ScrollView>

          <Box marginTop={'auto'} pt={3} bg={'white'}>
            <Button onPress={() => handleSubmit()}>
              {t('classObservation.setup.button')}
            </Button>
          </Box>
        </Page>
      )}
    </Formik>
  );
};

export default ClassObservationSetup;
