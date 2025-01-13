import React from 'react';
import { Box, Container, AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component={Link} to="/" sx={{ color: 'white', textDecoration: 'none', marginRight: 2 }}>
            Home
          </Typography>
          <Typography variant="h6" component={Link} to="/users" sx={{ color: 'white', textDecoration: 'none', marginRight: 2 }}>
            Users
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        {children}
      </Container>
    </Box>
  );
};
