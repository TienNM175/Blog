import api from '@/shared/config/axios';
import { Comment } from '../types/comment.types';
import { PaginationParams } from '@/shared/types/common.types';

export const commentApi = {
  getComments: async (postId: number, { page, per_page }: PaginationParams) => {
    const response = await api.get<Comment[]>(`/posts/${postId}/comments`, {
      params: { page, per_page },
    });
    return response.data;
  },
};