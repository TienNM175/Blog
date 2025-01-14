import api from '@/shared/config/axios';
import { User } from '../types/user.types';
import { PaginationParams } from '@/shared/types/common.types';

export const userApi = {
  getUsers: async ({ page, per_page }: PaginationParams) => {
    const response = await api.get<User[]>(`/users`, {
      params: { page, per_page },
    });
    return response.data;
  },

  getUserById: async (id: number) => {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },
};