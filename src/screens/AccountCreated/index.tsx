import React from 'react';
import Page from '../../components/Page';
import {Center, HStack, Image, Text, VStack, useTheme} from 'native-base';
import Button from '../../components/Button';
import {useNavigate} from 'react-router-native';
import PathRoutes from '../../routers/paths';
import Icon from '../../components/Icon';
import {AccountCreatedImg} from '../../assets/images/accountCreated';
import {useTranslation} from 'react-i18next';

const AccountCreatedScreen: React.FC = () => {
  const {t} = useTranslation();
  const navigation = useNavigate();
  const theme: any = useTheme();

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
            {t('login.accountCreated.title')}
          </Text>
          <Text
            mt={2}
            textAlign={'center'}
            fontWeight={400}
            fontSize={'TMD'}
            color={'gray.600'}>
            {t('login.accountCreated.subtitle')}
          </Text>
        </VStack>
      </Center>

      <Button onPress={() => navigation(PathRoutes.splash, {replace: true})}>
        Go to profile selection
      </Button>
    </Page>
  );
};

export default AccountCreatedScreen;
