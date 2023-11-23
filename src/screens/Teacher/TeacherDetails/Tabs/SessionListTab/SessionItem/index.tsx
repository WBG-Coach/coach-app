import React, {useEffect, useState} from 'react';
import {SessionService} from '../../../../../../services/session.service';
import {Box, HStack, Text, VStack, useTheme} from 'native-base';
import StarsTag from '../../../../../../components/StarsTag';
import {Session} from '../../../../../../types/session';
import Icon from '../../../../../../components/Icon';
import {TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import moment from 'moment';
import i18n from '../../../../../../i18n';

type Props = {
  index: number;
  session: Session;
  onPress: () => void;
};

const SessionItem: React.FC<Props> = ({onPress, session, index}) => {
  const theme = useTheme();
  const {t} = useTranslation();
  const [overallRating, setOverallRating] = useState<number>();
  const currentLanguage = i18n.languages[0];

  useEffect(() => {
    (async () => {
      const competences =
        await SessionService.getSessionAnswersCountGroupedByCompetence(
          session.id,
        );

      const overall = Math.round(
        competences.reduce(
          (acc, item) => acc + item.sumAnswers / item.totalQuestions,
          0,
        ) /
          competences.length -
          1,
      );

      setOverallRating(overall);
    })();
  }, []);

  return (
    <TouchableOpacity onPress={onPress}>
      <HStack
        py={3}
        w={'100%'}
        borderBottomWidth={'1px'}
        borderBottomColor={'gray.200'}>
        <VStack flex={1} space={2} alignItems={'flex-start'}>
          <Text fontSize={'LMD'} fontWeight={500} color={'gray.700'}>
            {t('teacher.tabs.session.session')} {index + 1}
          </Text>
          <Text fontSize={'TSM'} fontWeight={400} color={'gray.500'}>
            {moment(session.created_at)
              .lang(currentLanguage)
              .format('DD MMM, YYYY - HH:mm')}
          </Text>

          {overallRating !== undefined ? (
            <StarsTag value={overallRating} />
          ) : (
            <Box w={'104px'} h={'20px'} bg={'gray.200'} />
          )}
        </VStack>
        <HStack space={1}>
          {!session.feedback_id && (
            <Icon
              name={'exclamation-circle-solid'}
              color={theme.colors.yellow['200']}
            />
          )}

          <Icon name={'angle-right'} />
        </HStack>
      </HStack>
    </TouchableOpacity>
  );
};

export default SessionItem;
