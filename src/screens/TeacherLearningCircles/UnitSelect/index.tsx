import React, {useState} from 'react';
import Page from '../../../components/Page';
import {useTranslation} from 'react-i18next';
import LoadingBar from '../LoadingBar';
import {Button, FlatList, HStack, Radio, Text, VStack} from 'native-base';
import {useNavigate} from 'react-router-native';
import PathRoutes from '../../../routers/paths';
import {TouchableOpacity} from 'react-native';

const unitsMock = [
  {
    title: 'Unit 1',
    subtitle: 'Using Positive language',
  },
  {
    title: 'Unit 2',
    subtitle: 'Clearly stating the objectives of the lesson',
  },
  {
    title: 'Unit 3',
    subtitle: 'Checking for understanding',
  },
];

const TLCUnitSelect: React.FC = () => {
  const [currentUnit, setCurrentUnit] = useState<number>();
  const navigate = useNavigate();
  const {t} = useTranslation();

  return (
    <Page
      setting
      back
      title={t('tlc.page_title')}
      beforePageEl={<LoadingBar />}>
      <VStack flex={1}>
        <Text fontSize={'HSM'} fontWeight={600} color={'gray.700'}>
          Choose unit
        </Text>
        <Text mb={4} fontSize={'TMD'} fontWeight={400} color={'gray.700'}>
          Each unit focus on one key teaching practice for teachers to learn
          from ans with each other
        </Text>

        <FlatList
          data={unitsMock}
          renderItem={({item, index}) => (
            <TouchableOpacity onPress={() => setCurrentUnit(index)}>
              <HStack
                flex={1}
                py={4}
                borderBottomWidth={1}
                borderBottomColor={'gray.300'}
                alignItems={'center'}>
                <VStack flex={1}>
                  <Text fontSize={'LMD'} fontWeight={500} color={'gray.700'}>
                    {item.title}
                  </Text>
                  <Text fontSize={'TSM'} fontWeight={400} color={'gray.600'}>
                    {item.subtitle}
                  </Text>
                </VStack>

                <Radio.Group
                  name={'select radio box'}
                  accessibilityLabel="favorite number"
                  value={currentUnit?.toString()}>
                  <Radio aria-label={item.title} value={index.toString()}>
                    <></>
                  </Radio>
                </Radio.Group>
              </HStack>
            </TouchableOpacity>
          )}
        />
      </VStack>

      <Button
        pt={4}
        variant={'solid'}
        borderRadius={'8px'}
        color={'white'}
        background={'primary.200'}
        isDisabled={currentUnit === undefined}
        onPress={() =>
          navigate(PathRoutes.teacherLearningCircles.introduction)
        }>
        {t('tlc.checkingStats.button')}
      </Button>
    </Page>
  );
};

export default TLCUnitSelect;
