import React, {memo} from 'react';
import {Props} from './types';
import {HStack, VStack, Text, Center, Box} from 'native-base';
import {TouchableOpacity} from 'react-native';

const CompetenceItem: React.FC<Props> = ({
  competence,
  selectedQuestion,
  handleSelectQuestion,
}) => {
  return (
    <VStack borderWidth={'1px'} borderColor={'gray.200'} borderRadius={'8px'}>
      <HStack py={'8px'} px={'16px'} bg={'gray.100'}>
        <Text fontSize={'LMD'} fontWeight={700} color={'gray.700'}>
          {competence.title}
        </Text>
      </HStack>

      <VStack p={'16px'} space={'16px'}>
        {competence.questions.map(question => (
          <TouchableOpacity
            key={question.id}
            onPress={() => handleSelectQuestion(question)}>
            <HStack alignItems={'flex-start'}>
              <VStack flex={1}>
                <Text fontSize={'LMD'} fontWeight={500} color={'gray.700'}>
                  {question.title}
                </Text>
                <Text fontSize={'TSM'} fontWeight={400} color={'gray.600'}>
                  {question.description}
                </Text>
              </VStack>

              <Center
                w="24px"
                h="24px"
                borderWidth="1px"
                borderRadius="12px"
                borderColor="primary.200"
                bg={selectedQuestion === question.id ? 'primary.200' : 'white'}>
                <Box w={'12px'} h={'12px'} borderRadius="6px" bg={'white'} />
              </Center>
            </HStack>
          </TouchableOpacity>
        ))}
      </VStack>
    </VStack>
  );
};

export default memo(CompetenceItem);
