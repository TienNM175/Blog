import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Card, CardContent, Typography } from "@mui/material";
import { userApi } from "../services/userApi";
import { Error } from "@/shared/components/Error";
import { Loading } from "@/shared/components/Loading";
import { PostList } from "@/apps/posts/components/PostList";

export const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const userId = parseInt(id!, 10);

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => userApi.getUserById(userId),
  });

  if (isLoading) return <Loading />;
  if (isError) return <Error message={(error as Error).message} />;
  if (!user) return <Error message="User not found" />;

  return (
    <>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5">{user.name}</Typography>
          <Typography color="textSecondary">{user.email}</Typography>
          <Typography>Gender: {user.gender}</Typography>
          <Typography>Status: {user.status}</Typography>
        </CardContent>
      </Card>

      <Typography variant="h6" sx={{ mb: 2 }}>
        User Posts
      </Typography>
      <PostList userId={userId} />
    </>
  );
};
