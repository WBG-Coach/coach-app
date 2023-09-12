import React from 'react';
import {HStack, Image, Text, VStack} from 'native-base';
import {SessionDefault} from '../../../../../../assets/images/logos';
import Button from '../../../../../../components/Button';
import Icon from '../../../../../../components/Icon';
import {useTranslation} from 'react-i18next';

type Props = {
  handleCreate: () => void;
};

const SessionListEmpty: React.FC<Props> = ({handleCreate}) => {
  const {t} = useTranslation();

  return (
    <VStack alignItems={'center'}>
      <Image source={SessionDefault} alt={'Session default image'} />
      <Text
        textAlign={'center'}
        mt={8}
        fontSize={'HXS'}
        fontWeight={600}
        color={'gray.800'}>
        {t('teacher.tabs.session.stillNoSession')}
      </Text>
      <Text
        textAlign={'center'}
        mt={2}
        fontSize={'TMD'}
        fontWeight={400}
        color={'gray.700'}>
        {t('teacher.tabs.session.stillNoSessionDescription')}
      </Text>

      <Button mt={8} onPress={handleCreate}>
        <HStack>
          <Icon name={'plus'} color={'white'} />
          <Text
            ml={3}
            fontSize={'TMD'}
            fontWeight={500}
            textAlign={'center'}
            color={'white'}>
            {t('teacher.tabs.session.newClassObservation')}
          </Text>
        </HStack>
      </Button>
    </VStack>
  );
};

export default SessionListEmpty;
