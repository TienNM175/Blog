import React, { useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Card, CardContent, Typography, Grid, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { postApi } from '../services/postApi';
import { Error } from '@/shared/components/Error';
import { Loading } from '@/shared/components/Loading';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';

interface PostListProps {
  userId: number;
}

export const PostList: React.FC<PostListProps> = ({ userId }) => {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error
  } = useInfiniteQuery({
    queryKey: ['posts', userId], 
    queryFn: ({ pageParam = 1 }) => postApi.getPosts(userId, { page: pageParam, per_page: 10 }), 
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1, // Initial page number
  });

  useInfiniteScroll(loadMoreRef, () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  });

  if (isLoading) return <Loading />;
  if (isError) return <Error message={(error as Error).message} />;

  return (
    <Grid container spacing={2}>
      {data?.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {page.map((post) => (
            <Grid item xs={12} key={post.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{post.title}</Typography>
                  <Typography color="textSecondary" noWrap>{post.body}</Typography>
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
            </Grid>
          ))}
        </React.Fragment>
      ))}
      <div ref={loadMoreRef} style={{ height: '20px', width: '100%' }} />
    </Grid>
  );
};
