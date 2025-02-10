import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Stack,
  Box,
  Chip,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import { deepPurple, green, red, grey } from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/Person";
import { ASSETS } from "@/apps/users/constants/assets";
import { User } from "@/apps/users/types/user.types";

interface UserCardProps {
  user: User;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
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
      ? ASSETS.KING_CROWN_URL
      : isEmardEmail && user.gender === "female"
      ? ASSETS.QUEEN_CROWN_URL
      : null;

  return (
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
                      title={user.gender === "male" ? "King" : "Queen"}
                    >
                      <IconButton size="small">
                        <img
                          src={crownImageUrl}
                          alt={
                            user.gender === "male"
                              ? "King Crown"
                              : "Queen Crown"
                          }
                          style={{ width: "20px", height: "20px" }}
                        />
                      </IconButton>
                    </Tooltip>
                  )}
                  {isLuettgenEmail && (
                    <Tooltip title="Guard">
                      <IconButton size="small">
                        <img
                          src={ASSETS.GUARD_ICON_URL}
                          alt="Guard Icon"
                          style={{ width: "20px", height: "20px" }}
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
              color={user.status === "active" ? "success" : "error"}
              sx={{
                textTransform: "capitalize",
                fontWeight: 500,
              }}
            />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};