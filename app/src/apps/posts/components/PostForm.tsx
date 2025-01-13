import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box } from '@mui/material';
import { CreatePostDto } from '../types/post.types';

interface PostFormProps {
  initialData?: Partial<CreatePostDto>;
  onSubmit: (data: CreatePostDto) => void;
  userId: number;
}

export const PostForm: React.FC<PostFormProps> = ({ initialData, onSubmit, userId }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<CreatePostDto>({
    defaultValues: initialData || { user_id: userId },
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Title"
        {...register('title', { required: 'Title is required' })}
        error={!!errors.title}
        helperText={errors.title?.message}
      />
      <TextField
        label="Body"
        multiline
        rows={4}
        {...register('body', { required: 'Body is required' })}
        error={!!errors.body}
        helperText={errors.body?.message}
      />
      <Button type="submit" variant="contained" color="primary">
        {initialData ? 'Update Post' : 'Create Post'}
      </Button>
    </Box>
  );
};
