import React, {memo} from 'react';
import {Props} from './types';
import {HStack, VStack, Text, Center, Box} from 'native-base';
import {TouchableOpacity} from 'react-native';
import Icon from '../../../../components/Icon';

const AnswerItem: React.FC<Props> = ({
  title,
  answers,
  selectedAnswer,
  handleSelectAnswer,
}) => {
  return (
    <VStack borderWidth={'1px'} borderColor={'gray.200'} borderRadius={'8px'}>
      <HStack py={'8px'} px={'16px'} bg={'gray.100'}>
        <Text fontSize={'LMD'} fontWeight={700} color={'gray.700'}>
          {title}
        </Text>
      </HStack>

      <VStack p={'16px'} space={'16px'}>
        {answers.map(answer => (
          <TouchableOpacity
            key={answer.id}
            onPress={() => handleSelectAnswer(answer)}>
            <HStack alignItems={'flex-start'}>
              <VStack flex={1}>
                <Text fontSize={'LMD'} fontWeight={500} color={'gray.700'}>
                  {answer.question?.title}
                </Text>
                {answer.question?.description && (
                  <Text fontSize={'TSM'} fontWeight={400} color={'gray.600'}>
                    {answer.question?.description}
                  </Text>
                )}
                <HStack alignItems="center" mt="4px">
                  <Icon name="star-solid" color="#576375" size={16} />
                  <Text ml="2px" fontSize="16px" color="#576375">
                    {answer.value}
                  </Text>
                </HStack>
              </VStack>

              <Center
                w="24px"
                h="24px"
                borderWidth="1px"
                borderRadius="12px"
                borderColor="primary.200"
                bg={selectedAnswer === answer.id ? 'primary.200' : 'white'}>
                <Box w={'12px'} h={'12px'} borderRadius="6px" bg={'white'} />
              </Center>
            </HStack>
          </TouchableOpacity>
        ))}
      </VStack>
    </VStack>
  );
};

export default memo(AnswerItem);
