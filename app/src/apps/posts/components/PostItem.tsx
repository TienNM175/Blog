import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import { grey } from "@mui/material/colors";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface PostItemProps {
  post: {
    id: number;
    title: string;
    body: string;
  };
}

export const PostItem: React.FC<PostItemProps> = ({ post }) => (
  <Paper
    elevation={0}
    sx={{
      position: "relative",
      borderRadius: 4,
      overflow: "hidden",
      transition: "all 0.3s ease-in-out",
      background: "linear-gradient(135deg, #fff 0%, #f8f9fa 100%)",
      "&:hover": {
        transform: "translateY(-8px)",
        "& .hover-effect": {
          transform: "translateY(0)",
          opacity: 1,
        },
        "& .card-content": {
          transform: "translateY(-4px)",
        },
        "& .gradient-overlay": {
          opacity: 1,
        },
      },
    }}
  >
    <Box
      className="gradient-overlay"
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background:
          "linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)",
        opacity: 0,
        transition: "opacity 0.3s ease-in-out",
        zIndex: 1,
      }}
    />

    <Box
      sx={{
        position: "absolute",
        top: -20,
        right: -20,
        width: 100,
        height: 100,
        borderRadius: "50%",
        background: "linear-gradient(135deg, #4F46E5 0%, #9333EA 100%)",
        opacity: 0.1,
      }}
    />

    <Card
      sx={{
        background: "transparent",
        boxShadow: "none",
        position: "relative",
        zIndex: 2,
      }}
    >
      <CardContent
        className="card-content"
        sx={{
          p: 4,
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <Box
          sx={{
            display: "inline-block",
            px: 2,
            py: 0.5,
            bgcolor: "primary.main",
            color: "white",
            borderRadius: 2,
            fontSize: "0.75rem",
            fontWeight: "bold",
            mb: 2,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          Post #{post.id}
        </Box>

        <Typography
          variant="h5"
          sx={{
            mb: 2,
            fontWeight: 700,
            background: "linear-gradient(135deg, #1a237e 0%, #311b92 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            fontSize: "1.5rem",
            lineHeight: 1.4,
          }}
        >
          {post.title}
        </Typography>

        <Typography
          sx={{
            color: grey[700],
            mb: 3,
            lineHeight: 1.7,
            height: "4.5em",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {post.body}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AccessTimeIcon sx={{ fontSize: 18, color: grey[500] }} />
            <Typography
              variant="body2"
              sx={{ color: grey[500], fontWeight: 500 }}
            >
              3 min read
            </Typography>
          </Box>

          <Button
            component={Link}
            to={`/posts/${post.id}`}
            variant="contained"
            sx={{
              borderRadius: 3,
              px: 3,
              py: 1.2,
              textTransform: "none",
              fontSize: "0.95rem",
              fontWeight: 600,
              background: "linear-gradient(135deg, #4F46E5 0%, #9333EA 100%)",
              boxShadow: "0 4px 12px rgba(79, 70, 229, 0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 6px 16px rgba(79, 70, 229, 0.4)",
              },
            }}
            endIcon={
              <ArrowForwardIcon
                sx={{
                  transition: "transform 0.3s ease",
                  ".MuiButton-root:hover &": {
                    transform: "translateX(4px)",
                  },
                }}
              />
            }
          >
            Read More
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
      </CardContent>
    </Card>
  </Paper>
);
