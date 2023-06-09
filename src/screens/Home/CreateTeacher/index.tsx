/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import {isTablet as Tablet} from 'react-native-device-info';
import {
  Button,
  Center,
  HStack,
  Image as CImage,
  Input,
  ScrollView,
  Spinner,
  Text,
  VStack,
} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import Teacher from '../../../database/models/Teacher';
import Icon from '../../../components/base/Icon';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import moment from 'moment';
import {useBottomSheetProvider} from '../../../providers/contexts/BottomSheetContext';
import ImagePicker from '../../../components/ImagePicker';
import RNFS from 'react-native-fs';
import {getWatermelon} from '../../../database';
import Image from '../../../database/models/Image';
import {UserContext} from '../../../providers/contexts/UserContext';
import Navigation from '../../../services/navigation';
import Routes from '../../../routes/paths';
import * as RNC from 'react-native-compressor';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity} from 'react-native';

type Props = {
  route: {
    params: {
      teacher_id: Teacher['id'];
    };
  };
};

const TeacherCreateScreen: React.FC<any> = ({route: {params}}: Props) => {
  const isTablet = Tablet();
  const {teacher_id} = params;
  const defaultValues = {} as Teacher;
  const {user} = useContext(UserContext);
  const [{}, {setBottomSheetContent}] = useBottomSheetProvider();
  const {
    control,
    handleSubmit,
    formState: {isSubmitting},
    watch,
    reset,
  } = useForm({defaultValues});
  const [teacherImage, setTeacherImage] = useState<{
    name: string;
    value: string;
  }>();

  useEffect(() => {
    if (teacher_id) {
      (async () => {
        const db = await getWatermelon();
        const teacher = (
          await db.collections.get<Teacher>('teacher').find(teacher_id)
        )._raw;

        if ((teacher as any).image_id) {
          const image = await db.collections
            .get<Teacher>('image')
            .find((teacher as any).image_id);

          reset({...teacher, image});
          return;
        }

        reset({...teacher});
      })();
    }
  }, []);

  const handleSubmitTeacher: SubmitHandler<typeof defaultValues> = async (
    values: Partial<Teacher>,
  ) => {
    if (user && user.school) {
      const db = await getWatermelon();
      let image = values.image;

      if (teacherImage) {
        const newImg = await RNC.Image.compress(teacherImage.value, {
          maxWidth: 100,
          maxHeight: 100,
          quality: 0.8,
        });

        const base64 =
          'data:image/png;base64,' + (await RNFS.readFile(newImg, 'base64'));

        if (image) {
          await db.write(async () =>
            (
              await db.collections.get<Image>('image').find(image.id)
            ).update(image => {
              image.value = base64;
            }),
          );
        } else {
          image = await db.write(
            async () =>
              await db.collections.get<Image>('image').create(record => {
                record.name = teacherImage.name;
                record.value = base64;
              }),
          );
        }
      }

      if ('id' in values) {
        await db.write(async () =>
          (
            await db.collections
              .get<Teacher>('teacher')
              .find(values.id as string)
          ).update(teacher => {
            teacher.name = values.name;
            teacher.surname = values.surname;
            teacher.emis_number = parseInt(values.emis_number);
            teacher.subject = values.subject;
            teacher.birthdate = values.birthdate.toString();
            teacher.image_id = image?.id;
            teacher.school_id = (user.school as any).id;
          }),
        );
      } else {
        await db.write(
          async () =>
            await db.collections.get<Teacher>('teacher').create(record => {
              record.name = values.name;
              record.surname = values.surname;
              record.emis_number = parseInt(values.emis_number);
              record.subject = values.subject;
              record.birthdate = values.birthdate.toString();
              record.image_id = image?.id;
              record.school_id = (user.school as any).id;
            }),
        );
      }
    }

    Navigation.reset(Routes.teacher.created);
  };
  const {t} = useTranslation();
  const idWatcher = watch('id');

  return (
    <VStack
      safeAreaBottom
      my={isTablet ? '64px' : 6}
      px={isTablet ? '64px' : 4}
      flex={1}>
      {!idWatcher && teacher_id ? (
        <Center flex={1}>
          <Spinner />
        </Center>
      ) : (
        <>
          <ScrollView>
            <Text fontSize={'HSM'} fontWeight={600} color={'gray.700'}>
              {teacher_id
                ? t('teacher.create.editTeacher') || 'Edit a teacher'
                : t('teacher.create.newTeacher') || 'Add a new teacher'}
            </Text>
            <Center w={'100%'} my={6}>
              <VStack alignItems={'center'} space={1}>
                <Controller
                  control={control}
                  name={'image'}
                  render={({field: {value}}) => (
                    <Center
                      background={'primary.100'}
                      w={'56px'}
                      h={'56px'}
                      borderRadius={'500px'}>
                      {teacherImage || value ? (
                        <CImage
                          src={teacherImage?.value || value._raw.value}
                          w={'56px'}
                          h={'56px'}
                          borderRadius={'500px'}
                          alt={'Teacher image'}
                        />
                      ) : (
                        <Icon name={'user'} />
                      )}
                    </Center>
                  )}
                />

                <TouchableOpacity
                  onPress={() =>
                    setBottomSheetContent(
                      <ImagePicker
                        handleSelectImage={setTeacherImage}
                        handleClose={() => setBottomSheetContent(undefined)}
                      />,
                    )
                  }>
                  <Text fontSize={'LMD'} fontWeight={500} color={'primary.200'}>
                    {t('teacher.create.takePhoto') || 'Take/choose photo'}
                  </Text>
                </TouchableOpacity>
              </VStack>
            </Center>

            <VStack space={4} flex={1} mb={4}>
              <Controller
                control={control}
                name={'name'}
                rules={{required: true}}
                render={({field, fieldState: {error}}) => (
                  <VStack space={2}>
                    <Text fontSize={'LMD'} fontWeight={500} color={'gray.700'}>
                      {t('teacher.create.firstName') || 'First name'}
                    </Text>
                    <Input
                      {...field}
                      onChangeText={field.onChange}
                      isInvalid={!!error}
                      variant={'outline'}
                    />
                  </VStack>
                )}
              />

              <Controller
                control={control}
                name={'surname'}
                rules={{required: true}}
                render={({field, fieldState: {error}}) => (
                  <VStack space={2}>
                    <Text fontSize={'LMD'} fontWeight={500} color={'gray.700'}>
                      {t('teacher.create.lastName') || 'Last name'}
                    </Text>
                    <Input
                      {...field}
                      onChangeText={field.onChange}
                      isInvalid={!!error}
                      variant={'outline'}
                      keyboardType={'web-search'}
                    />
                  </VStack>
                )}
              />

              <Controller
                control={control}
                name={'emis_number'}
                rules={{required: true}}
                render={({field, fieldState: {error}}) => (
                  <VStack space={2}>
                    <Text fontSize={'LMD'} fontWeight={500} color={'gray.700'}>
                      {t('teacher.create.emisNumber') || 'EMIS number'}
                    </Text>
                    <Input
                      {...field}
                      onChangeText={field.onChange}
                      isInvalid={!!error}
                      variant={'outline'}
                      placeholder={'000000000'}
                      keyboardType={'number-pad'}
                    />
                  </VStack>
                )}
              />

              <Controller
                control={control}
                name={'subject'}
                rules={{required: true}}
                render={({field, fieldState: {error}}) => (
                  <VStack space={2}>
                    <Text fontSize={'LMD'} fontWeight={500} color={'gray.700'}>
                      {t('teacher.create.principalSubject') ||
                        'Principal subject'}
                    </Text>
                    <Input
                      {...field}
                      onChangeText={field.onChange}
                      isInvalid={!!error}
                      variant={'outline'}
                      placeholder={
                        t('teacher.create.principalSubjectPlaceholder') ||
                        'e.g. Math'
                      }
                    />
                  </VStack>
                )}
              />

              <Controller
                control={control}
                name={'birthdate'}
                rules={{required: true}}
                render={({field, fieldState: {error}}) => (
                  <VStack space={2}>
                    <Text fontSize={'LMD'} fontWeight={500} color={'gray.700'}>
                      {t('teacher.create.dateOfBirth') || 'Date of birth'}
                    </Text>

                    <TouchableOpacity
                      onPress={() => {
                        DateTimePickerAndroid.open({
                          value: field.value
                            ? new Date(field.value)
                            : new Date(),
                          onChange: e =>
                            field.onChange(e.nativeEvent.timestamp),
                          mode: 'date',
                          is24Hour: true,
                        });
                      }}>
                      <HStack
                        w={'100%'}
                        borderWidth={'1px'}
                        borderColor={!!error ? 'red.200' : 'gray.300'}
                        borderRadius={'8px'}
                        p={4}
                        py={3}>
                        <Text
                          fontSize={'TSM'}
                          fontWeight={400}
                          color={field.value ? 'gray.700' : 'gray.400'}>
                          {field.value
                            ? moment(new Date(field.value))
                                .format('MM/DD/YYYY')
                                .toString()
                            : 'MM/DD/YYY'}
                        </Text>
                      </HStack>
                    </TouchableOpacity>
                  </VStack>
                )}
              />
            </VStack>
          </ScrollView>

          <Button
            variant={'solid'}
            borderRadius={'8px'}
            color={'white'}
            background={'primary.200'}
            isLoading={isSubmitting}
            onPress={handleSubmit(handleSubmitTeacher)}>
            {teacher_id
              ? t('teacher.create.buttonSave') || 'Save'
              : t('teacher.create.buttonAdd') || 'Add teacher'}
          </Button>
        </>
      )}
    </VStack>
  );
};

export default TeacherCreateScreen;
