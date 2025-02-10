import { Alert, AlertTitle } from '@mui/material';

interface ErrorProps {
  message: string;
}

export const Error: React.FC<ErrorProps> = ({ message }) => (
  <Alert severity="error">
    <AlertTitle>Error</AlertTitle>
    {message}
  </Alert>
);