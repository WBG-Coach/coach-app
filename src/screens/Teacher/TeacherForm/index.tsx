import React, {useEffect, useRef, useState} from 'react';
import {
  Center,
  ScrollView,
  Text,
  VStack,
  Spinner,
  useToast,
  HStack,
  View,
} from 'native-base';
import {teacherFormValidate} from '../../../helpers/validate.helper';
import {useCoachContext} from '../../../providers/coach.provider';
import {TeacherService} from '../../../services/teacher.service';
import {ImageService} from '../../../services/image.service';
import {useNavigate, useParams} from 'react-router-native';
import ImagePicker from '../../../components/ImagePicker';
import SelectModal from '../../../components/SelectModal';
import InputText from '../../../components/InputText';
import Button from '../../../components/Button';
import Toast from '../../../components/Toast';
import {useTranslation} from 'react-i18next';
import Page from '../../../components/Page';
import {Formik, useFormik, useFormikContext} from 'formik';

import {TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-date-picker';
import i18n from '../../../i18n';

export type FormValuesType = {
  name?: string;
  surname?: string;
  subject?: string;
  birthdate?: Date;
  pin: string;
  nin: string;
};

let initialValues: FormValuesType = {
  name: '',
  surname: '',
  subject: '',
  birthdate: undefined,
  pin: '',
  nin: '',
};

const TeacherFormScreen: React.FC = () => {
  const toast = useToast();
  const {t} = useTranslation();
  const navigate = useNavigate();
  const params = useParams<{id: string}>();
  const isNew = params.id === 'new';
  const currentLanguage = i18n.languages[0];

  const [openDatePicker, setOpenDatePicker] = useState(false);

  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState<{
    id?: string;
    name: string;
    value: string;
  }>();

  const onSubmit = async (values: FormValuesType) => {
    const image_id = await createOrUpdateImage();

    if (isNew) {
      await TeacherService.create({
        ...values,
        image_id,
        school_id: currentSchool?.id,
      });
    } else {
      await TeacherService.update(params?.id || '', {
        ...values,
        image_id,
      });
    }

    toast.show({
      placement: 'top',
      render: () => (
        <Toast title={t('teacher.form.success')} icon="check-circle-solid" />
      ),
    });

    navigate(-1);
  };

  const {values, errors, handleSubmit, setFieldValue, setValues, resetForm} =
    useFormik({
      initialValues,
      onSubmit,
    });

  useEffect(() => {
    if (params?.id && params?.id !== 'new') {
      TeacherService.getTeacherToEdit(params.id).then(teacher => {
        initialValues.name = teacher.name;
        initialValues.surname = teacher.surname;
        initialValues.birthdate = teacher.birthdate;
        initialValues.subject = teacher.subject || '';

        if (teacher.image_id && teacher.image_name && teacher.image_value) {
          setProfileImage({
            id: teacher.image_id,
            name: teacher.image_name,
            value: teacher.image_value,
          });
        }

        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [params]);

  const {currentSchool} = useCoachContext();

  const createOrUpdateImage = () => {
    if (profileImage?.name && profileImage.value) {
      if (profileImage.id) {
        return ImageService.updateImage(
          profileImage.id,
          profileImage.name,
          profileImage.value,
        );
      } else {
        return ImageService.saveNewImage(profileImage.name, profileImage.value);
      }
    }
    return '';
  };

  if (loading) {
    return (
      <Center flex={1}>
        <Spinner size="lg" />
      </Center>
    );
  }

  const subjectOptions = [
    t('teacher.subjects.$1'),
    t('teacher.subjects.$2'),
    t('teacher.subjects.$3'),
    t('teacher.subjects.$4'),
    t('teacher.subjects.$5'),
    t('teacher.subjects.$6'),
    t('teacher.subjects.$7'),
    t('teacher.subjects.$8'),
    t('teacher.subjects.$9'),
    t('teacher.subjects.$10'),
  ];

  return (
    <Page
      back
      title={t(isNew ? 'teacher.form.title-new' : 'teacher.form.title-edit')}>
      <Formik
        onSubmit={onSubmit}
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={initialValues}
        validate={teacherFormValidate}>
        <>
          <ScrollView w={'100%'}>
            <ImagePicker
              image={profileImage}
              handleSelectImage={newImage =>
                setProfileImage({...profileImage, ...newImage})
              }
            />

            <VStack flex={1} mb={4}>
              <Text mb={2} fontSize={'LMD'} fontWeight={500} color={'gray.700'}>
                {t('teacher.form.name')}
              </Text>

              <InputText
                value={values.name}
                errorMessage={errors.name}
                onChangeText={value => setFieldValue('name', value)}
              />

              <Text
                mb={2}
                mt={4}
                fontSize={'LMD'}
                fontWeight={500}
                color={'gray.700'}>
                {t('teacher.form.surname')}
              </Text>
              <InputText
                value={values.surname}
                errorMessage={errors.surname}
                onChangeText={value => setFieldValue('surname', value)}
              />

              <Text
                mb={2}
                mt={4}
                fontSize={'LMD'}
                fontWeight={500}
                color={'gray.700'}>
                {t('teacher.form.birthdate')}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  setOpenDatePicker(true);
                }}>
                <InputText
                  isReadOnly
                  value={values.birthdate?.toDateString()}
                />
              </TouchableOpacity>

              <DatePicker
                modal
                locale={currentLanguage}
                open={openDatePicker}
                mode="date"
                date={values.birthdate || new Date()}
                onConfirm={date => {
                  setFieldValue('birthdate', date);
                  setOpenDatePicker(false);
                }}
                onCancel={() => {
                  setOpenDatePicker(false);
                }}
              />

              <VStack mt={4}>
                <HStack>
                  <Text
                    flex={1}
                    fontSize={'LMD'}
                    fontWeight={500}
                    color={'gray.700'}>
                    {t('teacher.form.pin')}
                  </Text>

                  <Text fontSize={'TXS'} fontWeight={400} color={'gray.700'}>
                    {t('common.optional')}
                  </Text>
                </HStack>
                <Text
                  mb={2}
                  fontSize={'TSM'}
                  fontWeight={400}
                  color={'gray.600'}>
                  {t('teacher.form.pin_description')}
                </Text>

                <InputText
                  value={values.pin}
                  errorMessage={errors.pin}
                  onChangeText={value => setFieldValue('pin', value)}
                  placeholder="0000-0-00000"
                />
              </VStack>

              <VStack mt={4}>
                <HStack>
                  <Text
                    flex={1}
                    fontSize={'LMD'}
                    fontWeight={500}
                    color={'gray.700'}>
                    {t('teacher.form.nin')}
                  </Text>

                  <Text fontSize={'TXS'} fontWeight={400} color={'gray.700'}>
                    {t('common.optional')}
                  </Text>
                </HStack>
                <Text
                  mb={2}
                  fontSize={'TSM'}
                  fontWeight={400}
                  color={'gray.600'}>
                  {t('teacher.form.nin_description')}
                </Text>

                <InputText
                  value={values.nin}
                  errorMessage={errors.nin}
                  onChangeText={value => setFieldValue('nin', value)}
                  placeholder="0000-0-00000"
                />
              </VStack>

              <Text
                mb={2}
                mt={4}
                fontSize={'LMD'}
                fontWeight={500}
                color={'gray.700'}>
                {t('teacher.form.subject')}
              </Text>

              <SelectModal
                value={values.subject}
                placeholder={t('teacher.form.subject')}
                bottomTitle={t('teacher.form.subject')}
                handleSelectValue={value => setFieldValue('subject', value)}
                options={subjectOptions.map(option => ({
                  value: option,
                  label: option,
                }))}
              />
            </VStack>
          </ScrollView>
          <Button mb={6} onPress={() => handleSubmit()}>
            {t(
              isNew
                ? 'teacher.form.new-teacher-button'
                : 'teacher.form.update-teacher-button',
            )}
          </Button>
        </>
      </Formik>
    </Page>
  );
};

export default TeacherFormScreen;
