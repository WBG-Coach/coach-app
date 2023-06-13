import {Box, Center, HStack, Text, VStack} from 'native-base';
import {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from '../../../../../components/base/Icon';
import StarRating from '../../../../../components/base/StarRating';
import Question from '../../../../../database/models/Question';
import {useBottomSheetProvider} from '../../../../../providers/contexts/BottomSheetContext';
import BottomSheetTooltip from '../../BottomSheetTooltip';

type Props = {
  value: number;
  question: Question;
  onAnswer: (question: Question, value: number) => void;
};

const QuestionItem: React.FC<Props> = ({value, question, onAnswer}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [internalValue, setInternalValue] = useState(value);

  const [{}, {setBottomSheetContent}] = useBottomSheetProvider();

  useEffect(() => {
    setTimeout(() => setIsLoading(false));
  }, []);

  if (isLoading)
    return (
      <Box h="100px" w="full">
        <Box bg="gray.100" h="20px"></Box>
        <Box bg="gray.100" mt="8px" h="12px"></Box>
        <Box mx="auto" bg="gray.100" mt="16px" w="200px" h="32px"></Box>
      </Box>
    );

  return (
    <VStack mb="24px">
      <HStack mb={1}>
        <VStack flex={1}>
          <Text fontSize={'LMD'} fontWeight={500} color={'gray.700'}>
            {question.title}
          </Text>

          {question.description && (
            <Text mt={'1'} fontSize={'TXS'} fontWeight={400} color={'gray.600'}>
              {question.description}
            </Text>
          )}
        </VStack>

        <TouchableOpacity
          onPress={() =>
            setBottomSheetContent(
              <BottomSheetTooltip content={question.tooltip_data} />,
            )
          }>
          <Center
            background={'primary.200'}
            borderRadius={'10px'}
            width={'20px'}
            height={'20px'}>
            <Icon color="white" name="question" />
          </Center>
        </TouchableOpacity>
      </HStack>

      <StarRating
        size={5}
        value={internalValue}
        onPress={value => {
          onAnswer(question, value);
          setInternalValue(value);
        }}
      />
    </VStack>
  );
};

export default QuestionItem;
