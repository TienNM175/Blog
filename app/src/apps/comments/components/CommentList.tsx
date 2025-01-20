import React, { useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { commentApi } from "../services/commentApi";
import { Loading } from "@/shared/components/Loading";
import { Error } from "@/shared/components/Error";
import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";
import { LoadMore } from "@/shared/components/LoadMore";
import { PAGINATION } from "@/shared/constants/pagination";

interface CommentListProps {
  postId: number;
}

export const CommentList: React.FC<CommentListProps> = ({ postId }) => {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isLoading, isError, error } =
    useInfiniteQuery({
      queryKey: ["comments", postId],
      queryFn: ({ pageParam = PAGINATION.DEFAULT_PAGE }) =>
        commentApi.getComments(postId, {
          page: pageParam,
          per_page: PAGINATION.PER_PAGE,
        }),
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === PAGINATION.PER_PAGE
          ? allPages.length + 1
          : undefined;
      },
      initialPageParam: PAGINATION.DEFAULT_PAGE, // Initial page number
    });

  useInfiniteScroll(loadMoreRef, () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  });

  if (isLoading) return <Loading />;
  if (isError) return <Error message={(error as Error).message} />;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {data?.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {page.map((comment) => (
            <Card key={comment.id} sx={{ bgcolor: "grey.50" }}>
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {comment.name}
                </Typography>
                <Typography
                  color="textSecondary"
                  sx={{ fontSize: "0.875rem", mb: 1 }}
                >
                  {comment.email}
                </Typography>
                <Typography>{comment.body}</Typography>
              </CardContent>
            </Card>
          ))}
        </React.Fragment>
      ))}
      <LoadMore ref={loadMoreRef} />
    </Box>
  );
};
