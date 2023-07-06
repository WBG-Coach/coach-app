import {Center, HStack, Spinner, Text, useTheme, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {isTablet as Tablet} from 'react-native-device-info';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity} from 'react-native';
import Icon from '../../../../../../components/Icon';
import {useCoachContext} from '../../../../../../providers/coach.provider';
import {Teacher, TeacherDetailsType} from '../../../../../../types/teacher';
import {Competence} from '../../../../../../types/competence';
import {TeacherService} from '../../../../../../services/teacher.service';
import CompetenceService from '../../../../../../services/competence.service';
import {useParams} from 'react-router-native';
import Page from '../../../../../../components/Page';
import CompetenceCharts from './Charts';

type Props = {
  id: Teacher['id'];
  competence_index: string;
};

const CompetenceStats: React.FC = () => {
  const {competence_index, id} = useParams<Props>();
  const [currentCompetence, setCurrentCompetence] = useState(
    parseInt(competence_index || '0'),
  );
  const [pageData, setPageData] = useState<{
    teacher: TeacherDetailsType;
    competences: Competence[];
  }>();
  const {currentSchool} = useCoachContext();
  const {t} = useTranslation();
  const isTablet = Tablet();
  const theme = useTheme();

  useEffect(() => {
    (async () => {
      const [teacher, competences] = await Promise.all([
        await TeacherService.getTeacherDetails(id || ''),
        await CompetenceService.listCompetenciesWithQuestions(),
      ]);

      setPageData({teacher, competences});
    })();
  }, []);

  return (
    <Page back>
      <VStack px={isTablet ? '32px' : 4} flex={1}>
        {pageData ? (
          <>
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
                  {pageData.teacher.name}
                </Text>
                <Text fontSize={'TXS'} fontWeight={500} color={'gray.700'}>
                  {t('teacher.tabs.stats.teacherAt', {
                    school: currentSchool?.name,
                  })}
                </Text>
              </VStack>
            </HStack>

            <HStack w={'100%'} alignItems={'center'} mb={6} px={2}>
              <TouchableOpacity
                disabled={currentCompetence <= 0}
                onPress={() => setCurrentCompetence(currentCompetence - 1)}>
                <Center w={'48px'} h={'48px'} alignItems={'flex-start'}>
                  <Icon
                    name={'angle-left'}
                    color={
                      currentCompetence <= 0
                        ? theme.colors.gray['200']
                        : '#000000'
                    }
                  />
                </Center>
              </TouchableOpacity>
              <Center flex={1}>
                <Text
                  fontSize={'HXS'}
                  fontWeight={500}
                  color={'gray.700'}
                  textAlign={'center'}>
                  {pageData.competences[currentCompetence].title}
                </Text>
              </Center>

              <TouchableOpacity
                disabled={currentCompetence >= pageData.competences.length - 1}
                onPress={() => setCurrentCompetence(currentCompetence + 1)}>
                <Center w={'48px'} h={'48px'} alignItems={'flex-end'}>
                  <Icon
                    name={'angle-right'}
                    color={
                      currentCompetence >= pageData.competences.length - 1
                        ? theme.colors.gray['200']
                        : '#000000'
                    }
                  />
                </Center>
              </TouchableOpacity>
            </HStack>

            <CompetenceCharts
              competence_id={pageData.competences[currentCompetence].id}
              teacher_id={id || ''}
            />
          </>
        ) : (
          <Center flex={1}>
            <Spinner size={'lg'} />
          </Center>
        )}
      </VStack>
    </Page>
  );
};

export default CompetenceStats;
