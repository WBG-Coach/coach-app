import {Q} from '@nozbe/watermelondb';
import {Center, HStack, Text, useTheme, VStack} from 'native-base';
import React, {useContext, useState} from 'react';
import Competence from '../../../../../database/models/Competence';
import {UserContext} from '../../../../../providers/contexts/UserContext';
import {isTablet as Tablet} from 'react-native-device-info';
import {useTranslation} from 'react-i18next';
import {Dimensions} from 'react-native';
import Icon from '../../../../../components/base/Icon';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CompetenceCharts from './Charts';

type Props = {
  route: {
    params: {
      competences: Competence[];
      current: number;
    };
  };
};

const CompetenceStats: React.FC<any> = ({route: {params}}: Props) => {
  const {competences, current} = params;
  const [currentCompetence, setCurrentCompetence] = useState(current);
  const {teacher, user} = useContext(UserContext);
  const {t} = useTranslation();
  const isTablet = Tablet();
  const theme = useTheme();

  return (
    <VStack px={isTablet ? '32px' : 4} mt={6} flex={1}>
      <HStack
        p={3}
        borderWidth={'1px'}
        borderColor={'primary.200'}
        borderRadius={'8px'}
        mb={'4'}
        space={2}
        alignItems={'center'}>
        <Icon
          name={'graduation-cap-solid'}
          color={theme.colors.primary['200']}
        />
        <VStack>
          <Text fontSize={'LSM'} fontWeight={500} color={'gray.700'}>
            {teacher?.name}
          </Text>
          <Text fontSize={'TXS'} fontWeight={500} color={'gray.700'}>
            {t('teacher.tabs.stats.teacherAt', {
              school: user && user?.school?.name,
            })}
          </Text>
        </VStack>
      </HStack>

      <HStack w={'100%'} alignItems={'center'} mb={6} px={2}>
        <TouchableOpacity
          disabled={currentCompetence <= 0}
          onPress={() => setCurrentCompetence(currentCompetence - 1)}>
          <Icon
            name={'angle-left'}
            color={
              currentCompetence <= 0 ? theme.colors.gray['200'] : '#000000'
            }
          />
        </TouchableOpacity>
        <Center flex={1}>
          <Text fontSize={'HXS'} fontWeight={500} color={'gray.700'}>
            {competences[currentCompetence].title}
          </Text>
        </Center>

        <TouchableOpacity
          disabled={currentCompetence >= competences.length - 1}
          onPress={() => setCurrentCompetence(currentCompetence + 1)}>
          <Icon
            name={'angle-right'}
            color={
              currentCompetence >= competences.length - 1
                ? theme.colors.gray['200']
                : '#000000'
            }
          />
        </TouchableOpacity>
      </HStack>

      <CompetenceCharts competence_id={competences[currentCompetence].id} />
    </VStack>
  );
};

export default CompetenceStats;
