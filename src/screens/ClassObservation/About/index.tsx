import {
  Box,
  Text,
  View,
  VStack,
  Center,
  HStack,
  FlatList,
  useTheme,
} from 'native-base';
import React from 'react';
import Icon from '../../../components/Icon';
import {useTranslation} from 'react-i18next';
import {useNavigate, useParams} from 'react-router-native';
import PathRoutes from '../../../routers/paths';
import Page from '../../../components/Page';
import Button from '../../../components/Button';

const ClassObservationAbout: React.FC = () => {
  const theme = useTheme();
  const {t} = useTranslation();
  const navigate = useNavigate();
  const param = useParams<{teacherId: string}>();

  const process = [
    {
      title: t('classObservation.create.process.el1.title') || 'Preparation',
      estimated: t('classObservation.create.process.el1.subtitle') || '5min',
      description:
        t('classObservation.create.process.el1.description') ||
        'Talk to the teacher before the class and review your notes if you already had a coach observation before.',
    },
    {
      title:
        t('classObservation.create.process.el2.title') ||
        'Classroom observation',
      estimated:
        t('classObservation.create.process.el2.subtitle') || '30-45min',
      description:
        t('classObservation.create.process.el2.description') ||
        'Sit at the back of the class to make notes and remember to put your phone in silent mode.',
    },
    {
      title:
        t('classObservation.create.process.el3.title') ||
        'Coaching conversation',
      estimated:
        t('classObservation.create.process.el3.subtitle') || '20-30min',
      description:
        t('classObservation.create.process.el3.description') ||
        'Present to the teacher your observations, pointing the positive and negative points of their class.',
    },
    {
      title: t('classObservation.create.process.el4.title') || 'Next steps',
      estimated: t('classObservation.create.process.el4.subtitle') || '5min',
      description:
        t('classObservation.create.process.el4.description') ||
        'After agreeing with the teacher about the  key next steps, schedule the next visit.',
    },
  ];

  return (
    <Page back title={t('classObservation.title')}>
      <VStack flex={1} position={'relative'}>
        <Text mt={6} fontSize={'HSM'} fontWeight={600} color={'gray.800'}>
          {t('classObservation.create.title') || 'Mentoring process'}
        </Text>

        <HStack mt={6} position={'relative'}>
          <Box
            w={'4px'}
            left={'18px'}
            h={'85%'}
            background={'primary.100'}
            position={'absolute'}
          />

          <FlatList
            data={process}
            ItemSeparatorComponent={() => <View h={'14px'} />}
            renderItem={({item}) => (
              <>
                <Center
                  position={'absolute'}
                  top={0}
                  left={'-0px'}
                  w={'40px'}
                  h={'40px'}
                  background={'primary.100'}
                  zIndex={2}
                  borderRadius={'500px'}>
                  <Icon
                    name={'university'}
                    color={theme.colors.primary['200']}
                  />
                </Center>

                <VStack space={1} ml={'50px'}>
                  <Text fontSize={'TMD'} fontWeight={600} color={'gray.800'}>
                    {item.title}
                  </Text>
                  <Text fontSize={'TXS'} fontWeight={400} color={'gray.700'}>
                    {item.estimated}
                  </Text>
                  <Text fontSize={'TSM'} fontWeight={400} color={'gray.700'}>
                    {item.description}
                  </Text>
                </VStack>
              </>
            )}
          />
        </HStack>
      </VStack>
      <Button
        onPress={() =>
          navigate(PathRoutes.classObservation.setup, {
            replace: true,
            state: {teacher_id: param?.teacherId},
          })
        }>
        <Text>{t('classObservation.create.button')}</Text>
      </Button>
    </Page>
  );
};

export default ClassObservationAbout;
