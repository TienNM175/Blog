import React, { useState, useRef, useCallback } from "react";
import { debounce } from "lodash";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Box, Grid2 } from "@mui/material";
import { grey } from "@mui/material/colors";
import { userApi } from "../services/userApi";
import { Error } from "@/shared/components/Error";
import { Loading } from "@/shared/components/Loading";
import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";
import { UserCard } from "./UserCard";
import { PAGINATION } from "@/shared/constants/pagination";
import { LoadMore } from "@/shared/components/LoadMore";
import { UserSearch } from "./UserSearch ";

export const UserList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [displayQuery, setDisplayQuery] = useState("");
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isLoading, isError, error } =
    useInfiniteQuery({
      queryKey: ["users", searchQuery],
      queryFn: ({ pageParam = PAGINATION.DEFAULT_PAGE }) =>
        userApi.getUsers({
          page: pageParam,
          per_page: PAGINATION.PER_PAGE,
          search: searchQuery,
        }),
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length === PAGINATION.PER_PAGE
          ? allPages.length + 1
          : undefined,
      initialPageParam: PAGINATION.DEFAULT_PAGE,
    });

  useInfiniteScroll(loadMoreRef, () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  });

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setSearchQuery(query);
    }, 1000),
    []
  );

  const handleSearch = (value: string) => {
    setDisplayQuery(value);
    debouncedSearch(value);
  };

  if (isLoading) return <Loading />;
  if (isError) return <Error message={(error as Error).message} />;

  return (
    <Box sx={{ p: 3, backgroundColor: grey[50], minHeight: "100vh" }}>
      <UserSearch value={displayQuery} onChange={handleSearch} />
      <Grid2 container spacing={3}>
        {data?.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page?.map((user) => (
              <Grid2 size={{ xs: 12, md: 6, lg: 4 }} key={user.id}>
                <UserCard user={user} />
              </Grid2>
            ))}
          </React.Fragment>
        ))}
      </Grid2>
      {hasNextPage && <LoadMore ref={loadMoreRef} />}
    </Box>
  );
};
