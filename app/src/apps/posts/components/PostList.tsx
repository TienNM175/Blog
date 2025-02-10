import React, { useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Grid2 } from "@mui/material";
import { postApi } from "../services/postApi";
import { Error } from "@/shared/components/Error";
import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";
import { LoadMore } from "@/shared/components/LoadMore";
import { PostItem } from "./PostItem";
import { PAGINATION } from "@/shared/constants/pagination";

interface PostListProps {
  userId: number;
}

export const PostList: React.FC<PostListProps> = ({ userId }) => {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isError, error } =
    useInfiniteQuery({
      queryKey: ["posts", userId],
      queryFn: ({ pageParam = PAGINATION.DEFAULT_PAGE }) =>
        postApi.getPosts(userId, {
          page: pageParam,
          per_page: PAGINATION.PER_PAGE,
        }),
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === PAGINATION.PER_PAGE
          ? allPages.length + 1
          : undefined;
      },
      initialPageParam: PAGINATION.DEFAULT_PAGE,
    });

  useInfiniteScroll(loadMoreRef, () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  });

  if (isError) return <Error message={(error as Error).message} />;

  return (
    <Grid2 container spacing={2}>
      {data?.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {page.map((post) => (
            <Grid2 size={12} key={post.id}>
              <PostItem post={post} />
            </Grid2>
          ))}
        </React.Fragment>
      ))}
      <LoadMore ref={loadMoreRef} />
    </Grid2>
  );
};
