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
import {CoachService} from '../../services/coach.service';
import {ImageService} from '../../services/image.service';
import ImagePicker from '../../components/ImagePicker';
import InputText from '../../components/InputText';
import {useNavigate} from 'react-router-native';
import {useTranslation} from 'react-i18next';
import Button from '../../components/Button';
import Page from '../../components/Page';
import {Formik} from 'formik';
import Toast from '../../components/Toast';
import PathRoutes from '../../routers/paths';
import {useCoachContext} from '../../providers/coach.provider';

export type FormValuesType = {
  name?: string;
  surname?: string;
};

const initialValues = {
  name: '',
  surname: '',
};

const CoachFormScreen: React.FC = () => {
  const toast = useToast();
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {selectCoach} = useCoachContext();
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

    const coach = await CoachService.create({...values, image_id});
    console.log(coach);
    await selectCoach(coach);

    navigate(PathRoutes.accountCreated, {replace: true});

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

export default CoachFormScreen;
