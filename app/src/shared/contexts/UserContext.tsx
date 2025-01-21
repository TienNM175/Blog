import  { createContext, useContext} from 'react';
import { User } from '@/apps/users/types/user.types';

interface UserContextType {
  getUser: (id: number) => Promise<User>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};