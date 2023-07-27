import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import {StorageService} from '../services/storage.service';
import {CoachService} from '../services/coach.service';
import {School} from '../types/school';
import {Button, HStack, Modal, useToast, Text} from 'native-base';
import {Coach} from '../types/coach';
import Toast from '../components/Toast';
import {useTranslation} from 'react-i18next';

type CoachContextType = {
  currentCoach: Coach | null;
  currentSchool: School | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  selectSchool: (school: School | null) => void;
  addTeacherInCurrentSchool: () => void;
};

const CoachContext = createContext<CoachContextType | null>(null);

const CoachProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [currentCoach, setCurrentCoach] = useState<Coach | null>(null);
  const [currentSchool, setCurrentSchool] = useState<School | null>(null);
  const [showStartOver, setShowStartOver] = useState(false);
  const {t} = useTranslation();
  const toast = useToast();

  useEffect(() => {
    StorageService.getCurrentCoach().then(setCurrentCoach);
    StorageService.getCurrentSchool().then(setCurrentSchool);
  }, []);

  const login = async (username: string, password: string) => {
    const coachLogged = await CoachService.login(username, password);
    if (coachLogged) {
      setCurrentCoach(coachLogged);
      await StorageService.setCurrentCoach(coachLogged);
    } else {
      toast.show({
        placement: 'top',
        render: () => (
          <Toast
            type="error"
            icon="exclamation-circle-solid"
            title={t('login.loginError')}
            description={t('login.invalidUserPassword')}
          />
        ),
      });
    }
  };

  const selectSchool = async (school: School | null) => {
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
    setCurrentSchool(null);
    setCurrentCoach(null);

    setShowStartOver(false);
  };

  const addTeacherInCurrentSchool = () => {
    if (currentSchool) {
      selectSchool({
        ...currentSchool,
        teachersCount: currentSchool.teachersCount + 1,
      });
    }
  };

  return (
    <CoachContext.Provider
      value={{
        login,
        logout,
        selectSchool,
        currentCoach,
        currentSchool,
        addTeacherInCurrentSchool,
      }}>
      <Modal isOpen={showStartOver}>
        <Modal.Content bg={'white'} p={4}>
          <Text
            fontWeight={600}
            fontSize={'HXS'}
            mb={6}
            textAlign={'center'}
            color={'black'}>
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
              onPress={logout}>
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
