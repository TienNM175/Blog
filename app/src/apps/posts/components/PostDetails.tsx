import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Dialog,
} from "@mui/material";
import { postApi } from "../services/postApi";
import { Error } from "@/shared/components/Error";
import { Loading } from "@/shared/components/Loading";
import { PostForm } from "./PostForm";
import { CommentList } from "@/apps/comments/components/CommentList";

export const PostDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const postId = parseInt(id!, 10);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);

  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => postApi.getPostById(postId),
  });

  const deleteMutation = useMutation({
    mutationFn: postApi.deletePost,
    onSuccess: () => {
      navigate(-1);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      postApi.updatePost(id, data),
    onSuccess: () => {
      setIsEditDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <Error message={(error as Error).message} />;
  if (!post) return <Error message="Post not found" />;

  return (
    <>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5">{post.title}</Typography>
          <Typography sx={{ mt: 2 }}>{post.body}</Typography>

          <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setIsEditDialogOpen(true)}
            >
              Edit Post
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to delete this post?")
                ) {
                  deleteMutation.mutate(postId);
                }
              }}
            >
              Delete Post
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Dialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Edit Post
          </Typography>
          <PostForm
            initialData={post}
            onSubmit={(data) => {
              updateMutation.mutate({ id: postId, data });
            }}
            userId={post.user_id}
          />
        </Box>
      </Dialog>

      <Typography variant="h6" sx={{ mb: 2 }}>
        Comments
      </Typography>
      <CommentList postId={postId} />
    </>
  );
};
