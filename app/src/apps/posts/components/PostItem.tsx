import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

interface PostItemProps {
  post: {
    id: number;
    title: string;
    body: string;
  };
}

export const PostItem: React.FC<PostItemProps> = ({ post }) => (
  <Card>
    <CardContent>
      <Typography variant="h6">{post.title}</Typography>
      <Typography color="textSecondary" noWrap>
        {post.body}
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Button
          component={Link}
          to={`/posts/${post.id}`}
          variant="outlined"
          size="small"
          sx={{ mr: 1 }}
        >
          View Details
        </Button>
      </Box>
    </CardContent>
  </Card>
);
