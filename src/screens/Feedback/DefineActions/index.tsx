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
import {launchImageLibrary} from 'react-native-image-picker';
import Navigation from '../../../services/navigation';
import Routes from '../../../routes/paths';
import Image from '../../../database/models/Image';
import {getWatermelon} from '../../../database';
import Session from '../../../database/models/Session';
import Feedback from '../../../database/models/Feedback';

type Props = {
  route: {
    params: {
      competencies: ICompetence[];
      session_id: Session['id'];
    };
  };
};

const DefineActions: React.FC<any> = ({route: {params}}: Props) => {
  const [images, setImages] = useState<Image[]>([]);
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

    await Promise.all(
      Object.keys(values).map(
        async key =>
          await db.write(
            async () =>
              await db.collections.get<Feedback>('feedback').create(record => {
                record.value = values[key];
                record.competence_id = key;
                record.session_id = params.session_id;
              }),
          ),
      ),
    );

    Navigation.navigate(Routes.feedback.feedbackCompleted);
  };

  const handleAddImage = async () => {
    const db = await getWatermelon();

    const {assets} = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
    });

    if (assets) {
      const assetsInDb = await Promise.all(
        assets?.map(
          async asset =>
            await db.write(
              async () =>
                await db.collections.get<Image>('image').create(record => {
                  record.name = asset.fileName;
                  record.value = asset.base64;
                }),
            ),
        ),
      );

      setImages([
        ...images,
        ...assetsInDb.reduce((acc, item) => {
          return [...acc, {...item._raw} as any];
        }, [] as Image[]),
      ]);
    }
  };

  return (
    <VStack flex={1} py={6} safeAreaBottom bg={'gray.0'}>
      <VStack flex={1} px={isTablet ? '64px' : 4}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text fontSize={'HSM'} fontWeight={600} color={'gray.700'}>
            Define the actions
          </Text>
          <Text mt={2} fontSize={'TMD'} fontWeight={400} color={'gray.700'}>
            Define with the teacher what actions they will take to improve this
            teaching practice
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
                      Actions to improve
                    </Text>
                    <Text fontSize={'TXS'} fontWeight={400} color={'gray.600'}>
                      Describe the actions you and the teacher agreed they're
                      going to take to improve in this teaching practice
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
                Upload a image
              </Text>
              <Text fontSize={'TXS'} fontWeight={400} color={'gray.600'}>
                Optional
              </Text>
            </HStack>

            <Text mt={1} fontSize={'TXS'} fontWeight={400} color={'gray.600'}>
              You can also send a picture of the annotations you made during the
              class observation and mentoring session
            </Text>

            <Button
              mt={2}
              variant={'outline'}
              borderColor={'primary.200'}
              onPress={handleAddImage}>
              <HStack>
                <Icon name={'image'} color={theme.colors.primary['200']} />
                <Text
                  ml={2}
                  fontSize={'LMD'}
                  fontWeight={500}
                  color={'primary.200'}>
                  Upload a photo
                </Text>
              </HStack>
            </Button>

            <VStack flex={1} space={2} mt={6} background={'red'}>
              {images.map((image, index) => (
                <HStack
                  key={index}
                  py={2}
                  px={3}
                  borderRadius={'8px'}
                  borderColor={'gray.200'}
                  borderWidth={'2px'}>
                  <Center w={'64px'} h={'64px'} background={'primary.0'}>
                    <Icon name={'image'} />
                  </Center>
                  <VStack ml={2} maxW={'50%'} overflow={'hidden'} space={0.5}>
                    <Text
                      numberOfLines={1}
                      fontSize={'LMD'}
                      fontWeight={500}
                      color={'gray.700'}>
                      {image.name}
                    </Text>
                    <Text fontSize={'TXS'} fontWeight={400} color={'gray.600'}>
                      {(image as any).created_at.toString()}
                    </Text>

                    <HStack space={1} alignItems={'center'}>
                      <Icon
                        name={'check-circle-solid'}
                        color={theme.colors.green['200']}
                        size={16}
                      />

                      <Text
                        fontSize={'TXS'}
                        fontWeight={400}
                        color={'green.300'}>
                        Image sent
                      </Text>
                    </HStack>
                  </VStack>
                </HStack>
              ))}
            </VStack>
          </VStack>
        </ScrollView>
      </VStack>

      <VStack
        px={isTablet ? '64px' : 4}
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
          Finish coach session
        </Button>
      </VStack>
    </VStack>
  );
};

export default DefineActions;
