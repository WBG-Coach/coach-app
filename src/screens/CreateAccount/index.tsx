import React, {useState} from 'react';
import {Center, ScrollView, Text, VStack, Image, Modal} from 'native-base';
import {CoachService} from '../../services/session.service';
import InputPassword from '../../components/InputPassword';
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

type FormValuesType = {
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
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [profileImage, setProfileImage] = useState<{
    name: string;
    value: string;
  }>();

  const validate = (values: FormValuesType) => {
    let errors: any = {};

    if (!values.name) {
      errors.name = 'Required';
    }
    if (!values.surname) {
      errors.surname = 'Required';
    }
    if (!values.username) {
      errors.username = 'Required';
    }
    if (!values.password) {
      errors.password = 'Required';
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Required';
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    return errors;
  };

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
  };

  return (
    <Page back title={t('login.createAccount.title')}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validate}>
        {({values, errors, handleSubmit, setFieldValue}) => (
          <>
            <ScrollView w={'100%'}>
              <Center w={'100%'} my={6}>
                <VStack alignItems={'center'} space={1}>
                  <Center
                    background={'primary.100'}
                    w={'56px'}
                    h={'56px'}
                    borderRadius={'500px'}>
                    {profileImage ? (
                      <Image
                        src={profileImage?.value}
                        w={'56px'}
                        h={'56px'}
                        borderRadius={'500px'}
                        alt={'User image'}
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
            <Button mb={6} onPress={() => handleSubmit()}>
              {t('login.createAccount.create-account-button')}
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
            handleSelectImage={setProfileImage}
          />
        </VStack>
      </Modal>
    </Page>
  );
};

export default CreateAccountScreen;
