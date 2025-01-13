import api from '@/shared/config/axios';
import { Post, CreatePostDto } from '../types/post.types';
import { PaginationParams } from '@/shared/types/common.types';

export const postApi = {
  getPosts: async (userId: number, { page, per_page }: PaginationParams) => {
    const response = await api.get<Post[]>(`/users/${userId}/posts`, {
      params: { page, per_page },
    });
    return response.data;
  },

  getPostById: async (id: number) => {
    const response = await api.get<Post>(`/posts/${id}`);
    return response.data;
  },

  createPost: async (data: CreatePostDto) => {
    const response = await api.post<Post>('/posts', data);
    return response.data;
  },

  updatePost: async (id: number, data: Partial<CreatePostDto>) => {
    const response = await api.put<Post>(`/posts/${id}`, data);
    return response.data;
  },

  deletePost: async (id: number) => {
    await api.delete(`/posts/${id}`);
  },
};