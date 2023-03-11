import {
  Button,
  Center,
  HStack,
  Image,
  Text,
  useTheme,
  VStack,
} from 'native-base';
import React from 'react';
import {SessionDefault} from '../../../../assets/images/logos';
import Icon from '../../../../components/base/Icon';
import Routes from '../../../../routes/paths';
import Navigation from '../../../../services/navigation';

const SessionTab = () => {
  const theme = useTheme();

  return (
    <Center flex={1}>
      <VStack alignItems={'center'}>
        <Image source={SessionDefault} alt={'Session default image'} />
        <Text mt={8} fontSize={'HXS'} fontWeight={600} color={'gray.800'}>
          Still no session
        </Text>
        <Text
          textAlign={'center'}
          mt={2}
          fontSize={'TMD'}
          fontWeight={400}
          color={'gray.700'}>
          You can start a new class observation with this teacher
        </Text>

        <Button
          mt={8}
          variant={'outline'}
          borderRadius={'8px'}
          borderColor={theme.colors.primary['200']}
          onPress={() => Navigation.navigate(Routes.classObservation.create)}>
          <HStack alignItems={'center'}>
            <Icon name={'plus'} color={theme.colors.primary['200']} />
            <Text
              ml={3}
              textAlign={'center'}
              fontSize={'TMD'}
              fontWeight={500}
              color={'primary.200'}>
              New class observation
            </Text>
          </HStack>
        </Button>
      </VStack>
    </Center>
  );
};

export default SessionTab;
