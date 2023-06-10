import {isTablet as Tablet} from 'react-native-device-info';
import {
  Button,
  Center,
  Image,
  Input,
  ScrollView,
  Text,
  VStack,
  HStack,
  FlatList,
} from 'native-base';
import React, {useState} from 'react';
import User from '../../../database/models/User';
import {useBottomSheetProvider} from '../../../providers/contexts/BottomSheetContext';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from '../../../components/base/Icon';
import ImagePicker from '../../../components/ImagePicker';

const ProfileCreateScreen: React.FC = () => {
  const isTablet = Tablet();
  const {t} = useTranslation();
  const defaultValues = {} as User;
  const [{}, {setBottomSheetContent}] = useBottomSheetProvider();
  const {
    control,
    handleSubmit,
    formState: {isSubmitting},
  } = useForm({defaultValues});

  const [profileImage, setProfileImage] = useState<{
    name: string;
    value: string;
  }>();

  const handleSubmitProfile: SubmitHandler<typeof defaultValues> = async (
    values: Partial<Teacher>,
  ) => {
    /*    const db = await getWatermelon();
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

    await db.write(
      async () =>
        await db.collections.get<Profile>('teacher').create(record => {
          record.name = values.name;
          record.surname = values.surname;
          record.emis_number = parseInt(values.emis_number);
          record.subject = values.subject;
          record.birthdate = values.birthdate.toString();
          record.image_id = image?.id;
          record.school_id = (user.school as any).id;
        }),
    );

    Navigation.reset(Routes); */
  };

  return (
    <VStack
      flex={1}
      w={'100%'}
      alignItems={'flex-start'}
      px={isTablet ? '64px' : '16px'}
      mt={isTablet ? '64px' : '24px'}>
      <ScrollView w={'100%'}>
        <Text fontSize={'HSM'} fontWeight={600} color={'gray.700'}>
          Create new profile
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
                  {profileImage || value ? (
                    <Image
                      src={profileImage?.value || value._raw.value}
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
                    handleSelectImage={setProfileImage}
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
            name={'name'}
            rules={{required: true}}
            render={({field, fieldState: {error}}) => (
              <VStack space={2}>
                <Text fontSize={'LMD'} fontWeight={500} color={'gray.700'}>
                  Last name
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
            name={'emis_number'}
            render={({field, fieldState: {error}}) => (
              <VStack space={2}>
                <HStack
                  w={'100%'}
                  justifyContent={'space-between'}
                  alignItems={'center'}>
                  <Text fontSize={'LMD'} fontWeight={500} color={'gray.700'}>
                    {t('teacher.create.emisNumber') || 'EMIS number'}
                  </Text>
                  <Text fontSize={'TXS'} fontWeight={400} color={'gray.600'}>
                    Optional
                  </Text>
                </HStack>
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
        </VStack>
      </ScrollView>
      <Button
        mb={6}
        onPress={handleSubmit(handleSubmitProfile)}
        variant={'solid'}
        borderRadius={'8px'}
        color={'white'}
        w={'100%'}
        background={'primary.200'}
        isLoading={isSubmitting}>
        Add profile
      </Button>
    </VStack>
  );
};

export default ProfileCreateScreen;
