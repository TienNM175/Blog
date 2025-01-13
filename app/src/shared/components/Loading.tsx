import { CircularProgress, Box } from '@mui/material';

export const Loading = () => (
  <Box display="flex" justifyContent="center" padding={4}>
    <CircularProgress />
  </Box>
);