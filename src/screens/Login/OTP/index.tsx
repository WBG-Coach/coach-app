import {Box, HStack, Text, VStack, useTheme} from 'native-base';
import Page from '../../../components/Page';
import {useNavigate, useParams} from 'react-router-native';
import Button from '../../../components/Button';
import {useState} from 'react';
import PinInput from '../../../components/PinInput';
import PathRoutes from '../../../routers/paths';
import Icon from '../../../components/Icon';
import {useTranslation} from 'react-i18next';

const OTPScreen: React.FC = () => {
  const [OTPCode, setOTPCode] = useState<{hasError: boolean; value: string}>();
  const navigate = useNavigate();
  const {t} = useTranslation();
  const theme = useTheme();
  const {id} = useParams();

  const handleVerifyCode = () => {
    try {
      //do logic to verify code OTPCode.value
      //throw a error if the coach not exists; throw new Error();

      //send user to OTP page
      navigate(PathRoutes.selectSchool);
    } catch (err) {
      console.log(err);
      setOTPCode(otp => ({value: otp?.value || '', hasError: true}));
    }
  };

  const handleResendCode = () => {
    //do logic to resend code
  };

  return (
    <Page back>
      <VStack flex={1} p={4} alignItems={'center'}>
        <VStack>
          <Text fontSize={'TMD'} fontWeight={400} color={'gray.800'}>
            {t('login.otp.title')}
          </Text>

          <Text
            fontSize={'TXL'}
            fontWeight={700}
            color={'primary.200'}
            mt={1}
            mb={8}
            alignSelf={'center'}>
            {id}
          </Text>

          <PinInput
            length={4}
            isInvalid={OTPCode?.hasError}
            onChangeText={value => setOTPCode({hasError: false, value})}
          />

          {OTPCode?.hasError && (
            <HStack mt={2} alignContent={'flex-start'} space={'4px'}>
              <Icon
                name={'exclamation-circle-solid'}
                size={18}
                color={theme.colors.red['200']}
              />
              <Text fontSize={'TXS'} color={'red.200'} fontWeight={400}>
                {t('login.otp.error')}
              </Text>
            </HStack>
          )}

          <Button mt={8} onPress={handleVerifyCode} disabled={!OTPCode?.value}>
            <Text
              color={!OTPCode?.value ? 'gray.600' : 'gray.0'}
              fontWeight={500}>
              {t('login.otp.button')}
            </Text>
          </Button>

          <Text fontSize={'LMD'} fontWeight={500} color={'gray.800'} mt={8}>
            {t('login.otp.not_receive_code')}
          </Text>

          <HStack mt={1} space={2} alignItems={'center'} alignSelf={'center'}>
            <Text
              fontSize={'LMD'}
              fontWeight={500}
              color={'primary.200'}
              onPress={handleResendCode}>
              {t('login.otp.resend_code')}
            </Text>
            <Box w={'4px'} h={'4px'} borderRadius={'2px'} bg={'gray.400'} />
            <Text
              fontSize={'LMD'}
              fontWeight={500}
              color={'primary.200'}
              onPress={() => navigate(PathRoutes.login.main)}>
              {t('login.otp.change_email')}
            </Text>
          </HStack>
        </VStack>
      </VStack>
    </Page>
  );
};

export default OTPScreen;
