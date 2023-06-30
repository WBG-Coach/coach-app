import React from 'react';
import {useCoachContext} from '../../providers/coach.provider';
import InputPassword from '../../components/InputPassword';
import {LoginLogo} from '../../assets/images/logos';
import InputText from '../../components/InputText';
import {Center, Image, Text} from 'native-base';
import {useNavigate} from 'react-router-native';
import {useTranslation} from 'react-i18next';
import PathRoutes from '../../routers/paths';
import Button from '../../components/Button';
import Page from '../../components/Page';
import {Formik} from 'formik';

type LoginFormType = {username: string; password: string};

const initialValues = {
  username: '',
  password: '',
};

const LoginScreen: React.FC = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {login} = useCoachContext();

  const validate = (values: LoginFormType) => {
    let errors: any = {};

    if (!values.username) {
      errors.username = 'Required';
    }
    if (!values.password) {
      errors.password = 'Required';
    }
    return errors;
  };

  const handleLogin = async ({username, password}: LoginFormType) => {
    await login(username, password);
  };

  return (
    <Formik
      validate={validate}
      onSubmit={handleLogin}
      initialValues={initialValues}>
      {({values, errors, handleSubmit, setFieldValue}) => (
        <Page setting>
          <Center flex={1}>
            <Image
              mb="32px"
              h="120px"
              w="262px"
              source={LoginLogo}
              alt="Logo Coach Digital"
            />
            <Text
              w="full"
              mb="8px"
              fontSize="16px"
              color="gray.700"
              fontFamily="header">
              {t('login.username')}
            </Text>
            <InputText
              value={values.username}
              errorMessage={errors?.username}
              placeholder={t('login.username')}
              onChangeText={value => setFieldValue('username', value)}
            />

            <Text
              w="full"
              mt="16px"
              mb="8px"
              fontSize="16px"
              color="gray.700"
              fontFamily="header">
              {t('login.password')}
            </Text>
            <InputPassword
              value={values.password}
              errorMessage={errors?.password}
              placeholder={t('login.password')}
              onChangeText={value => setFieldValue('password', value)}
            />
          </Center>
          <Button onPress={() => handleSubmit()}>
            <Text fontSize="16px">{t('login.login-button')}</Text>
          </Button>
          <Button
            variant="outlined"
            onPress={() => navigate(PathRoutes.createAccount)}>
            <Text color="primary.200" fontSize="16px">
              {t('login.create-account')}
            </Text>
          </Button>
        </Page>
      )}
    </Formik>
  );
};

export default LoginScreen;
