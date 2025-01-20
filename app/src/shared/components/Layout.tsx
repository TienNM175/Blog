import React from "react";
import {
  Box,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import CreateIcon from "@mui/icons-material/Create";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation();

  const menuItems = [
    { text: "Home", path: "/", icon: <HomeIcon /> },
    { text: "Users", path: "/users", icon: <PeopleIcon /> },
    { text: "Create Post", path: "/posts/create", icon: <CreateIcon /> },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: "linear-gradient(135deg, #4F46E5 0%, #9333EA 100%)",
          backdropFilter: "blur(8px)",
        }}
      >
        <Toolbar
          sx={{
            px: { xs: 2, sm: 4 },
            py: 1,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              flexGrow: 1,
              color: "white",
              textDecoration: "none",
              fontWeight: 700,
              letterSpacing: "0.02em",
              background:
                "linear-gradient(90deg, #fff 0%, rgba(255,255,255,0.8) 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              textShadow: "0 2px 4px rgba(0,0,0,0.1)",
              "&:hover": {
                opacity: 0.9,
              },
              transition: "all 0.3s ease",
            }}
          >
            Blog Management
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
            }}
          >
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Button
                  key={item.text}
                  component={Link}
                  to={item.path}
                  startIcon={React.cloneElement(item.icon, {
                    sx: {
                      transition: "transform 0.3s ease",
                      transform: isActive ? "scale(1.1)" : "scale(1)",
                    },
                  })}
                  sx={{
                    px: 2,
                    py: 1,
                    color: "white",
                    textTransform: "none",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    borderRadius: 2,
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 100%)",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                    },
                    "&:hover": {
                      "&::before": {
                        opacity: 1,
                      },
                      transform: "translateY(-2px)",
                    },
                    ...(isActive && {
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)",
                      fontWeight: 600,
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "3px",
                        background: "white",
                        borderRadius: "3px 3px 0 0",
                      },
                    }),
                    transition: "all 0.3s ease",
                  }}
                >
                  {item.text}
                </Button>
              );
            })}
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          pt: "84px",
          pb: 4,
          px: { xs: 2, sm: 4 },
          background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: -40,
              right: -100,
              width: 200,
              height: 200,
              background: "linear-gradient(135deg, #4F46E5 0%, #9333EA 100%)",
              borderRadius: "50%",
              opacity: 0.03,
              zIndex: 0,
            },
          }}
        >
          {children}
        </Container>
      </Box>
    </Box>
  );
};
