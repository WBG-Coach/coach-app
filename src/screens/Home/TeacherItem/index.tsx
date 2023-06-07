import {TouchableOpacity} from 'react-native';
import {Center, HStack, Image, Text, VStack, useTheme} from 'native-base';
import {isTablet as Tablet} from 'react-native-device-info';
import Icon from '../../../components/base/Icon';
import {useTranslation} from 'react-i18next';
import {TeachersWithSession} from '../../../providers/contexts/UserContext';

type Props = {
  teacher: TeachersWithSession;
  onPress: () => void;
};

const TeacherItem: React.FC<Props> = ({onPress, teacher}) => {
  const theme = useTheme();
  const isTablet = Tablet();
  const {t} = useTranslation();

  return (
    <TouchableOpacity onPress={onPress}>
      <HStack
        py={3}
        px={4}
        w={'100%'}
        alignItems={'center'}
        borderBottomWidth={'1px'}
        borderBottomColor={'gray.300'}>
        <HStack flex={1} space={2} alignItems={'center'}>
          <Center
            w={isTablet ? '56px' : '40px'}
            h={isTablet ? '56px' : '40px'}
            borderRadius={'500px'}
            background={'primary.100'}>
            {teacher?.image?.value ? (
              <Image
                source={{uri: teacher.image.value}}
                alt={'Teacher image'}
                w={'100%'}
                h={'100%'}
                borderRadius={'500px'}
              />
            ) : (
              <Icon name={'user'} />
            )}
          </Center>

          <VStack space={1}>
            <Text fontSize={'LLG'} fontWeight={500} color={'gray.800'}>
              {teacher.name}
            </Text>
            <Text fontSize={'TSM'} fontWeight={500} color={'gray.700'}>
              {teacher.subject}
            </Text>

            <HStack space={1}>
              {(teacher.sessions as any).length >= 1 ? (
                <HStack
                  alignItems={'center'}
                  borderRadius={'4px'}
                  background={'primary.100'}
                  px={2}
                  py={1}
                  space={1}>
                  <Icon name={'clipboard-notes-solid'} size={15} />
                  <Text fontSize={'TSM'} fontWeight={500} color={'gray.700'}>
                    {t('home.teachers.session', {
                      count: (teacher.sessions as any)?.length,
                    })}
                  </Text>
                </HStack>
              ) : (
                <HStack
                  alignItems={'center'}
                  borderRadius={'4px'}
                  background={'yellow.100'}
                  px={2}
                  py={1}
                  space={1}>
                  <Icon
                    name={'favorite-solid'}
                    size={15}
                    color={theme.colors.yellow['300']}
                  />
                  <Text fontSize={'TSM'} fontWeight={500} color={'yellow.300'}>
                    New teacher
                  </Text>
                </HStack>
              )}

              {(teacher as any).feedbacksLength >= 1 && (
                <HStack
                  alignItems={'center'}
                  borderRadius={'4px'}
                  background={'green.100'}
                  px={2}
                  py={1}
                  space={1}>
                  <Icon name={'comment-verify-solid'} size={15} />
                  <Text fontSize={'TSM'} fontWeight={500} color={'gray.700'}>
                    {(teacher as any).feedbacksLength} Feedbacks
                  </Text>
                </HStack>
              )}
            </HStack>
          </VStack>
        </HStack>
        <Icon name={'angle-right'} />
      </HStack>
    </TouchableOpacity>
  );
};

export default TeacherItem;
