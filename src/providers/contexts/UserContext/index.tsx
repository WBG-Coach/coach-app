import React, {useContext, useState} from 'react';
import Image from '../../../database/models/Image';
import Session from '../../../database/models/Session';
import Teacher from '../../../database/models/Teacher';
import {IUser} from '../../../types';

export type TeachersWithSession = Omit<Teacher, 'sessions'> & {
  sessions: Session[];
  image: Image;
};

export type UserContextProps = {
  handleLogin: (user: IUser) => Promise<void>;
  teacher?: TeachersWithSession;
  setTeacher: (teacher: TeachersWithSession) => void;
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

  const handleLogin = async (newUser: IUser) => {
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{handleLogin, user, teacher, setTeacher}}>
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
