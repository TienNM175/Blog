import React, { useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  Typography,
  Grid2,
  Avatar,
  Stack,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { userApi } from "../services/userApi";
import { Error } from "@/shared/components/Error";
import { Loading } from "@/shared/components/Loading";
import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";
import { deepPurple } from "@mui/material/colors";

const KING_CROWN_URL = "/src/assets/king-crown.png";
const QUEEN_CROWN_URL = "/src/assets/queen-crown.png";
const GUARD_URL = "/src/assets/guard.png";

export const UserList: React.FC = () => {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isLoading, isError, error } =
    useInfiniteQuery({
      queryKey: ["users"],
      queryFn: ({ pageParam = 1 }) =>
        userApi.getUsers({ page: pageParam, per_page: 10 }),
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
    <Grid2 container spacing={2}>
      {data?.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {page?.map((user) => {
            const isJohnstonEmail = user.email.includes("@johnston");
            const isEmardEmail = user.email.includes("@emard");
            const isLuettgenEmail = user.email.includes("@luettgen");

            const avatarBorderColor =
              isJohnstonEmail && user.status === "active"
                ? "green"
                : isJohnstonEmail && user.status === "inactive"
                ? "#CC0000"
                : "transparent";

            const crownImageUrl =
              isEmardEmail && user.gender === "male"
                ? KING_CROWN_URL
                : isEmardEmail && user.gender === "female"
                ? QUEEN_CROWN_URL
                : null;

            return (
              <Grid2 size={4} key={user.id}>
                <Card
                  component={Link}
                  to={`/users/${user.id}`}
                  sx={{
                    textDecoration: "none",
                  }}
                >
                  <CardContent>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar
                        alt={user.name}
                        sx={{
                          border: `3px solid ${avatarBorderColor}`,
                          borderRadius: "50%",
                          width: 56,
                          height: 56,
                          transition: "border-color 0.3s ease-in-out",
                          bgcolor: deepPurple[500],
                        }}
                      />
                      <Box>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Typography variant="h6">{user.name}</Typography>
                          {crownImageUrl && (
                            <img
                              src={crownImageUrl}
                              alt={
                                user.gender === "male"
                                  ? "King Crown"
                                  : "Queen Crown"
                              }
                              style={{
                                width: "20px",
                                height: "20px",
                                marginLeft: "5px",
                              }}
                            />
                          )}
                          {isLuettgenEmail && (
                            <img
                              src={GUARD_URL}
                              alt="Guard Icon"
                              style={{
                                width: "20px",
                                height: "20px",
                                marginLeft: "5px",
                              }}
                            />
                          )}
                        </Stack>
                      </Box>
                    </Stack>
                    <Typography color="textSecondary">{user.email}</Typography>
                    <Typography>Status: {user.status}</Typography>
                  </CardContent>
                </Card>
              </Grid2>
            );
          })}
        </React.Fragment>
      ))}
      <div ref={loadMoreRef} style={{ height: "20px", width: "100%" }} />
    </Grid2>
  );
};
