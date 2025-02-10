import React from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import { Post } from "../types/post.types"; 

interface PostDetailCardProps {
    post: Post;
    onEdit: () => void;
    onDelete: () => void;
  }

export const PostDetailCard: React.FC<PostDetailCardProps> = ({
  post,
  onEdit,
  onDelete,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        position: "relative",
        borderRadius: 4,
        overflow: "hidden",
        transition: "all 0.3s ease-in-out",
        background: "linear-gradient(135deg, #fff 0%, #f8f9fa 100%)",
        "&:hover": {
          transform: "translateY(-4px)",
          "& .hover-effect": {
            transform: "translateY(0)",
            opacity: 1,
          },
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)",
          opacity: 0.05,
        }}
      />

      <Box sx={{ p: 4, position: "relative" }}>
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 2,
              background: "linear-gradient(135deg, #1a237e 0%, #311b92 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            {post.title}
          </Typography>

          <Box sx={{ display: "flex", gap: 3, color: "text.secondary" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PersonIcon sx={{ fontSize: 18 }} />
              <Typography variant="body2">User ID: {post.user_id}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CalendarTodayIcon sx={{ fontSize: 18 }} />
              <Typography variant="body2">Posted Today</Typography>
            </Box>
          </Box>
        </Box>

        <Divider
          sx={{
            my: 3,
            opacity: 0.6,
            background: "linear-gradient(90deg, #4F46E5 0%, #9333EA 100%)",
            height: "2px",
          }}
        />

        <Typography
          sx={{
            fontSize: "1.1rem",
            lineHeight: 1.7,
            color: "text.primary",
            mb: 4,
          }}
        >
          {post.body}
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "flex-end",
            mt: 3,
          }}
        >
          <Button
            onClick={onEdit}
            variant="contained"
            startIcon={<EditIcon />}
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1,
              textTransform: "none",
              background: "linear-gradient(135deg, #4F46E5 0%, #9333EA 100%)",
              boxShadow: "0 4px 12px rgba(79, 70, 229, 0.3)",
              "&:hover": {
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Edit Post
          </Button>
          <Button
            onClick={onDelete}
            variant="contained"
            startIcon={<DeleteIcon />}
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1,
              textTransform: "none",
              background: "linear-gradient(135deg, #DC2626 0%, #EF4444 100%)",
              boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)",
              "&:hover": {
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Delete Post
          </Button>
        </Box>

        <Box
          className="hover-effect"
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #4F46E5 0%, #9333EA 100%)",
            transform: "translateY(4px)",
            opacity: 0,
            transition: "all 0.3s ease-in-out",
          }}
        />
      </Box>
    </Paper>
  );
};