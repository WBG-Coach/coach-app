import React from 'react';
import Page from '../../../components/Page';
import {Center, HStack, Image, Text, VStack} from 'native-base';
import {useTranslation} from 'react-i18next';
import {LoginLogo} from '../../../assets/images/logos';
import {useNavigate} from 'react-router-native';
import PathRoutes from '../../../routers/paths';
import Button from '../../../components/Button';

const FastLoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const {t} = useTranslation();

  //change this variable to logged user
  const id = 'Mohamed B.S. Ansumana';

  const handleLoginAgain = () => {
    try {
      //do logic to login user

      navigate(PathRoutes.selectSchool, {replace: true});
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Page setting>
      <VStack flex={1}>
        <VStack alignItems={'center'}>
          <Image source={LoginLogo} alt={'Logo of country'} />

          <Text mt={6} fontSize={'HSM'} fontWeight={600} color={'gray.800'}>
            {t('login.fastlogin.welcome')}
          </Text>
        </VStack>

        <VStack flex={1} justifyContent={'center'}>
          <Text
            fontSize={'TMD'}
            fontWeight={400}
            alignSelf={'center'}
            color={'gray.800'}>
            {t('login.fastlogin.title')}
          </Text>
          <Text
            fontSize={'TXL'}
            fontWeight={700}
            color={'primary.200'}
            alignSelf={'center'}
            mt={1}>
            {id}
          </Text>

          <Button mt={6} w={'100%'} onPress={handleLoginAgain}>
            {t('login.fastlogin.button') + ' ' + id.split(' ')[0]}
          </Button>

          <Text
            fontSize={'LMD'}
            fontWeight={500}
            color={'primary.200'}
            alignSelf={'center'}>
            {t('login.fastlogin.change_coach_button')}
          </Text>
        </VStack>

        <HStack alignSelf={'center'}>
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
      </VStack>
    </Page>
  );
};

export default FastLoginScreen;
