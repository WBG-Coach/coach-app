import React from 'react';
import Page from '../../../components/Page';
import Button from '../../../components/Button';
import PathRoutes from '../../../routers/paths';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-native';
import {Center, Image, Text, VStack} from 'native-base';
import {AccountCreatedImg} from '../../../assets/images/accountCreated';

const SignupSuccessScreen: React.FC = () => {
  const {t} = useTranslation();
  const navigation = useNavigate();

  return (
    <Page>
      <Center flex={1}>
        <VStack alignItems={'center'}>
          <Image source={AccountCreatedImg} alt={'User icon'} />
          <Text
            textAlign={'center'}
            fontWeight={600}
            fontSize={'HXS'}
            color={'gray.700'}>
            {t('signup.success.title')}
          </Text>
          <Text
            mt={2}
            textAlign={'center'}
            fontWeight={400}
            fontSize={'TMD'}
            color={'gray.600'}>
            {t('signup.success.subtitle')}
          </Text>
        </VStack>
      </Center>

      <Button onPress={() => navigation(PathRoutes.splash, {replace: true})}>
        {t('signup.success.button')}
      </Button>
    </Page>
  );
};

export default SignupSuccessScreen;
