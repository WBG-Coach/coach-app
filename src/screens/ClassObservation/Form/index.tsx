import {Button, Collapse, FlatList, Text, TextArea, VStack} from 'native-base';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {SimpleAccordion} from 'react-native-simple-accordion';

import {ICompetence} from '../../../types';
import MockCompetence from './consts';

const ObservationForm = () => {
  return (
    <VStack flex={1} py={6} safeAreaBottom bg={'gray.0'}>
      <VStack flex={1} px={4}>
        <ScrollView>
          <Text fontSize={'HSM'} fontWeight={600} color={'gray.700'}>
            Class evaluation
          </Text>
          <Text mt={2} fontSize={'TMD'} fontWeight={400} color={'gray.700'}>
            Rate each topic with your observation
          </Text>

          <VStack>
            {MockCompetence.map((competence, index) => (
              <SimpleAccordion
                key={competence.id}
                title={competence.title}
                startCollapsed={index !== 0}
                bannerStyle={{
                  backgroundColor: 'white',
                  paddingHorizontal: 0,
                }}
                viewContainerStyle={{
                  elevation: 0,
                  shadowColor: 'white',
                }}
                viewInside={
                  <VStack>
                    <Text>hello world</Text>
                    <Text>hello world</Text>
                    <Text>hello world</Text>
                  </VStack>
                }
              />
            ))}
          </VStack>

          <VStack py={4}>
            <Text fontSize={'TXL'} fontWeight={700} color={'gray.700'}>
              Key points to be discussed
            </Text>
            <Text mt={4} fontSize={'LLG'} fontWeight={500} color={'gray.700'}>
              What you want to discuss with the teacher?
            </Text>
            <TextArea
              mt={2}
              autoCompleteType={'off'}
              placeholder={'Positive and negative points'}
            />
            <Text mt={2} fontSize={'TXS'} fontWeight={400} color={'gray.600'}>
              Use this space for additional annotations that you'd like to
              discuss with the teacher
            </Text>
          </VStack>
        </ScrollView>
      </VStack>

      <VStack
        background={'white'}
        pt={3}
        px={4}
        borderRadius={'8px 8px 0px 0px'}>
        <Button
          marginTop={'auto'}
          variant={'solid'}
          borderRadius={'8px'}
          color={'white'}
          background={'primary.200'}>
          Finish observation
        </Button>
      </VStack>
    </VStack>
  );
};

export default ObservationForm;
