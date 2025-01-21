import React from "react";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import { userApi } from "@/apps/users/services/userApi";
import { PostForm } from "./PostForm";
import { Error } from "@/shared/components/Error";
import { Loading } from "@/shared/components/Loading";
import { postApi } from "../services/postApi";
import { User } from "@/apps/users/types/user.types";
import { PAGINATION } from "@/shared/constants/pagination";

export const CreatePost: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: ({ pageParam = PAGINATION.DEFAULT_PAGE }) =>
      userApi.getUsers({
        page: pageParam,
        per_page: PAGINATION.PER_PAGE,
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === PAGINATION.PER_PAGE ? allPages.length + 1 : undefined;
    },
    initialPageParam: PAGINATION.DEFAULT_PAGE, // Initial page number
  });

  const createMutation = useMutation({
    mutationFn: ({ postData }: { postData: any }) =>
      postApi.createPost(postData),
    onSuccess: () => {
      navigate("/");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const users: User[] = data?.pages.flat() ?? [];

  if (isLoading) return <Loading />;
  if (isError) return <Error message={(error as Error).message} />;

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ mb: 4 }}>
        Create New Post
      </Typography>
      <PostForm
        onSubmit={(postData) => {
          createMutation.mutate({ postData });
        }}
        users={users}
        onLoadMore={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        hasMore={hasNextPage}
        isLoadingMore={isFetchingNextPage}
      />
    </Container>
  );
};
