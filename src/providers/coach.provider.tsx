import React, {createContext, useState, useContext, ReactNode} from 'react';
import {StorageService} from '../services/storage.service';
import {SchoolService} from '../services/school.service';
import {Button, HStack, Modal, Text} from 'native-base';
import {useTranslation} from 'react-i18next';
import {School} from '../types/school';
import {Coach} from '../types/coach';
import {useNavigate} from 'react-router-native';
import PathRoutes from '../routers/paths';
import {CoachService} from '../services/coach.service';
import {CoachSchool} from '../types/coach_school';
import {SessionService} from '../services/session.service';

type CoachContextType = {
  currentCoach: Coach | null;
  currentSchool: School | null;
  logout: () => Promise<void>;
  loginOTP: (coach: Coach) => Promise<void>;
  selectCoach: (coach: Coach | null) => Promise<void>;
  selectSchool: (school: School | null) => Promise<void>;
};

const CoachContext = createContext<CoachContextType | null>(null);

const CoachProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [currentCoach, setCurrentCoach] = useState<Coach | null>(null);
  const [currentSchool, setCurrentSchool] = useState<School | null>(null);
  const [showStartOver, setShowStartOver] = useState(false);
  const navigate = useNavigate();
  const {t} = useTranslation();

  const selectCoach = async (coach: Coach | null) => {
    setCurrentCoach(coach);
    await StorageService.setCurrentCoach(coach);
  };

  const loginOTP = async (coach: Coach) => {
    setCurrentCoach(coach);

    await CoachService.insertOrUpdateCoach(coach);

    if (coach.coachSchools) {
      await Promise.all(
        coach.coachSchools.map(async ({school}: CoachSchool) => {
          if (school) {
            await SchoolService.insertASchoolFromServer(school);
          }
        }),
      );

      await Promise.all(
        coach.coachSchools.map(coachSchool =>
          CoachService.insertOrUpdateCoachSchool(coachSchool),
        ),
      );
    }

    if (coach.sessions) {
      await SessionService.insertSessionsFromServer(coach.sessions);
    }

    await StorageService.setCurrentCoach(coach);
  };

  const selectSchool = async (school: School | null) => {
    if (school) {
      await SchoolService.insertASchoolFromServer(school);

      if (currentCoach) {
        await CoachService.assignCoachToSchool(currentCoach, school);
      }
    }

    setCurrentSchool(school);
    await StorageService.setCurrentSchool(school);
  };

  const logout = async () => {
    if (!showStartOver) {
      setShowStartOver(true);
      return;
    }

    await StorageService.setCurrentSchool(null);
    await StorageService.setCurrentCoach(null);
    await SchoolService.cleanData();

    setCurrentCoach(null);
    setCurrentSchool(null);
    setShowStartOver(false);

    navigate(PathRoutes.splash, {replace: true});
  };

  return (
    <CoachContext.Provider
      value={{
        logout,
        loginOTP,
        selectCoach,
        selectSchool,
        currentCoach,
        currentSchool,
      }}>
      <Modal isOpen={showStartOver}>
        <Modal.Content bg={'white'} p={4}>
          <Text
            mb={6}
            color={'black'}
            fontSize={'HXS'}
            fontWeight={600}
            textAlign={'center'}>
            {t('logout.title')}
          </Text>

          <HStack space={4}>
            <Button
              flex={1}
              color={'white'}
              variant={'solid'}
              marginTop={'auto'}
              borderRadius={'8px'}
              background={'primary.200'}
              onPress={() => logout()}>
              {t('logout.confirm-button')}
            </Button>
            <Button
              flex={1}
              variant={'solid'}
              marginTop={'auto'}
              borderRadius={'8px'}
              background={'transparent'}
              onPress={() => setShowStartOver(false)}>
              <Text color={'primary.200'}>{t('logout.cancel-button')}</Text>
            </Button>
          </HStack>
        </Modal.Content>
      </Modal>
      {children}
    </CoachContext.Provider>
  );
};

const useCoachContext = (): CoachContextType => {
  const coachContext = useContext(CoachContext);

  if (!coachContext) {
    throw new Error('useCoachContext error');
  }

  return coachContext;
};

export {CoachProvider, useCoachContext};
