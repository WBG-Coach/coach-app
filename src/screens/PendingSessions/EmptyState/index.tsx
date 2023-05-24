import {Button, HStack, Image, Text, useTheme, VStack} from 'native-base';
import React from 'react';
import {EmptyState} from '../../../assets/images/globals';
import Icon from '../../../components/base/Icon';
import Navigation from '../../../services/navigation';

const EmptyStateComponent: React.FC = () => {
  const theme = useTheme();

  return (
    <VStack alignItems={'center'}>
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
        No pending sessions
      </Text>
      <Text
        mt={2}
        textAlign={'center'}
        fontSize={'TMD'}
        fontWeight={400}
        color={'gray.600'}>
        You have already done all the feedbacks of the observations
      </Text>

      <HStack
        p={3}
        mt={4}
        width={'100%'}
        borderRadius={'8px'}
        background={'violet.0'}
        space={2}
        alignItems={'center'}>
        <Icon
          size={20}
          name={'info-circle-solid'}
          color={theme.colors.violet['200']}
        />
        <VStack>
          <Text fontSize={'LSM'} fontWeight={500} color={'gray.700'}>
            What's next?
          </Text>
          <Text mt={1} fontSize={'TXS'} fontWeight={400} color={'gray.700'}>
            Schedule a new class observation with a teacher to help them
            improve!
          </Text>
        </VStack>
      </HStack>

      <Button
        onPress={() => Navigation.goBack()}
        mt={8}
        variant={'solid'}
        borderRadius={'8px'}
        color={'white'}
        background={'white'}
        borderWidth={'1px'}
        borderColor={'primary.200'}>
        <Text color={'primary.200'}>Back to home</Text>
      </Button>
    </VStack>
  );
};

export default EmptyStateComponent;
