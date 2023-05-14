import React, {useContext, useState} from 'react';
import Image from '../../../database/models/Image';
import School from '../../../database/models/School';
import Session from '../../../database/models/Session';
import Teacher from '../../../database/models/Teacher';
import {IUser} from '../../../types';

export type TeachersWithSession = Omit<Teacher, 'sessions'> & {
  sessions: Session[];
  image: Image;
};

export type UserContextProps = {
  handleSelectProfile: (user: IUser) => Promise<void>;
  handleSelectSchool: (school: School) => Promise<void>;
  teacher?: TeachersWithSession;
  setTeacher: (teacher: TeachersWithSession) => void;
  handleSwitchSchool: () => void;
  user?: IUser;
};

export const UserContext = React.createContext<UserContextProps>(
  {} as UserContextProps,
);

interface Props {
  children: React.ReactNode;
}

const UserContextProvider = ({children}: Props) => {
  const [user, setUser] = useState<IUser>();
  const [teacher, setTeacher] = useState<TeachersWithSession>();

  const handleSelectProfile = async (newUser: IUser) => {
    setUser({...user, ...newUser});
  };

  const handleSelectSchool = async (school: School) => {
    setUser({...((user || {}) as any), school});
  };

  const handleSwitchSchool = async () => {
    if (user) {
      setUser({...user, school: undefined});
    }
  };

  return (
    <UserContext.Provider
      value={{
        handleSelectProfile,
        handleSelectSchool,
        user,
        teacher,
        setTeacher,
        handleSwitchSchool,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (context) return context;

  throw new Error('useUserContext must be used within a UserContextProvider.');
};

export default UserContextProvider;
