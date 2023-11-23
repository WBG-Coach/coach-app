import React from 'react';
import {Center, HStack, Image, Text, VStack, useTheme} from 'native-base';
import {isTablet as Tablet} from 'react-native-device-info';
import {TeacherItemType} from '../../../types/teacher';
import {TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import Icon from '../../../components/Icon';
import moment from 'moment';
import i18n from '../../../i18n';

type Props = {
  customSubLabel?: string;
  teacher: TeacherItemType;
  onPress: () => void;
};

const TeacherItem: React.FC<Props> = ({onPress, teacher, customSubLabel}) => {
  const theme = useTheme();
  const isTablet = Tablet();
  const {t} = useTranslation();
  const currentLanguage = i18n.languages[0];

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
            {teacher?.image ? (
              <Image
                w={'100%'}
                h={'100%'}
                alt={'Teacher image'}
                borderRadius={'500px'}
                source={{uri: teacher.image}}
              />
            ) : (
              <Icon name={'user'} />
            )}
          </Center>

          <VStack space={1}>
            <Text fontSize={'LLG'} fontWeight={500} color={'gray.800'}>
              {teacher.name}
            </Text>

            {customSubLabel !== undefined ? (
              customSubLabel && (
                <Text fontSize={'LSM'} fontWeight={400} color={'gray.700'}>
                  {customSubLabel}
                </Text>
              )
            ) : (
              <>
                <Text fontSize={'TSM'} fontWeight={500} color={'gray.700'}>
                  {teacher.last_session_date
                    ? t('home.teachers.last-session', {
                        date: moment(teacher.last_session_date).format(
                          'DD MMM, YYYY - HH:mm',
                        ),
                      })
                    : t('home.teachers.no-session')}
                </Text>

                <HStack space={1}>
                  {teacher.sessionsCount >= 1 ? (
                    <HStack
                      px={2}
                      py={1}
                      space={1}
                      borderRadius={'4px'}
                      alignItems={'center'}
                      background={'primary.100'}>
                      <Icon name={'clipboard-notes-solid'} size={15} />
                      <Text
                        fontSize={'TSM'}
                        fontWeight={500}
                        color={'gray.700'}>
                        {t('home.teachers.session_interval', {
                          postProcess: 'interval',
                          count: teacher.sessionsCount,
                        })}
                      </Text>
                    </HStack>
                  ) : (
                    <HStack
                      px={2}
                      py={1}
                      space={1}
                      borderRadius={'4px'}
                      alignItems={'center'}
                      background={'yellow.100'}>
                      <Icon
                        size={15}
                        name={'favorite-solid'}
                        color={theme.colors.yellow['300']}
                      />
                      <Text
                        fontSize={'TSM'}
                        fontWeight={500}
                        color={'yellow.300'}>
                        New teacher
                      </Text>
                    </HStack>
                  )}

                  {teacher.feedbacksCount >= 1 && (
                    <HStack
                      px={2}
                      py={1}
                      space={1}
                      borderRadius={'4px'}
                      alignItems={'center'}
                      background={'green.100'}>
                      <Icon name={'comment-verify-solid'} size={15} />
                      <Text
                        fontSize={'TSM'}
                        fontWeight={500}
                        color={'gray.700'}>
                        {teacher.feedbacksCount} Feedback
                      </Text>
                    </HStack>
                  )}
                </HStack>
              </>
            )}
          </VStack>
        </HStack>
        <Icon name={'angle-right'} />
      </HStack>
    </TouchableOpacity>
  );
};

export default TeacherItem;
