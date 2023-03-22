import {Button, Input, ScrollView, Text, TextArea, VStack} from 'native-base';
import React from 'react';
import {useForm} from 'react-hook-form';
import Routes from '../../../routes/paths';
import Navigation from '../../../services/navigation';

const ObservationSetup: React.FC<any> = () => {
  const {} = useForm();
  return (
    <VStack flex={1} px={4} py={6} safeAreaBottom bg={'gray.0'}>
      <ScrollView>
        <Text fontSize={'HSM'} fontWeight={600} color={'gray.800'}>
          About the lesson
        </Text>
        <Text mt={2} fontSize={'TMD'} fontWeight={400} color={'gray.800'}>
          Ask the teacher the following questions
        </Text>

        <VStack space={4} mt={6}>
          <VStack space={2}>
            <Text fontSize={'TMD'} fontWeight={400} color={'gray.800'}>
              How many students are in the class?
            </Text>
            <Input variant={'outline'} placeholder={'15'} />
          </VStack>

          <VStack space={2}>
            <Text fontSize={'TMD'} fontWeight={400} color={'gray.800'}>
              What's the subject?
            </Text>
            <Input variant={'outline'} placeholder={'Math'} />
          </VStack>

          <VStack space={2}>
            <Text fontSize={'TMD'} fontWeight={400} color={'gray.800'}>
              How long the lesson’s going to last?
            </Text>
            <Input variant={'outline'} placeholder={'30 min'} />
          </VStack>

          <VStack space={2}>
            <Text fontSize={'TMD'} fontWeight={400} color={'gray.800'}>
              Teacher's description of the class
            </Text>
            <TextArea
              autoCompleteType={'off'}
              variant={'outline'}
              placeholder={"Teacher's description of the class"}
            />
          </VStack>
        </VStack>
        <Text my={2} fontSize={'TXS'} fontWeight={400} color={'gray.600'}>
          Ask the teacher the following questions
        </Text>
      </ScrollView>

      <Button
        marginTop={'auto'}
        variant={'solid'}
        borderRadius={'8px'}
        color={'white'}
        background={'primary.200'}
        onPress={() => Navigation.navigate(Routes.classObservation.form)}>
        Next
      </Button>
    </VStack>
  );
};

export default ObservationSetup;
