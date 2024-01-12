import React, {useState} from 'react';
import {HStack, ScrollView, Text, VStack, useToast} from 'native-base';
import {createAccountFormValidate} from '../../../helpers/validate.helper';
import {CoachService} from '../../../services/coach.service';
import {ImageService} from '../../../services/image.service';
import ImagePicker from '../../../components/ImagePicker';
import InputText from '../../../components/InputText';
import {useNavigate} from 'react-router-native';
import {useTranslation} from 'react-i18next';
import Button from '../../../components/Button';
import Page from '../../../components/Page';
import {Formik} from 'formik';
import Toast from '../../../components/Toast';
import PathRoutes from '../../../routers/paths';
import {useCoachContext} from '../../../providers/coach.provider';
import DatePicker from 'react-native-date-picker';

import {TouchableOpacity} from 'react-native';
import moment from 'moment';
import i18n from '../../../i18n';

export type FormValuesType = {
  name?: string;
  surname?: string;
  email?: string;
  phone?: string;
  birthdate?: Date;
};

const initialValues: FormValuesType = {
  name: '',
  surname: '',
  email: '',
  phone: '',
  birthdate: undefined,
};

const SignupScreen: React.FC = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const currentLanguage = i18n.languages[0];
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

    if (values && values.email) {
      await CoachService.create({} as any, {
        ...values,
        image_id,
      });

      navigate(PathRoutes.login.otp.replace(':id', values.email));
    }
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
                  {t('login.createAccount.email')}
                </Text>

                <InputText
                  value={values.email}
                  errorMessage={errors.email}
                  onChangeText={value =>
                    setFieldValue('email', value.toLowerCase().trim())
                  }
                />

                <Text
                  mb={2}
                  mt={4}
                  fontSize={'LMD'}
                  fontWeight={500}
                  color={'gray.700'}>
                  {t('login.createAccount.phone')}
                </Text>

                <InputText
                  value={values.phone}
                  keyboardType="phone-pad"
                  errorMessage={errors.phone}
                  onChangeText={value => setFieldValue('phone', value)}
                />

                <Text
                  mb={2}
                  mt={4}
                  fontSize={'LMD'}
                  fontWeight={500}
                  color={'gray.700'}>
                  {t('login.createAccount.birthdate')}
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    setOpenDatePicker(true);
                  }}>
                  <InputText
                    isReadOnly
                    value={
                      values?.birthdate
                        ? moment(values?.birthdate).format('MMM DD yyyy')
                        : undefined
                    }
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

export default SignupScreen;
