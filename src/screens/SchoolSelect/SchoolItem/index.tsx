import {TouchableOpacity} from 'react-native';
import School from '../../../database/models/School';
import {Center, HStack, Text, VStack} from 'native-base';
import Icon from '../../../components/base/Icon';
import {useTranslation} from 'react-i18next';
import {useMemo} from 'react';

type Props = {
  school: School;
  isFirst?: boolean;
  index?: string | number;
  onPress: () => void;
};

const SchoolItem: React.FC<Props> = ({school, index, isFirst, onPress}) => {
  const {t} = useTranslation();

  return useMemo(
    () => (
      <TouchableOpacity key={index} onPress={onPress}>
        <HStack
          w={'100%'}
          py={'18px'}
          alignItems={'center'}
          borderTopWidth={'1px'}
          borderColor={isFirst ? 'transparent' : 'gray.200'}>
          <Center
            w={'40px'}
            h={'40px'}
            borderRadius={'500px'}
            background={'primary.100'}>
            <Icon name={'university'} />
          </Center>

          <VStack flex={1} ml={'8px'} space={'4px'}>
            <Text color={'gray.700'}>{school.name}</Text>
            <Text color={'gray.600'}>
              {(school.teachers as any).length}{' '}
              {t('setupUserData.schoolSelect.lineDesc')}
            </Text>
          </VStack>

          <Icon name={'angle-right'} />
        </HStack>
      </TouchableOpacity>
    ),
    [],
  );
};

export default SchoolItem;
