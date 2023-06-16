import {
  Button,
  Center,
  HStack,
  ScrollView,
  Text,
  TextArea,
  useTheme,
  VStack,
} from 'native-base';
import {isTablet as Tablet} from 'react-native-device-info';
import React, {useState} from 'react';
import {ICompetence} from '../../../types';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {SimpleAccordion} from 'react-native-simple-accordion';
import Icon from '../../../components/base/Icon';
import Navigation from '../../../services/navigation';
import Routes from '../../../routes/paths';
import {getWatermelon} from '../../../database';
import Session from '../../../database/models/Session';
import Feedback from '../../../database/models/Feedback';
import {useBottomSheetProvider} from '../../../providers/contexts/BottomSheetContext';
import ImagePicker from '../../../components/ImagePicker';
import RNFS from 'react-native-fs';
import Image from '../../../database/models/Image';
import ImageCard from '../../../components/ImageCard';
import {useTranslation} from 'react-i18next';

type Props = {
  route: {
    params: {
      competencies: ICompetence[];
      session_id: Session['id'];
    };
  };
};

const DefineActions: React.FC<any> = ({route: {params}}: Props) => {
  const [images, setImages] = useState<
    {name: string; value: string; created_at: number}[]
  >([]);
  const {t} = useTranslation();
  const [{}, {setBottomSheetContent}] = useBottomSheetProvider();
  const {competencies} = params;
  const defaultValues = competencies.reduce(
    (acc, item) => ({...acc, [item.id]: ''}),
    {} as {[key: string]: string},
  );

  const isTablet = Tablet();
  const theme = useTheme();

  const {
    handleSubmit,
    control,
    formState: {isSubmitting},
  } = useForm(defaultValues);

  const handleSubmitForm: SubmitHandler<
    typeof defaultValues
  > = async values => {
    const db = await getWatermelon();
    const first_key = Object.keys(values)[0];

    const feedback = await db.write(
      async () =>
        await db.collections.get<Feedback>('feedback').create(record => {
          record.value = values[first_key];
          record.competence_id = first_key;
          record.session_id = params.session_id;
        }),
    );

    await Promise.all(
      images.map(async image => {
        const base64 = await RNFS.readFile(image.value, 'base64');

        return await db.write(
          async () =>
            await db.collections.get<Image>('image').create(record => {
              record.name = image.name;
              record.value = 'data:image/png;base64,' + base64;
              record.external_id = feedback.id;
            }),
        );
      }),
    );

    Navigation.navigate(Routes.feedback.feedbackCompleted);
  };

  return (
    <VStack flex={1} py={6} safeAreaBottom bg={'gray.0'}>
      <VStack flex={1} px={isTablet ? '32px' : 4}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text fontSize={'HSM'} fontWeight={600} color={'gray.700'}>
            {t('feedback.defineActions.title') || 'Define the actions'}
          </Text>
          <Text mt={2} fontSize={'TMD'} fontWeight={400} color={'gray.700'}>
            {t('feedback.defineActions.subtitle') ||
              'Define with the teacher what actions they will take to improve this teaching practice'}
          </Text>

          <VStack mt={7} space={5}>
            {competencies.map((competence, index) => (
              <SimpleAccordion
                key={competence.id}
                title={competence.title}
                startCollapsed={index !== 0}
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
                  <VStack>
                    <Text fontSize={'LMD'} fontWeight={500} color={'gray.700'}>
                      {t('feedback.defineActions.actionsToImprove') ||
                        'Actions to improve'}
                    </Text>
                    <Text fontSize={'TXS'} fontWeight={400} color={'gray.600'}>
                      {t('feedback.defineActions.describeActions') ||
                        "Describe the actions you and the teacher agreed they're going to take to improve in this teaching practice"}
                    </Text>
                    <Controller
                      control={control}
                      rules={{required: true}}
                      name={competence.id}
                      render={({field, fieldState}) => (
                        <TextArea
                          mt={2}
                          isInvalid={!!fieldState.error}
                          autoCompleteType={''}
                          placeholder={
                            t('feedback.defineActions.textAreaPlaceholder') ||
                            'e.g. Be more aware of the way they talk to students'
                          }
                          onChangeText={field.onChange}
                          {...field}
                        />
                      )}
                    />
                  </VStack>
                }
              />
            ))}
          </VStack>

          <VStack>
            <HStack alignItems={'center'} mt={6}>
              <Text
                fontSize={'TXL'}
                flex={1}
                fontWeight={700}
                color={'gray.700'}>
                {t('feedback.defineActions.uploadImage') || 'Upload a image'}
              </Text>
              <Text fontSize={'TXS'} fontWeight={400} color={'gray.600'}>
                {t('feedback.defineActions.optional') || 'Optional'}
              </Text>
            </HStack>

            <Text mt={1} fontSize={'TXS'} fontWeight={400} color={'gray.600'}>
              {t('feedback.defineActions.sendPicture') ||
                'You can also send a picture of the annotations you made during the class observation and mentoring session'}
            </Text>

            <Button
              mt={2}
              variant={'outline'}
              borderColor={'primary.200'}
              onPress={() =>
                setBottomSheetContent(
                  <ImagePicker
                    handleSelectImage={asset =>
                      setImages([...images, {...asset, created_at: Date.now()}])
                    }
                    handleClose={() => setBottomSheetContent(undefined)}
                  />,
                )
              }>
              <HStack>
                <Icon name={'image'} color={theme.colors.primary['200']} />
                <Text
                  ml={2}
                  fontSize={'LMD'}
                  fontWeight={500}
                  color={'primary.200'}>
                  {t('feedback.defineActions.uploadPhoto') || 'Upload a photo'}
                </Text>
              </HStack>
            </Button>

            <VStack flex={1} space={2} mt={6}>
              {images.map((image, index) => (
                <ImageCard
                  {...image}
                  key={index}
                  transformBase
                  handleDelete={() => {
                    const imageCopy = images;
                    imageCopy.splice(index, 1);
                    setImages(JSON.parse(JSON.stringify(imageCopy)));
                  }}
                />
              ))}
            </VStack>
          </VStack>
        </ScrollView>
      </VStack>

      <VStack
        px={isTablet ? '32px' : 4}
        background={'white'}
        pt={3}
        borderRadius={'8px 8px 0px 0px'}>
        <Button
          onPress={handleSubmit(handleSubmitForm)}
          marginTop={'auto'}
          variant={'solid'}
          borderRadius={'8px'}
          color={'white'}
          isLoading={isSubmitting}
          background={'primary.200'}>
          {t('feedback.defineActions.button') || 'Finish coach session'}
        </Button>
      </VStack>
    </VStack>
  );
};

export default DefineActions;
