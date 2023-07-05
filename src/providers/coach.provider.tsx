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
import {useToast} from 'native-base';
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
    await StorageService.setCurrentSchool(null);
    await StorageService.setCurrentCoach(null);
    setCurrentSchool(null);
    setCurrentCoach(null);
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
