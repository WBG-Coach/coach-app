import React, {useEffect, useState} from 'react';
import {
  Center,
  ScrollView,
  Text,
  VStack,
  Image,
  Modal,
  Spinner,
  useToast,
} from 'native-base';
import {teacherFormValidate} from '../../../helpers/validate.helper';
import {useCoachContext} from '../../../providers/coach.provider';
import {TeacherService} from '../../../services/teacher.service';
import {ImageService} from '../../../services/image.service';
import {useNavigate, useParams} from 'react-router-native';
import ImagePicker from '../../../components/ImagePicker';
import InputText from '../../../components/InputText';
import Button from '../../../components/Button';
import {TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import Icon from '../../../components/Icon';
import Page from '../../../components/Page';
import {Formik} from 'formik';
import Toast from '../../../components/Toast';

export type FormValuesType = {
  name?: string;
  surname?: string;
  subject?: string;
  birthdate?: Date;
  emis_number?: string;
};

let initialValues: FormValuesType = {
  name: '',
  surname: '',
  subject: '',
  emis_number: '',
  birthdate: undefined,
};

const TeacherFormScreen: React.FC = () => {
  const toast = useToast();
  const {t} = useTranslation();
  const navigate = useNavigate();
  const params = useParams<{id: string}>();
  const [loading, setLoading] = useState(true);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [profileImage, setProfileImage] = useState<{
    id?: string;
    name: string;
    value: string;
  }>();
  const isNew = params.id === 'new';

  useEffect(() => {
    if (params?.id && params?.id !== 'new') {
      TeacherService.getTeacherToEdit(params.id).then(teacher => {
        initialValues.name = teacher.name;
        initialValues.surname = teacher.surname;
        initialValues.subject = teacher.subject || '';
        initialValues.emis_number = teacher.emis_number || '';

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

  const {currentSchool, addTeacherInCurrentSchool} = useCoachContext();

  const onSubmit = async (values: FormValuesType) => {
    const image_id = await createOrUpdateImage();

    if (isNew) {
      await TeacherService.create({
        ...values,
        image_id,
        school_id: currentSchool?.id,
      });
      addTeacherInCurrentSchool();
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
        {({values, errors, handleSubmit, setFieldValue}) => (
          <>
            <ScrollView w={'100%'}>
              <Center w={'100%'} my={6}>
                <VStack alignItems={'center'} space={1}>
                  <Center
                    w={'56px'}
                    h={'56px'}
                    borderRadius={'500px'}
                    background={'primary.100'}>
                    {profileImage ? (
                      <Image
                        w={'56px'}
                        h={'56px'}
                        alt={'User image'}
                        borderRadius={'500px'}
                        src={profileImage?.value}
                      />
                    ) : (
                      <Icon name={'user'} />
                    )}
                  </Center>

                  <TouchableOpacity onPress={() => setShowImagePicker(true)}>
                    <Text
                      fontSize={'LMD'}
                      fontWeight={500}
                      color={'primary.200'}>
                      {t('login.createAccount.takePhoto')}
                    </Text>
                  </TouchableOpacity>
                </VStack>
              </Center>

              <VStack flex={1} mb={4}>
                <Text
                  mb={2}
                  fontSize={'LMD'}
                  fontWeight={500}
                  color={'gray.700'}>
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
                  {t('teacher.form.emis_number')}
                </Text>
                <InputText
                  value={values.emis_number}
                  errorMessage={errors.emis_number}
                  onChangeText={value => setFieldValue('emis_number', value)}
                />

                <Text
                  mb={2}
                  mt={4}
                  fontSize={'LMD'}
                  fontWeight={500}
                  color={'gray.700'}>
                  {t('teacher.form.subject')}
                </Text>
                <InputText
                  value={values.subject}
                  errorMessage={errors.subject}
                  onChangeText={value => setFieldValue('subject', value)}
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
        )}
      </Formik>

      <Modal
        isOpen={showImagePicker}
        justifyContent="flex-end"
        onClose={() => setShowImagePicker(false)}>
        <VStack bg="white" w="full">
          <ImagePicker
            handleClose={() => setShowImagePicker(false)}
            handleSelectImage={newImage =>
              setProfileImage({...profileImage, ...newImage})
            }
          />
        </VStack>
      </Modal>
    </Page>
  );
};

export default TeacherFormScreen;
