import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Stack,
  Box,
  Divider,
  Tooltip,
  Chip,
} from "@mui/material";
import { deepPurple, green, red, grey, blue } from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/Person";
import { ASSETS } from "@/apps/users/constants/assets";
import { User } from "@/apps/users/types/user.types";

interface UserDetailCardProps {
  user: User;
}

export const UserDetailCard: React.FC<UserDetailCardProps> = ({ user }) => {
  const isJohnstonEmail = user.email.includes("@johnston");
  const isEmardEmail = user.email.includes("@emard");
  const isLuettgenEmail = user.email.includes("@luettgen");

  const avatarBorderColor =
    isJohnstonEmail && user.status === "active"
      ? green[500]
      : isJohnstonEmail && user.status === "inactive"
      ? red[500]
      : grey[400];

  const crownImageUrl =
    isEmardEmail && user.gender === "male"
      ? ASSETS.KING_CROWN_URL
      : isEmardEmail && user.gender === "female"
      ? ASSETS.QUEEN_CROWN_URL
      : null;

  return (
    <Card
      sx={{
        mb: 4,
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        transition: "all 0.3s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
        },
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Stack direction="row" spacing={3} alignItems="center">
          <Box
            sx={{
              position: "relative",
              display: "inline-block",
              width: 80,
              height: 80,
            }}
          >
            <Avatar
              alt={user.name}
              sx={{
                border: `3px solid ${avatarBorderColor}`,
                width: 80,
                height: 80,
                bgcolor: deepPurple[500],
                color: "white",
                fontSize: "2rem",
              }}
            >
              <PersonIcon fontSize="large" />
            </Avatar>

            {/* Guard Icon */}
            {isLuettgenEmail && (
              <Tooltip title="Guard">
                <Box
                  sx={{
                    position: "absolute",
                    top: -10,
                    right: -10,
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    backgroundColor: blue[100],
                    boxShadow: `0 2px 4px rgba(0,0,0,0.2)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={ASSETS.GUARD_ICON_URL}
                    alt="Guard Icon"
                    style={{ width: 24, height: 24 }}
                  />
                </Box>
              </Tooltip>
            )}

            {crownImageUrl && (
              <Tooltip title={user.gender === "male" ? "King" : "Queen"}>
                <Box
                  sx={{
                    position: "absolute",
                    top: -10,
                    right: -10,
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    backgroundColor: blue[100],
                    boxShadow: `0 2px 4px rgba(0,0,0,0.2)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={crownImageUrl}
                    alt={user.gender === "male" ? "King Crown" : "Queen Crown"}
                    style={{ width: 24, height: 24 }}
                  />
                </Box>
              </Tooltip>
            )}
          </Box>
        </Stack>
        <Divider sx={{ my: 2 }} />
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Typography variant="body1" component="span">
              <strong>Gender:</strong>
            </Typography>
            <Chip
              label={user.gender}
              sx={{
                px: 1.5,
                fontWeight: "bold",
                textTransform: "capitalize",
                bgcolor: user.gender === "male" ? blue[100] : deepPurple[100],
                color: user.gender === "male" ? blue[700] : deepPurple[700],
                fontSize: "1rem",
              }}
            />
          </Box>
          
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body1" component="span">
              <strong>Status:</strong>
            </Typography>
            <Chip
              label={user.status}
              color={user.status === "active" ? "success" : "error"}
              sx={{
                px: 1.5,
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
