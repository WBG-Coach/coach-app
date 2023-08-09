import React from 'react';
import {
  Box,
  Text,
  VStack,
  Center,
  HStack,
  FlatList,
  useTheme,
} from 'native-base';
import {useNavigate, useParams} from 'react-router-native';
import PathRoutes from '../../../routers/paths';
import Button from '../../../components/Button';
import {useTranslation} from 'react-i18next';
import Icon from '../../../components/Icon';
import Page from '../../../components/Page';

const ClassObservationAbout: React.FC = () => {
  const theme = useTheme();
  const {t} = useTranslation();
  const navigate = useNavigate();
  const param = useParams<{teacherId: string}>();

  const process = [
    {
      icon: 'sliders-v',
      title: t('classObservation.about.step1.title'),
      estimated: t('classObservation.about.step1.subtitle'),
      description: t('classObservation.about.step1.description'),
    },
    {
      icon: 'clipboard-notes',
      title: t('classObservation.about.step2.title'),
      estimated: t('classObservation.about.step2.subtitle'),
      description: t('classObservation.about.step2.description'),
    },
    {
      icon: 'comments',
      title: t('classObservation.about.step3.title'),
      estimated: t('classObservation.about.step3.subtitle'),
      description: t('classObservation.about.step3.description'),
    },
    {
      icon: 'sign-alt',
      title: t('classObservation.about.step4.title'),
      estimated: t('classObservation.about.step4.subtitle'),
      description: t('classObservation.about.step4.description'),
    },
  ];

  const goToSetupSession = () => {
    navigate(PathRoutes.classObservation.setup, {
      replace: true,
      state: {session: {teacher_id: param?.teacherId}},
    });
  };

  return (
    <Page back title={t('classObservation.title')}>
      <VStack flex={1} position={'relative'}>
        <Text fontSize={'HSM'} fontWeight={600} color={'gray.800'}>
          {t('classObservation.about.title')}
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
            renderItem={({item}) => (
              <>
                <Center
                  top={0}
                  w={'40px'}
                  h={'40px'}
                  zIndex={2}
                  left={'-0px'}
                  position={'absolute'}
                  borderRadius={'500px'}
                  background={'primary.0'}>
                  <Icon
                    name={item.icon as any}
                    color={theme.colors.primary['200']}
                  />
                </Center>

                <VStack space={1} ml={'50px'} pb={6}>
                  <Text fontSize={'TMD'} fontWeight={700} color={'gray.800'}>
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

      <Button onPress={goToSetupSession}>
        {t('classObservation.about.start-button')}
      </Button>
    </Page>
  );
};

export default ClassObservationAbout;
