import React from 'react';
import {HStack, Image, Text, useTheme, VStack} from 'native-base';
import {EmptyState} from '../../../assets/images/globals';
import Icon from '../../../components/Icon';
import Button from '../../../components/Button';
import {useTranslation} from 'react-i18next';

type Props = {
  handleCreate: () => void;
};

const EmptyStateComponent: React.FC<Props> = ({handleCreate}) => {
  const theme = useTheme();
  const {t} = useTranslation();

  return (
    <VStack>
      <Image alt={'Icon of empty state'} source={EmptyState} />

      <Text
        mt={8}
        textAlign={'center'}
        fontSize={'HXS'}
        fontWeight={600}
        color={'gray.800'}>
        {t('home.emptyState.title')}
      </Text>
      <Text
        mt={2}
        textAlign={'center'}
        fontSize={'TMD'}
        fontWeight={400}
        color={'gray.600'}>
        {t('home.emptyState.description')}
      </Text>

      <Button onPress={handleCreate} mt={8}>
        <HStack alignItems={'center'} space={2}>
          <Icon name={'plus'} color={theme.colors.white} />
          <Text>{t('home.teachers.addNew')}</Text>
        </HStack>
      </Button>
    </VStack>
  );
};

export default EmptyStateComponent;
