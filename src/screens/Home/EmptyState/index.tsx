import {Button, HStack, Image, Text, useTheme, VStack} from 'native-base';
import React from 'react';
import {EmptyState} from '../../../assets/images/globals';
import Icon from '../../../components/base/Icon';
import {Props} from './types';

const EmptyStateComponent: React.FC<Props> = ({handleCreate}) => {
  const theme = useTheme();

  return (
    <VStack alignSelf={'center'}>
      <Image
        alt={'Icon of empty state'}
        alignSelf={'center'}
        source={EmptyState}
      />

      <Text
        mt={8}
        textAlign={'center'}
        fontSize={'HXS'}
        fontWeight={600}
        color={'gray.800'}>
        No teacher registered
      </Text>
      <Text
        mt={2}
        textAlign={'center'}
        fontSize={'TMD'}
        fontWeight={400}
        color={'gray.600'}>
        Add a new teacher to start coaching
      </Text>

      <Button
        onPress={handleCreate}
        mt={8}
        variant={'solid'}
        borderRadius={'8px'}
        color={'white'}
        background={'primary.200'}>
        <HStack alignItems={'center'} space={2}>
          <Icon name={'plus'} color={theme.colors.white} />
          <Text>Add new teacher</Text>
        </HStack>
      </Button>
    </VStack>
  );
};

export default EmptyStateComponent;
