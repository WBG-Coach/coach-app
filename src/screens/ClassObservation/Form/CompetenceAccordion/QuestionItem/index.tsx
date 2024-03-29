import React, {useState} from 'react';
import {Center, HStack, Modal, Text, VStack} from 'native-base';
import BottomSheetTooltip from '../../BottomSheetTooltip';
import {Question} from '../../../../../types/question';
import {TouchableOpacity} from 'react-native';
import Icon from '../../../../../components/Icon';
import StarRating from '../../../../../components/StarRating';
import Button from '../../../../../components/Button';
import {useTranslation} from 'react-i18next';

type Props = {
  question: Question;
  initialValue?: number;
  onAnswer: (question: Question, value: number) => void;
};

const QuestionItem: React.FC<Props> = ({initialValue, question, onAnswer}) => {
  const {t} = useTranslation();
  const [internalValue, setInternalValue] = useState(initialValue || 0);
  const [tooltipData, setTooltipData] = useState<string>();

  return (
    <VStack mb="24px">
      <HStack mb={'16px'}>
        <VStack flex={1} mr={1}>
          <Text fontSize={'LLG'} fontWeight={500} color={'gray.700'}>
            {t(question.title)}
          </Text>

          {question.description && (
            <Text
              mt={'4px'}
              fontSize={'TMD'}
              fontWeight={400}
              color={'gray.600'}>
              {t(question.description)}
            </Text>
          )}
        </VStack>

        <TouchableOpacity onPress={() => setTooltipData(question.tooltip_data)}>
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
        size={question.scale}
        value={internalValue}
        onPress={answerValue => {
          onAnswer(question, answerValue);
          setInternalValue(answerValue);
        }}
      />

      <Modal isOpen={!!tooltipData} onClose={() => setTooltipData(undefined)}>
        <VStack w="full" mt="auto" p="16px" bg="white" borderTopRadius={'20px'}>
          <BottomSheetTooltip content={tooltipData || ''} />
          <Button variant="outlined" onPress={() => setTooltipData(undefined)}>
            Ok
          </Button>
        </VStack>
      </Modal>
    </VStack>
  );
};

export default QuestionItem;
