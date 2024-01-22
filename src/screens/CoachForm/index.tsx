import React, {useState} from 'react';
import {HStack, ScrollView, Text, VStack, useToast} from 'native-base';
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
import DatePicker from 'react-native-date-picker';

import {TouchableOpacity} from 'react-native';
import moment from 'moment';
import i18n from '../../i18n';

export type FormValuesType = {
  name?: string;
  surname?: string;
  pin?: string;
  nin?: string;
  phone?: string;
  email?: string;
  birthdate?: Date;
};

const initialValues: FormValuesType = {
  name: '',
  surname: '',
  pin: '',
  nin: '',
  birthdate: undefined,
};

const CoachFormScreen: React.FC = () => {
  const toast = useToast();
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const {currentSchool, selectCoach} = useCoachContext();
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

    if (currentSchool) {
      const coach = await CoachService.create(currentSchool, {
        ...values,
        image_id,
      });

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

                <VStack mt={4}>
                  <HStack>
                    <Text
                      flex={1}
                      fontSize={'LMD'}
                      fontWeight={500}
                      color={'gray.700'}>
                      {t('login.createAccount.pin')}
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
                    {t('login.createAccount.pin_description')}
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
                      {t('login.createAccount.nin')}
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
                    {t('login.createAccount.nin_description')}
                  </Text>

                  <InputText
                    value={values.nin}
                    errorMessage={errors.nin}
                    onChangeText={value => setFieldValue('nin', value)}
                    placeholder="0000-0-00000"
                  />
                </VStack>
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
