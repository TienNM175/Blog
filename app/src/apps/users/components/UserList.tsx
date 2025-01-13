import React, { useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { userApi } from '../services/userApi';
import { Error } from '@/shared/components/Error';
import { Loading } from '@/shared/components/Loading';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';

export const UserList: React.FC = () => {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error
  } = useInfiniteQuery({
    queryKey: ['users'],
    queryFn: ({ pageParam = 1 }) => userApi.getUsers({ page: pageParam, per_page: 10 }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1 // Starting value for the pageParam
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
          {page?.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <Card component={Link} to={`/users/${user.id}`} sx={{ textDecoration: 'none' }}>
                <CardContent>
                  <Typography variant="h6">{user.name}</Typography>
                  <Typography color="textSecondary">{user.email}</Typography>
                  <Typography>Status: {user.status}</Typography>
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
