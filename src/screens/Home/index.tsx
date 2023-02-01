import {changeLanguage} from 'i18next';
import {Button, Center, HStack, Text} from 'native-base';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {resources} from '../../i18n';

const HomeScreen = () => {
  const {t} = useTranslation();

  return (
    <Center flex={1} bg={'white'}>
      <Text fontSize={'2xl'} fontWeight={600}>
        {t('hello')}
      </Text>
      <HStack space={'12px'} mt={'16px'}>
        {Object.keys(resources).map(resource => (
          <Button onPress={() => changeLanguage(resource)}>
            {resources[resource].label}
          </Button>
        ))}
      </HStack>
    </Center>
  );
};

export default HomeScreen;
