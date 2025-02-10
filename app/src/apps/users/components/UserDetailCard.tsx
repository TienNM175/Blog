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
  Paper,
} from "@mui/material";
import { red, grey } from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
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
      ? "#4F46E5"
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
    <Paper
      elevation={0}
      sx={{
        position: "relative",
        borderRadius: 4,
        overflow: "hidden",
        transition: "all 0.3s ease-in-out",
        background: "linear-gradient(135deg, #fff 0%, #f8f9fa 100%)",
        "&:hover": {
          transform: "translateY(-8px)",
          "& .hover-effect": {
            transform: "translateY(0)",
            opacity: 1,
          },
          "& .card-content": {
            transform: "translateY(-4px)",
          },
          "& .gradient-overlay": {
            opacity: 1,
          },
        },
      }}
    >
      <Box
        className="gradient-overlay"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)",
          opacity: 0,
          transition: "opacity 0.3s ease-in-out",
          zIndex: 1,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: -20,
          right: -20,
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #4F46E5 0%, #9333EA 100%)",
          opacity: 0.1,
        }}
      />

      <Card
        sx={{
          background: "transparent",
          boxShadow: "none",
          position: "relative",
          zIndex: 2,
        }}
      >
        <CardContent
          className="card-content"
          sx={{
            p: 4,
            transition: "transform 0.3s ease-in-out",
          }}
        >
          <Stack direction="row" spacing={3} alignItems="flex-start">
            <Box
              sx={{
                position: "relative",
                display: "inline-block",
                width: 100,
                height: 100,
              }}
            >
              <Avatar
                alt={user.name}
                sx={{
                  width: 100,
                  height: 100,
                  border: `4px solid ${avatarBorderColor}`,
                  background:
                    "linear-gradient(135deg, #4F46E5 0%, #9333EA 100%)",
                  color: "white",
                  fontSize: "2.5rem",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <PersonIcon fontSize="large" />
              </Avatar>

              {isLuettgenEmail && (
                <Tooltip title="Guard" arrow>
                  <Box
                    sx={{
                      position: "absolute",
                      top: -10,
                      right: -10,
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, #4F46E5 0%, #9333EA 100%)",
                      boxShadow: "0 4px 12px rgba(79, 70, 229, 0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.1)",
                      },
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
                <Tooltip
                  title={user.gender === "male" ? "King" : "Queen"}
                  arrow
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: -10,
                      right: -10,
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, #4F46E5 0%, #9333EA 100%)",
                      boxShadow: "0 4px 12px rgba(79, 70, 229, 0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.1)",
                      },
                    }}
                  >
                    <img
                      src={crownImageUrl}
                      alt={
                        user.gender === "male" ? "King Crown" : "Queen Crown"
                      }
                      style={{ width: 24, height: 24 }}
                    />
                  </Box>
                </Tooltip>
              )}
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  background:
                    "linear-gradient(135deg, #1a237e 0%, #311b92 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                {user.name}
              </Typography>

              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <EmailIcon sx={{ color: grey[500], fontSize: 18 }} />
                <Typography
                  variant="body2"
                  sx={{
                    color: grey[600],
                    fontWeight: 500,
                  }}
                >
                  {user.email}
                </Typography>
              </Box>
            </Box>
          </Stack>

          <Divider
            sx={{
              my: 3,
              opacity: 0.6,
              background: "linear-gradient(90deg, #4F46E5 0%, #9333EA 100%)",
              height: "2px",
            }}
          />

          <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Typography
                sx={{
                  fontWeight: 600,
                  color: grey[700],
                }}
              >
                Gender
              </Typography>
              <Chip
                label={user.gender}
                sx={{
                  px: 2,
                  fontWeight: "600",
                  textTransform: "capitalize",
                  background:
                    "linear-gradient(135deg, #4F46E5 0%, #9333EA 100%)",
                  color: "white",
                  "& .MuiChip-label": { px: 2 },
                }}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Typography
                sx={{
                  fontWeight: 600,
                  color: grey[700],
                }}
              >
                Status
              </Typography>
              <Chip
                label={user.status}
                sx={{
                  px: 2,
                  fontWeight: "600",
                  textTransform: "capitalize",
                  background:
                    user.status === "active"
                      ? "linear-gradient(135deg, #059669 0%, #10B981 100%)"
                      : "linear-gradient(135deg, #DC2626 0%, #EF4444 100%)",
                  color: "white",
                  "& .MuiChip-label": { px: 2 },
                }}
              />
            </Box>
          </Box>

          <Box
            className="hover-effect"
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: "linear-gradient(90deg, #4F46E5 0%, #9333EA 100%)",
              transform: "translateY(4px)",
              opacity: 0,
              transition: "all 0.3s ease-in-out",
            }}
          />
        </CardContent>
      </Card>
    </Paper>
  );
};
