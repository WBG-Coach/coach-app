import {
  Button,
  Checkbox,
  HStack,
  ScrollView,
  Text,
  useTheme,
  VStack,
} from 'native-base';
import {isTablet as Tablet} from 'react-native-device-info';
import React, {useState} from 'react';
import MockCompetence from '../../ClassObservation/Form/consts';
import {ICompetence} from '../../../types';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from '../../../components/base/Icon';
import Navigation from '../../../services/navigation';
import Routes from '../../../routes/paths';

const FeedbackPreparation: React.FC = () => {
  const [competenciesSelected, setCompetenciesSelected] = useState<
    ICompetence[]
  >([]);
  const isTablet = Tablet();
  const theme = useTheme();

  const tags = {
    recommended: {
      label: 'Recommended',
      background: 'primary.0',
      color: theme.colors.primary['300'],
      icon: 'award-solid',
    },
    needsWork: {
      label: 'Needs work',
      background: 'yellow.0',
      color: theme.colors.yellow['300'],
      icon: 'star-solid',
    },
    almostThere: {
      label: 'Almost there',
      background: 'violet.0',
      color: theme.colors.violet['300'],
      icon: 'star-solid',
    },
    lookingGood: {
      label: 'Looking good',
      background: 'green.0',
      color: theme.colors.green['300'],
      icon: 'star-solid',
    },
  };

  return (
    <VStack flex={1} py={6} safeAreaBottom bg={'gray.0'}>
      <VStack flex={1} px={isTablet ? '64px' : 4}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text fontSize={'HSM'} fontWeight={600} color={'gray.700'}>
            Choose teaching practices
          </Text>
          <Text mt={2} fontSize={'TMD'} fontWeight={400} color={'gray.700'}>
            Choose 1 teaching practices to work with the teacher
          </Text>

          <VStack mt={7} space={5}>
            {MockCompetence.map((competence, index) => {
              //only a example to select tag
              const cTags = [
                tags.recommended,
                tags[index <= 2 ? 'needsWork' : 'almostThere'],
              ];

              return (
                <TouchableOpacity
                  key={competence.id}
                  onPress={() => {
                    const exists = !!competenciesSelected.find(
                      ({id}) => id === competence.id,
                    );

                    if (exists) {
                      setCompetenciesSelected(
                        competenciesSelected.filter(
                          ({id}) => id !== competence.id,
                        ),
                      );
                    } else {
                      setCompetenciesSelected([
                        ...competenciesSelected,
                        competence,
                      ]);
                    }
                  }}>
                  <HStack alignItems={'center'}>
                    <VStack flex={1} space={2}>
                      <Text
                        fontSize={'LMD'}
                        fontWeight={500}
                        color={'gray.700'}>
                        {competence.title}
                      </Text>
                      <Text
                        fontSize={'TSM'}
                        fontWeight={400}
                        color={'gray.600'}>
                        Teaching practice 2
                      </Text>

                      <HStack space={1}>
                        {cTags.map((tag, index) => (
                          <HStack
                            key={index}
                            alignItems={'center'}
                            bg={tag.background}
                            space={1}
                            py={1}
                            px={2}>
                            <Icon name={tag.icon} size={16} />
                            <Text
                              fontSize={'TXS'}
                              fontWeight={400}
                              color={'gray.600'}>
                              {tag.label}
                            </Text>
                          </HStack>
                        ))}
                      </HStack>
                    </VStack>

                    <Checkbox
                      size={'md'}
                      color={'white'}
                      aria-label={`${competence.title} checkbox`}
                      value={competence.title}
                      isChecked={
                        !!competenciesSelected.find(
                          comp => comp.id === competence.id,
                        )
                      }
                    />
                  </HStack>
                </TouchableOpacity>
              );
            })}
          </VStack>
        </ScrollView>
      </VStack>

      <VStack
        px={isTablet ? '64px' : 4}
        background={'white'}
        pt={3}
        borderRadius={'8px 8px 0px 0px'}>
        <Button
          isDisabled={competenciesSelected.length < 1}
          onPress={() =>
            Navigation.navigate(Routes.feedback.defineActions, {
              competencies: competenciesSelected,
            })
          }
          marginTop={'auto'}
          variant={'solid'}
          borderRadius={'8px'}
          color={'white'}
          background={'primary.200'}>
          Finish coach session
        </Button>
      </VStack>
    </VStack>
  );
};

export default FeedbackPreparation;
