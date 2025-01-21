import React, { ReactNode } from 'react';
import { UserContext } from '@/shared/contexts/UserContext';
import { userApi } from '../services/userApi';

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const getUser = async (id: number) => {
    try {
      return await userApi.getUserById(id);
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  };

  return (
    <UserContext.Provider value={{ getUser }}>
      {children}
    </UserContext.Provider>
  );
};