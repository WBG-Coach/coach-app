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
import React, {useContext, useState} from 'react';
import {ICompetence} from '../../../types';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from '../../../components/base/Icon';
import Navigation from '../../../services/navigation';
import Routes from '../../../routes/paths';
import {CompetenceContext} from '../../../providers/contexts/CompetencesContext';
import StarsTag from '../../../components/StarsTag';

const FeedbackPreparation: React.FC = () => {
  const [competenciesSelected, setCompetenciesSelected] = useState<
    ICompetence[]
  >([]);
  const {competences} = useContext(CompetenceContext);
  const isTablet = Tablet();

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
            {competences.map(competence => (
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
                    <Text fontSize={'LMD'} fontWeight={500} color={'gray.700'}>
                      {competence.title}
                    </Text>
                    <Text fontSize={'TSM'} fontWeight={400} color={'gray.600'}>
                      Teaching practice 2
                    </Text>

                    <HStack space={1}>
                      <StarsTag value={0} />
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
            ))}
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
