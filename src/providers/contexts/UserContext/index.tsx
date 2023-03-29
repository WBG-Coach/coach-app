import React, {useContext, useState} from 'react';
import {getWatermelon} from '../../../database';
import School from '../../../database/models/School';
import {IUser} from '../../../types';

export type UserContextProps = {
  handleLogin: (user: IUser) => Promise<void>;
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

  const handleLogin = async (newUser: IUser) => {
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{handleLogin, user}}>
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
