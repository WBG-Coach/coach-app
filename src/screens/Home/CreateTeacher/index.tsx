import {isTablet as Tablet} from 'react-native-device-info';
import {
  Box,
  Button,
  Center,
  HStack,
  Image as CImage,
  Input,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import React, {useContext, useState} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import Teacher from '../../../database/models/Teacher';
import Icon from '../../../components/base/Icon';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import moment from 'moment';
import {useBottomSheetProvider} from '../../../providers/contexts/BottomSheetContext';
import ImagePicker from '../../../components/ImagePicker';
import RNFS from 'react-native-fs';
import {getWatermelon} from '../../../database';
import Image from '../../../database/models/Image';
import {UserContext} from '../../../providers/contexts/UserContext';
import School from '../../../database/models/School';
import Navigation from '../../../services/navigation';
import Routes from '../../../routes/paths';

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
  } = useForm({defaultValues});
  const [teacherImage, setTeacherImage] = useState<{
    name: string;
    value: string;
  }>();

  const handleSubmitTeacher: SubmitHandler<typeof defaultValues> = async (
    values: Partial<Teacher>,
  ) => {
    if (user && user.school) {
      const db = await getWatermelon();
      let image = values.image;

      if (teacherImage) {
        const base64 = await RNFS.readFile(teacherImage.value, 'base64');

        if (image) {
          //do logic to update image in bd
        } else {
          image = await db.write(
            async () =>
              await db.collections.get<Image>('image').create(record => {
                record.name = teacherImage.name;
                record.value = 'data:image/png;base64,' + base64;
              }),
          );
        }
      }

      if ('id' in values) {
        //do logic to update user in db
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
              record.school_id = (user.school as School).id;
            }),
        );
      }
    }

    Navigation.reset(Routes.teacher.created);
  };

  return (
    <VStack
      safeAreaBottom
      my={isTablet ? '64px' : 6}
      px={isTablet ? '64px' : 4}
      flex={1}>
      <ScrollView>
        <Text fontSize={'HSM'} fontWeight={600} color={'gray.700'}>
          Add a new teacher
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
                Take/choose photo
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
                  First name
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
                  Last name
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
                  EMIS number
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
                  Principal subject
                </Text>
                <Input
                  {...field}
                  onChangeText={field.onChange}
                  isInvalid={!!error}
                  variant={'outline'}
                  placeholder={'e.g. Math'}
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
                  Date of birth
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    DateTimePickerAndroid.open({
                      value: field.value ? new Date(field.value) : new Date(),
                      onChange: e => field.onChange(e.nativeEvent.timestamp),
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
        Add teacher
      </Button>
    </VStack>
  );
};

export default TeacherCreateScreen;
