import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Dialog,
  IconButton,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { postApi } from "../services/postApi";
import { Error } from "@/shared/components/Error";
import { Loading } from "@/shared/components/Loading";
import { PostForm } from "./PostForm";
import { CommentList } from "@/apps/comments/components/CommentList";
import { PostDetailCard } from "./PostDetailCard";

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

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deleteMutation.mutate(postId);
    }
  };

  return (
    <Box sx={{ maxWidth: "900px", margin: "0 auto" }}>
      <PostDetailCard
        post={post}
        onEdit={() => setIsEditDialogOpen(true)}
        onDelete={handleDelete}
      />

      <Box sx={{ mt: 6 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            mb: 3,
            background: "linear-gradient(135deg, #1a237e 0%, #311b92 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Comments
        </Typography>
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            background: "linear-gradient(135deg, #fff 0%, #f8f9fa 100%)",
            overflow: "hidden",
          }}
        >
          <Box sx={{ p: 3 }}>
            <CommentList postId={postId} />
          </Box>
        </Paper>
      </Box>

      <Dialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: "linear-gradient(135deg, #fff 0%, #f8f9fa 100%)",
          },
        }}
      >
        <Box sx={{ p: 3, position: "relative" }}>
          <IconButton
            onClick={() => setIsEditDialogOpen(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "text.secondary",
            }}
          >
            <CloseIcon />
          </IconButton>
          
          <Typography
            variant="h5"
            sx={{
              mb: 3,
              fontWeight: 700,
              background: "linear-gradient(135deg, #1a237e 0%, #311b92 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
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
    </Box>
  );
};