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
  Chip,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import { userApi } from "../services/userApi";
import { Error } from "@/shared/components/Error";
import { Loading } from "@/shared/components/Loading";
import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";
import { deepPurple, green, red, grey } from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/Person";

const KING_CROWN_URL = "/src/assets/king-crown.png";
const QUEEN_CROWN_URL = "/src/assets/queen-crown.png";
const GUARD_ICON_URL = "/src/assets/guard.png";

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
    <Box sx={{ p: 3, backgroundColor: grey[50], minHeight: "100vh" }}>
      <Grid2 container spacing={3}>
        {data?.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page?.map((user) => {
              const isJohnstonEmail = user.email.includes("@johnston");
              const isEmardEmail = user.email.includes("@emard");
              const isLuettgenEmail = user.email.includes("@luettgen");

              const avatarBorderColor =
                isJohnstonEmail && user.status === "active"
                  ? green[500]
                  : isJohnstonEmail && user.status === "inactive"
                  ? red[500]
                  : "transparent";

              const crownImageUrl =
                isEmardEmail && user.gender === "male"
                  ? KING_CROWN_URL
                  : isEmardEmail && user.gender === "female"
                  ? QUEEN_CROWN_URL
                  : null;

              return (
                <Grid2 size={{ xs: 12, md: 6, lg: 4 }} key={user.id}>
                  <Card
                    component={Link}
                    to={`/users/${user.id}`}
                    sx={{
                      textDecoration: "none",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: 4,
                      },
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardContent
                      sx={{ flex: 1, display: "flex", flexDirection: "column" }}
                    >
                      <Stack spacing={2} sx={{ height: "100%" }}>
                        <Stack
                          direction="row"
                          spacing={2}
                          alignItems="flex-start"
                          sx={{ mb: 1 }}
                        >
                          <Avatar
                            alt={user.name}
                            sx={{
                              border: `3px solid ${avatarBorderColor}`,
                              borderRadius: "50%",
                              width: 60,
                              height: 60,
                              bgcolor: deepPurple[500],
                              boxShadow: 2,
                              flexShrink: 0,
                            }}
                          >
                            <PersonIcon />
                          </Avatar>
                          <Box>                          
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={1}
                              sx={{ flexWrap: "wrap" }}
                            >
                              <Typography
                                variant="h6"
                                sx={{
                                  fontWeight: 600,
                                  color: grey[900],
                                  wordBreak: "break-word",
                                }}
                              >
                                {user.name}
                              </Typography>
                              <Box sx={{ display: "flex", gap: 0.5 }}>
                                {crownImageUrl && (
                                  <Tooltip
                                    title={
                                      user.gender === "male" ? "King" : "Queen"
                                    }
                                  >
                                    <IconButton size="small">
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
                                        }}
                                      />
                                    </IconButton>
                                  </Tooltip>
                                )}
                                {isLuettgenEmail && (
                                  <Tooltip title="Guard">
                                    <IconButton size="small">
                                      <img
                                        src={GUARD_ICON_URL}
                                        alt="Guard Icon"
                                        style={{
                                          width: "20px",
                                          height: "20px",
                                        }}
                                      />
                                    </IconButton>
                                  </Tooltip>
                                )}
                              </Box>
                            </Stack>
                            <Typography
                              variant="body2"
                              sx={{
                                color: grey[600],
                                wordBreak: "break-word",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {user.email}
                            </Typography>
                          </Box>
                        </Stack>
                        <Box sx={{ mt: "auto" }}>
                          <Divider sx={{ mb: 2 }} />
                          <Chip
                            label={user.status}
                            size="small"
                            color={
                              user.status === "active" ? "success" : "error"
                            }
                            sx={{
                              textTransform: "capitalize",
                              fontWeight: 500,
                            }}
                          />
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid2>
              );
            })}
          </React.Fragment>
        ))}
      </Grid2>
      <div ref={loadMoreRef} style={{ height: "20px", width: "100%" }} />
    </Box>
  );
};
