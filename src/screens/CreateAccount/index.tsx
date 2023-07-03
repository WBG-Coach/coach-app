import React, {useState} from 'react';
import {
  Center,
  ScrollView,
  Text,
  VStack,
  Image,
  Modal,
  useToast,
} from 'native-base';
import {createAccountFormValidate} from '../../helpers/validate.helper';
import InputPassword from '../../components/InputPassword';
import {CoachService} from '../../services/coach.service';
import {ImageService} from '../../services/image.service';
import ImagePicker from '../../components/ImagePicker';
import InputText from '../../components/InputText';
import {useNavigate} from 'react-router-native';
import {TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import Page from '../../components/Page';
import {Formik} from 'formik';
import Toast from '../../components/Toast';

export type FormValuesType = {
  name?: string;
  surname?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
};

const initialValues = {
  name: '',
  surname: '',
  username: '',
  password: '',
  confirmPassword: '',
};

const CreateAccountScreen: React.FC = () => {
  const toast = useToast();
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState<{
    name: string;
    value: string;
  }>();

  const onSubmit = async (values: FormValuesType) => {
    let image_id = '';
    if (profileImage?.name && profileImage.value) {
      image_id = await ImageService.saveNewImage(
        profileImage.name,
        profileImage.value,
      );
    }
    await CoachService.create({...values, image_id});

    navigate(-1);

    toast.show({
      placement: 'top',
      render: () => (
        <Toast
          title={t('login.createAccount.success')}
          icon="check-circle-solid"
        />
      ),
    });
  };

  return (
    <Page back title={t('login.createAccount.title')}>
      <Formik
        onSubmit={onSubmit}
        validateOnChange={false}
        enableReinitialize={true}
        initialValues={initialValues}
        validate={createAccountFormValidate}>
        {({values, errors, isSubmitting, handleSubmit, setFieldValue}) => (
          <>
            <ScrollView w={'100%'}>
              <ImagePicker
                image={profileImage}
                handleSelectImage={setProfileImage}
              />

              <VStack flex={1} mb={4}>
                <Text
                  mb={2}
                  fontSize={'LMD'}
                  fontWeight={500}
                  color={'gray.700'}>
                  {t('login.createAccount.name')}
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
                  {t('login.createAccount.surname')}
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
                  {t('login.createAccount.username')}
                </Text>
                <InputText
                  value={values.username}
                  errorMessage={errors.username}
                  onChangeText={value => setFieldValue('username', value)}
                />

                <Text
                  mb={2}
                  mt={4}
                  fontSize={'LMD'}
                  fontWeight={500}
                  color={'gray.700'}>
                  {t('login.createAccount.password')}
                </Text>
                <InputPassword
                  value={values.password}
                  errorMessage={errors.password}
                  onChangeText={value => setFieldValue('password', value)}
                />

                <Text
                  mb={2}
                  mt={4}
                  fontSize={'LMD'}
                  fontWeight={500}
                  color={'gray.700'}>
                  {t('login.createAccount.confirm-password')}
                </Text>
                <InputPassword
                  value={values.confirmPassword}
                  errorMessage={errors.confirmPassword}
                  onChangeText={value =>
                    setFieldValue('confirmPassword', value)
                  }
                />
              </VStack>
            </ScrollView>
            <Button
              mb={6}
              isLoading={isSubmitting}
              onPress={() => handleSubmit()}>
              {t('login.createAccount.create-account-button')}
            </Button>
          </>
        )}
      </Formik>
    </Page>
  );
};

export default CreateAccountScreen;
