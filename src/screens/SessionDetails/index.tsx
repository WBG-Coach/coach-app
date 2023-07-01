import React from 'react';
import {FlatList, HStack, Text, VStack} from 'native-base';
import {getTags} from '../../components/StarsTag/common';
import StarView from '../../components/StarView';
import {useLocation, useNavigate} from 'react-router-native';
import {TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Session} from '../../types/session';
import Page from '../../components/Page';
import Icon from '../../components/Icon';
import moment from 'moment';
import PathRoutes from '../../routers/paths';

const SessionDetailsScreen: React.FC = () => {
  const {t} = useTranslation();
  const {state} = useLocation();
  const session: Session = state;
  const navigate = useNavigate();

  const options = [
    {
      icon: 'clipboard-notes',
      label: 'Observation',
      onPress: () => {},
    },
    {
      icon: 'comment-verify',
      label: 'Feedback',
      onPress: session.feedback_id
        ? () => {}
        : () =>
            navigate(
              PathRoutes.feedbackSession.about.replace(
                ':sessionId',
                session.id,
              ),
            ),
    },
  ];

  return (
    <Page back title={t('sessionDetails.title')}>
      <HStack alignItems={'center'} w={'100%'} py={6}>
        <VStack flex={1} space={2} alignItems={'flex-start'}>
          <Text fontSize={'HXS'} fontWeight={600} color={'gray.700'}>
            {t('teacher.tabs.session.session') || 'Session'} 2
          </Text>
          <Text fontSize={'TMD'} fontWeight={400} color={'gray.700'}>
            {moment(new Date(new Date(session.created_at))).format(
              'DD MMM, YYYY - HH:mm',
            )}
          </Text>
        </VStack>
        <VStack alignItems={'flex-end'} space={1}>
          <StarView maxLength={5} value={0} />
          <Text
            textAlign={'center'}
            fontSize={'TMD'}
            fontWeight={400}
            color={'gray.600'}>
            {getTags(t)[0]?.label}
          </Text>
        </VStack>
      </HStack>

      <Text fontSize={'LMD'} fontWeight={500} color={'gray.700'}>
        {t('teacher.tabs.session.selectCoach') || 'Select coaching part'}
      </Text>
      <Text mt={1} fontSize={'TXS'} fontWeight={400} color={'gray.600'}>
        {t('teacher.tabs.session.viewSummary') ||
          'You can view the summary of the observation or the feedback you had with the teacher'}
      </Text>

      <VStack flex={1} mt={4} w={'100%'}>
        <FlatList
          data={options}
          flex={1}
          renderItem={({item}) => (
            <TouchableOpacity onPress={item.onPress}>
              <HStack
                borderBottomWidth={'1px'}
                borderBottomColor={'gray.200'}
                flex={1}
                py={3}
                alignItems={'center'}>
                <HStack flex={1} space={2} alignItems={'center'}>
                  <Icon name={item.icon} />
                  <Text
                    textAlign={'center'}
                    fontSize={'LMD'}
                    fontWeight={500}
                    color={'gray.700'}>
                    {item.label}
                  </Text>
                </HStack>
                <Icon name={'angle-right'} />
              </HStack>
            </TouchableOpacity>
          )}
        />
      </VStack>
    </Page>
  );
};

export default SessionDetailsScreen;
