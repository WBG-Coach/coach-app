import React from 'react';
import {Center, HStack, Image, Text, VStack, useTheme} from 'native-base';
import {isTablet as Tablet} from 'react-native-device-info';
import {TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {TeacherItemType} from '../../../../../types/teacher';
import Icon from '../../../../../components/Icon';

type Props = {
  teacher: TeacherItemType;
  onPress: () => void;
};

const TeacherItem: React.FC<Props> = ({onPress, teacher}) => {
  const isTablet = Tablet();
  const theme = useTheme();
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

            <Text fontSize={'TSM'} fontWeight={400} color={'gray.600'}>
              {t('home.pending.list_subtitle')}
            </Text>
          </VStack>
        </HStack>

        <HStack space={'4px'}>
          <Icon
            color={theme.colors.yellow['200']}
            name={'exclamation-circle-solid'}
          />
          <Icon name={'angle-right'} />
        </HStack>
      </HStack>
    </TouchableOpacity>
  );
};

export default TeacherItem;
