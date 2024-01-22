import {
  Center,
  HStack,
  Image,
  KeyboardAvoidingView,
  Text,
  VStack,
  useTheme,
} from 'native-base';
import Page from '../../../components/Page';
import {LoginLogo} from '../../../assets/images/logos';
import InputText from '../../../components/InputText';
import Button from '../../../components/Button';
import {useState} from 'react';
import {useNavigate} from 'react-router-native';
import PathRoutes from '../../../routers/paths';
import Icon from '../../../components/Icon';
import {useTranslation} from 'react-i18next';
import {CoachService} from '../../../services/coach.service';
import {Platform} from 'react-native';

const LoginScreen: React.FC = () => {
  const [UserID, setUserID] = useState<{value: string; hasError: boolean}>();
  const navigate = useNavigate();
  const {t} = useTranslation();
  const theme = useTheme();

  const handleSubmitLogin = async () => {
    try {
      if (UserID?.value) {
        await CoachService.sendEmailOTP(UserID?.value.toLowerCase().trim());

        navigate(PathRoutes.login.otp.replace(':id', UserID.value));
      }
    } catch (err) {
      setUserID(user => ({value: user?.value || '', hasError: true}));
      console.log(err);
    }
  };

  return (
    <Page setting>
      <KeyboardAvoidingView
        flex={1}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Center flex={1}>
          <VStack>
            <Image source={LoginLogo} alt={'Logo of country'} mx="auto" />

            <Text mt={6} fontSize={'HSM'} fontWeight={600} color={'gray.800'}>
              {t('login.main.welcome')}
            </Text>
          </VStack>

          <VStack mt={8} maxW="320px">
            <Text fontSize={'LLG'} fontWeight={500} color={'gray.800'}>
              {t('login.main.user_id')}
            </Text>

            <InputText
              mt={2}
              placeholder={t('login.main.user_id_placeholder')}
              onChangeText={value => setUserID({hasError: false, value})}
              isInvalid={UserID?.hasError}
              value={UserID?.value || ''}
            />

            {UserID?.hasError && (
              <HStack mt={2} alignContent={'flex-start'} space={'4px'}>
                <Icon
                  name={'exclamation-circle-solid'}
                  size={18}
                  color={theme.colors.red['200']}
                />
                <Text fontSize={'TXS'} color={'red.200'} fontWeight={400}>
                  {t('login.main.error')}
                </Text>
              </HStack>
            )}

            <Button
              mt={4}
              onPress={handleSubmitLogin}
              disabled={!UserID?.value}>
              <Text
                color={!UserID?.value ? 'gray.600' : 'gray.0'}
                fontWeight={500}>
                {t('login.main.button')}
              </Text>
            </Button>
          </VStack>

          <HStack mt={6}>
            <Text fontSize={'LMD'} fontWeight={500} color={'gray.800'}>
              {t('login.main.create_account')}
            </Text>

            <Text
              fontSize={'LMD'}
              fontWeight={500}
              color={'primary.200'}
              onPress={() => navigate(PathRoutes.signup.main)}>
              {t('login.main.create_account_button')}
            </Text>
          </HStack>
        </Center>
      </KeyboardAvoidingView>
    </Page>
  );
};

export default LoginScreen;
