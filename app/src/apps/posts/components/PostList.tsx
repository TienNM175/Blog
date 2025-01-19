import React, { useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Grid2 } from "@mui/material";
import { postApi } from "../services/postApi";
import { Error } from "@/shared/components/Error";
import { Loading } from "@/shared/components/Loading";
import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";
import { LoadMore } from "@/shared/components/LoadMore";
import { PostItem } from "./PostItem";

interface PostListProps {
  userId: number;
}

export const PostList: React.FC<PostListProps> = ({ userId }) => {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isLoading, isError, error } =
    useInfiniteQuery({
      queryKey: ["posts", userId],
      queryFn: ({ pageParam = 1 }) =>
        postApi.getPosts(userId, { page: pageParam, per_page: 10 }),
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 10 ? allPages.length + 1 : undefined;
      },
      initialPageParam: 1,
    });

  useInfiniteScroll(loadMoreRef, () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  });

  if (isLoading) return <Loading />;
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
