import {HStack, Image, Text, VStack} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import Icon from '../../components/base/Icon';
import {TouchableOpacity} from 'react-native';
import Input from '../../components/base/Input';
import {getWatermelon} from '../../database';
import School from '../../database/models/School';
import {isTablet as Tablet} from 'react-native-device-info';
import {useTranslation} from 'react-i18next';
import {UserContext} from '../../providers/contexts/UserContext';

const SchoolSelectScreen = () => {
  const [schoolList, setSchoolList] = useState<School[]>();
  const {handleSelectSchool} = useContext(UserContext);
  const {t} = useTranslation();
  const isTablet = Tablet();

  useEffect(() => {
    (async () => {
      const db = await getWatermelon();
      const list = await db.collections.get<School>('school').query().fetch();

      setSchoolList(list);
    })();
  }, []);

  return (
    <VStack flex={1}>
      {schoolList ? (
        <VStack
          w={'100%'}
          alignItems={'flex-start'}
          px={isTablet ? '64px' : '16px'}
          mt={isTablet ? '64px' : '24px'}>
          <Text
            fontSize={'HSM'}
            fontWeight={600}
            color={'gray.700'}
            mb={'16px'}>
            {t('setupUserData.schoolSelect.title')}
          </Text>

          <Input icon="search" marginBottom={2} mb={2} placeholder={'Search'} />

          <VStack w={'100%'} px={'16px'}>
            {schoolList.map((school, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelectSchool(school._raw as any)}>
                <HStack
                  w={'100%'}
                  py={'18px'}
                  borderBottomWidth={'1px'}
                  alignItems={'center'}
                  borderBottomColor={
                    schoolList.length - 1 === index ? 'transparent' : 'gray.200'
                  }>
                  <Image
                    w={'40px'}
                    h={'40px'}
                    src={school.image_url}
                    alt={`Image of ${school.name}`}
                    borderRadius={'20px'}
                  />

                  <VStack flex={1} ml={'8px'} space={'4px'}>
                    <Text color={'gray.700'}>{school.name}</Text>
                    <Text color={'gray.600'}>
                      4 {t('setupUserData.schoolSelect.lineDesc')}
                    </Text>
                  </VStack>

                  <Icon name={'angle-right'} />
                </HStack>
              </TouchableOpacity>
            ))}
          </VStack>
        </VStack>
      ) : (
        <></>
      )}
    </VStack>
  );
};

export default SchoolSelectScreen;
