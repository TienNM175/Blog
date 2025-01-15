import React from "react";
import {
  Box,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import { Link} from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import CreateIcon from "@mui/icons-material/Create";

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const menuItems = [
    { text: "Home", path: "/", icon: <HomeIcon /> },
    { text: "Users", path: "/users", icon: <PeopleIcon /> },
    { text: "Create Post", path: "/posts/create", icon: <CreateIcon /> },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar>
        <Toolbar>
          <Typography 
            variant="h6" 
            sx={{ 
              flexGrow: 1, 
              color: 'inherit',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            Blog Management
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            {menuItems.map((item) => (
              <Button
                key={item.text}
                component={Link}
                to={item.path}
                color="inherit"
                startIcon={item.icon}
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  px: 2,
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  },
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          mt: "64px",
        }}
      >
        <Container>{children}</Container>
      </Box>
    </Box>
  );
};