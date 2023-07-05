import React from 'react';
import {Center, HStack, Image, Text, VStack, useTheme} from 'native-base';
import Button from '../../../../components/Button';
import Icon from '../../../../components/Icon';
import {useTranslation} from 'react-i18next';

type Props = {
  name: string;
  school: string;
  image?: string;
  subject?: string;
  onEditPress: () => void;
};

const TeacherHeader: React.FC<Props> = ({
  name,
  image,
  subject,
  school,
  onEditPress,
}) => {
  const {t} = useTranslation();
  const theme = useTheme();

  return (
    <VStack mb="16px">
      <HStack
        w={'100%'}
        mb={'8px'}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <Center
          w={'48px'}
          h={'48px'}
          borderRadius={'500px'}
          background={'primary.100'}>
          {image ? (
            <Image
              w={'100%'}
              h={'100%'}
              alt={'Teacher image'}
              borderRadius={'500px'}
              source={{uri: image}}
            />
          ) : (
            <Icon name={'user'} />
          )}
        </Center>

        <Button variant={'outlined'} onPress={onEditPress}>
          <HStack>
            <Icon name={'pen'} color={theme.colors.primary['200']} />
            <Text
              ml="8px"
              fontSize={'LMD'}
              fontWeight={500}
              color={'primary.200'}>
              {t('teacher.details.editTeacher')}
            </Text>
          </HStack>
        </Button>
      </HStack>

      <Text mb="8px" fontSize={'HXS'} fontWeight={600} color={'gray.800'}>
        {name}
      </Text>

      <Text fontSize={'TMD'} fontWeight={400} color={'gray.800'}>
        {t('teacher.details.description', {subject, school})}
      </Text>
    </VStack>
  );
};

export default TeacherHeader;
