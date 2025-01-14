import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import { User } from "@/apps/users/types/user.types";
import { CreatePostDto } from "../types/post.types";

interface PostFormProps {
  initialData?: Partial<CreatePostDto>;
  onSubmit: (data: CreatePostDto) => void;
  users: User[];
  onLoadMore: () => void;
  hasMore?: boolean;
  isLoadingMore?: boolean;
  userId?: number;
}

export const PostForm: React.FC<PostFormProps> = ({
  initialData,
  onSubmit,
  users,
  onLoadMore,
  hasMore = false,
  isLoadingMore = false,
  userId,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostDto>({
    defaultValues: {
      user_id: userId || initialData?.user_id || 0,
      title: initialData?.title || "",
      body: initialData?.body || "",
    },
  });

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const element = event.target as HTMLDivElement;
    if (
      element.scrollHeight - element.scrollTop === element.clientHeight &&
      hasMore &&
      !isLoadingMore
    ) {
      onLoadMore();
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      {!userId && (
        <Controller
          name="user_id"
          control={control}
          rules={{
            required: "Please select a user",
            validate: (value) => value > 0 || "Please select a valid user",
          }}
          render={({ field: { value, onChange, ...field } }) => (
            <FormControl error={!!errors.user_id} fullWidth>
              <InputLabel>Select User</InputLabel>
              <Select
                {...field}
                value={value || ""}
                onChange={(e) => onChange(Number(e.target.value))}
                label="Select User"
                MenuProps={{
                  PaperProps: {
                    onScroll: handleScroll,
                    style: { maxHeight: 300 },
                  },
                }}
              >
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name}
                  </MenuItem>
                ))}
                {isLoadingMore && (
                  <MenuItem disabled>
                    <Box
                      display="flex"
                      justifyContent="center"
                      width="100%"
                      py={1}
                    >
                      <CircularProgress size={20} />
                    </Box>
                  </MenuItem>
                )}
              </Select>
              {errors.user_id && (
                <FormHelperText>{errors.user_id.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />
      )}

      <Controller
        name="title"
        control={control}
        rules={{ required: "Title is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Title"
            error={!!errors.title}
            helperText={errors.title?.message}
            fullWidth
          />
        )}
      />

      <Controller
        name="body"
        control={control}
        rules={{ required: "Content is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Content"
            multiline
            rows={4}
            error={!!errors.body}
            helperText={errors.body?.message}
            fullWidth
          />
        )}
      />

      <Button type="submit" variant="contained" color="primary" size="large">
        Create Post
      </Button>
    </Box>
  );
};
