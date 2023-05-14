import {Box, Center, HStack, Text, useTheme, VStack} from 'native-base';
import React, {useMemo} from 'react';
import {Controller} from 'react-hook-form';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SimpleAccordion} from 'react-native-simple-accordion';
import Icon from '../../../../components/base/Icon';
import StarRating from '../../../../components/base/StarRating';
import {useBottomSheetProvider} from '../../../../providers/contexts/BottomSheetContext';
import BottomSheetTooltip from '../BottomSheetTooltip';
import {Props} from './types';

const CompetenceAccordion: React.FC<Props> = ({
  competence,
  isFinished,
  startCollapsed,
  control,
}) => {
  const [{}, {setBottomSheetContent}] = useBottomSheetProvider();
  const theme = useTheme();

  const Form = useMemo(
    () => (
      <SimpleAccordion
        title={competence.title}
        startCollapsed={startCollapsed}
        bannerStyle={{
          backgroundColor: 'white',
          paddingHorizontal: 0,
          paddingVertical: 0,
        }}
        viewContainerStyle={{
          shadowColor: 'white',
          paddingHorizontal: 0,
          paddingVertical: 0,
        }}
        viewInside={
          <VStack space={4}>
            {competence.questions.map(question => (
              <Controller
                key={question.id}
                name={question.id}
                rules={{required: true}}
                control={control}
                render={({field: {value, onChange}, fieldState: {error}}) => (
                  <VStack>
                    <HStack mb={1}>
                      <VStack flex={1}>
                        <Text
                          fontSize={'LMD'}
                          fontWeight={500}
                          color={'gray.700'}>
                          {question.title}
                        </Text>

                        {question.description && (
                          <Text
                            mt={'1'}
                            fontSize={'TXS'}
                            fontWeight={400}
                            color={'gray.600'}>
                            {question.description}
                          </Text>
                        )}
                      </VStack>

                      <TouchableOpacity
                        onPress={() =>
                          setBottomSheetContent(
                            <BottomSheetTooltip
                              content={question.tooltip_data}
                            />,
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
                      value={parseInt(value || '0')}
                      onPress={onChange}
                      isInvalid={!!error}
                    />
                  </VStack>
                )}
              />
            ))}
          </VStack>
        }
      />
    ),
    [],
  );

  return (
    <Box position={'relative'}>
      {isFinished && (
        <Center
          position={'absolute'}
          zIndex={10}
          top={5}
          right={10}
          background={'green.200'}
          w={'20px'}
          h={'20px'}
          borderRadius={'10px'}>
          <Icon name={'check'} color={theme.colors.white} size={16} />
        </Center>
      )}

      {Form}
    </Box>
  );
};

export default CompetenceAccordion;
