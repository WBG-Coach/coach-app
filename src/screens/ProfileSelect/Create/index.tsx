import {isTablet as Tablet} from 'react-native-device-info';
import {
  Button,
  Center,
  Input,
  ScrollView,
  Text,
  VStack,
  HStack,
  Image as CImage,
} from 'native-base';
import React, {useState} from 'react';
import {useBottomSheetProvider} from '../../../providers/contexts/BottomSheetContext';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from '../../../components/base/Icon';
import ImagePicker from '../../../components/ImagePicker';
import Navigation from '../../../services/navigation';
import Routes from '../../../routes/paths';
import * as RNC from 'react-native-compressor';
import RNFS from 'react-native-fs';
import {getWatermelon} from '../../../database';
import Image from '../../../database/models/Image';
import User from '../../../database/models/User';

const ProfileCreateScreen: React.FC = () => {
  const isTablet = Tablet();
  const {t} = useTranslation();
  const defaultValues = {} as any;
  const {
    control,
    formState: {isSubmitting},
    handleSubmit,
  } = useForm({defaultValues});
  const [{}, {setBottomSheetContent}] = useBottomSheetProvider();
  const [profileImage, setProfileImage] = useState<{
    name: string;
    value: string;
  }>();

  const handleSubmitProfile: SubmitHandler<typeof defaultValues> = async (
    values: Partial<User>,
  ) => {
    const db = await getWatermelon();
    let image = values.image;

    if (profileImage) {
      const newImg = await RNC.Image.compress(profileImage.value, {
        maxWidth: 100,
        maxHeight: 100,
        quality: 0.8,
      });

      const base64 =
        'data:image/png;base64,' + (await RNFS.readFile(newImg, 'base64'));

      image = await db.write(
        async () =>
          await db.collections.get<Image>('image').create(record => {
            record.name = profileImage.name;
            record.value = base64;
          }),
      );
    }

    const user = await db.write(
      async () =>
        await db.collections.get<User>('user').create(record => {
          record.name = values.name;
          record.surname = values.surname;
          record.image_id = image?.id;
          record.emis_number = values.emis_number;
        }),
    );

    Navigation.reset(Routes.setupUserData.profileSelect.created, {
      user: user._raw,
    });
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
          {t('setupUserData.profileSelect.create.title') ||
            'Create new profile'}
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
                    <CImage
                      src={profileImage?.value || value._raw.value}
                      w={'56px'}
                      h={'56px'}
                      borderRadius={'500px'}
                      alt={'User image'}
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
                {t('setupUserData.profileSelect.create.takePhoto') ||
                  'Take/choose photo'}
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
                  {t('setupUserData.profileSelect.create.name') || 'First name'}
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
                  {t('setupUserData.profileSelect.create.surname') ||
                    'Last name'}
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
                    {t('setupUserData.profileSelect.create.emis') ||
                      'EMIS number'}
                  </Text>
                  <Text fontSize={'TXS'} fontWeight={400} color={'gray.600'}>
                    {t('setupUserData.profileSelect.create.optional') ||
                      'Optional'}
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
        {t('setupUserData.profileSelect.create.button') || 'Add profile'}
      </Button>
    </VStack>
  );
};

export default ProfileCreateScreen;
